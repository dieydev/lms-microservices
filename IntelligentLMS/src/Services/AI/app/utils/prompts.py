QUESTION_PROMPT = """
You are an expert teacher reviewing a student's understanding of a lesson.
Based on the following lesson summary, generate EXACTLY ONE thought-provoking question to test the student's knowledge.
The question should be concise and directly related to the key points.
Return ONLY the question text, no introductions or explanations.

LESSON SUMMARY:
{summary}

QUESTION:
"""

GRADING_PROMPT = """
You are a strict but fair AI grader. You will be given a lesson's summary, a question asked to the student, and the student's answer.
Grade the student's answer based ONLY on the lesson summary.
If the answer demonstrates understanding, set is_pass to true. Score should be on a 0-100 scale.
Provide brief feedback explaining what was good or what was missing.

LESSON SUMMARY:
{summary}

QUESTION:
{question}

STUDENT ANSWER:
{answer}

OUTPUT FORMAT:
You MUST respond with a valid JSON object matching this schema exactly. DO NOT wrap the JSON in markdown code blocks or add any other text.
{{
    "is_pass": true/false,
    "feedback": "your feedback here",
    "score": integer_0_to_100
}}
"""

SUMMARY_PROMPT = """
You are an expert educational AI. 
Read the following lesson content and create a concise summary under 300 words. 
Also, extract 3 to 10 key terms/keywords.
Return ONLY valid JSON matching this schema:
{{
    "summary": "your summary text here",
    "keywords": ["keyword1", "keyword2"]
}}

LESSON CONTENT:
{content}
"""
