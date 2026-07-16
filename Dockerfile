# Backend-only image. The Angular frontend is built and deployed separately
# to its own Azure App Service (see frontend/deploy/ and the azure-deploy
# workflows) — this API no longer serves any static frontend files.
FROM python:3.11-slim
WORKDIR /app

# Install backend dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY main.py .
COPY backend/ ./backend/

# Environment variables
ENV PYTHONUNBUFFERED=1

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
