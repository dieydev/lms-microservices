import uuid
import json
import httpx
from fastapi import APIRouter, HTTPException
import redis

from app.config import settings
from app.schemas.review import (
    ReviewStartRequest, ReviewStartResponse,
    ReviewSubmitRequest, ReviewResponse
)
from app.services.ollama_provider import OllamaProvider
from app.utils.prompts import QUESTION_PROMPT, GRADING_PROMPT

router = APIRouter(prefix="/ai/review", tags=["Review Q&A"])

# Kết nối Redis
redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

@router.post("/start", response_model=ReviewStartResponse)
async def start_review(request: ReviewStartRequest):
    # Lấy summary nội bộ trường từ Course Service
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(
                f"{settings.COURSE_SERVICE_URL}/internal/lessons/{request.lesson_id}",
                headers={"X-Internal-API-Key": settings.INTERNAL_API_KEY},
                timeout=10.0
            )
            res.raise_for_status()
            lesson_data = res.json()
            summary = lesson_data.get("summary", "") # Handle lower/camel case depend on JSON serializer
            if not summary:
                summary = lesson_data.get("Summary", "")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Cannot fetch lesson summary from Course Service: {str(e)}")
        
    if not summary:
        raise HTTPException(status_code=400, detail="This lesson does not have a summary generated yet.")

    # Đưa vào cấu trúc Prompt
    prompt = QUESTION_PROMPT.format(summary=summary)
    
    # Xin Ollama tạo Question
    try:
        question = await OllamaProvider.generate_response(prompt=prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    session_id = str(uuid.uuid4())
    
    # Lưu phiên 30 phút
    session_data = {
        "summary": summary,
        "question": question,
        "lesson_id": request.lesson_id
    }
    redis_client.setex(f"review_sess:{session_id}", 1800, json.dumps(session_data))
    
    return ReviewStartResponse(session_id=session_id, question=question)


@router.post("/submit", response_model=ReviewResponse)
async def submit_review(request: ReviewSubmitRequest):
    # Đọc lại metadata từ Redis Server
    cached_data_str = redis_client.get(f"review_sess:{request.session_id}")
    if not cached_data_str:
        raise HTTPException(status_code=400, detail="Review session expired or invalid.")
        
    session_data = json.loads(cached_data_str)
    summary = session_data["summary"]
    question = session_data["question"]
    
    try:
        from app.celery_worker import grade_answer_task
        # Đẩy vào queue ưu tiên cao nhất, Redis đánh dấu 9 là ưu tiên cao
        task = grade_answer_task.apply_async(args=[summary, question, request.answer], priority=9)
        
        # Block đợi kết quả (đảm bảo request HTTP không phản hồi quá sớm)
        result_dict = task.get(timeout=60.0)
        
        return ReviewResponse(**result_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to grade answer: {str(e)}")
