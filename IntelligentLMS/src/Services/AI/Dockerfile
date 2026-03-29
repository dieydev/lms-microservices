FROM python:3.9-slim

WORKDIR /app

# ✅ fix path
COPY src/Services/AI/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ✅ copy đúng folder AI
COPY src/Services/AI .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]