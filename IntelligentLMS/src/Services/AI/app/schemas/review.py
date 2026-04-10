from pydantic import BaseModel, Field

class ReviewStartRequest(BaseModel):
    lesson_id: str
    course_id: str

class ReviewStartResponse(BaseModel):
    session_id: str
    question: str

class ReviewSubmitRequest(BaseModel):
    session_id: str
    answer: str

class ReviewResponse(BaseModel):
    is_pass: bool = Field(description="Whether the answer passes the criteria based on context")
    feedback: str = Field(description="Detailed feedback to the student")
    score: int = Field(ge=0, le=100, description="Score from 0 to 100")
