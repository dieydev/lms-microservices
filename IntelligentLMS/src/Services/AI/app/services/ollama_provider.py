import httpx
import asyncio
from app.config import settings
from app.utils.logger import logger

class OllamaProvider:
    @classmethod
    async def generate_response(cls, prompt: str, json_format: bool = False, max_retries: int = 3) -> str:
        payload = {
            "model": settings.OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }
        if json_format:
            payload["format"] = "json"

        for attempt in range(1, max_retries + 1):
            try:
                async with httpx.AsyncClient(timeout=45.0) as client:
                    response = await client.post(
                        f"{settings.OLLAMA_URL}/api/generate",
                        json=payload
                    )
                    response.raise_for_status()
                    data = response.json()
                    return data.get("response", "").strip()
            except httpx.TimeoutException as e:
                logger.warning(f"Ollama timeout on attempt {attempt}/{max_retries}")
                if attempt == max_retries:
                    raise Exception("Ollama service timeout.") from e
            except Exception as e:
                logger.error(f"Ollama API Error on attempt {attempt}: {str(e)}")
                if attempt == max_retries:
                    raise Exception(f"Ollama service error: {str(e)}") from e
            
            await asyncio.sleep(1) # backoff trước khi retry
