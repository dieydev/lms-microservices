import os
import httpx
import asyncio
import json
from celery import Celery
from app.config import settings
from app.utils.logger import logger
from app.services.ollama_provider import OllamaProvider
from app.utils.prompts import SUMMARY_PROMPT, GRADING_PROMPT
from app.schemas.review import ReviewResponse

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/1")

celery = Celery(
    "ai_tasks",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND
)

# Cấu hình ưu tiên Redis Priority 0-9
celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    broker_transport_options={
        'priority_steps': list(range(10)),
        'queue_order_strategy': 'priority',
    }
)

@celery.task(name="app.celery_worker.generate_lesson_summary_task")
def generate_lesson_summary_task(lesson_id: str, content: str):
    """
    Sinh summary và keyword cho bài học sử dụng Ollama, sau đó PUT kết quả về Course Service.
    Priority thấp.
    """
    logger.info(f"Start summarize pattern for lesson: {lesson_id}")
    prompt = SUMMARY_PROMPT.format(content=content)
    
    try:
        # Run async logic inside sync celery worker
        json_resp = asyncio.run(OllamaProvider.generate_response(prompt=prompt, json_format=True))
        data = json.loads(json_resp)
        summary = data.get("summary", "")
        keywords = data.get("keywords", [])
        
        # PUT result back to Course Service internal API
        put_url = f"{settings.COURSE_SERVICE_URL}/internal/lessons/{lesson_id}/summary"
        payload = {"Summary": summary, "Keywords": keywords}
        
        with httpx.Client(timeout=10.0) as client:
            res = client.put(
                put_url,
                json=payload,
                headers={"X-Internal-API-Key": settings.INTERNAL_API_KEY}
            )
            res.raise_for_status()
            
        logger.info(f"Summarization completed for lesson {lesson_id}.")
        return {"status": "success", "lesson_id": lesson_id}
        
    except Exception as e:
        logger.error(f"Failed to generate summary for lesson {lesson_id}: {e}")
        raise e


@celery.task(name="app.celery_worker.grade_answer_task")
def grade_answer_task(summary: str, question: str, answer: str):
    """
    Chấm điểm user answer bằng Ollama qua Celery queue ưu tiên cao.
    """
    prompt = GRADING_PROMPT.format(summary=summary, question=question, answer=answer)
    try:
        json_resp = asyncio.run(OllamaProvider.generate_response(prompt=prompt, json_format=True))
        result = ReviewResponse.model_validate_json(json_resp)
        return result.model_dump()
    except Exception as e:
        logger.error(f"Failed to grade answer: {e}")
        raise e
