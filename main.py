from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import products, orders, cart, chatbot, profile
import os
import uvicorn
import logfire

# Initialize FastAPI app
app = FastAPI()

# The frontend is deployed as a separate Azure App Service, so every request
# it makes is cross-origin. FRONTEND_ORIGIN is set as an App Setting on the
# backend App Service to that deployed URL (comma-separate for more than one).
# The localhost regex covers `ng serve`, which can land on different ports
# (4200 default, 4300/4400 if that's taken).
_frontend_origins = [o.strip() for o in os.getenv("FRONTEND_ORIGIN", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_frontend_origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Logfire for Observability
logfire.configure(send_to_logfire='if-token-present')
# NOTE: logfire.instrument_fastapi(app) is disabled — the installed
# opentelemetry-instrumentation-fastapi build doesn't support this FastAPI/
# Starlette version yet (crashes on every request, including CORS preflight,
# with `_IncludedRouter object has no attribute 'path'`). Re-enable once
# requirements.txt pins compatible versions.
logfire.instrument_pydantic()

# Create uploads folder for product images
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# Include API route modules
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(cart.router)
app.include_router(chatbot.router)
app.include_router(profile.router)

# Serve uploaded files statically
from fastapi.staticfiles import StaticFiles
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

if __name__ == "__main__":
    print("⚙️ Starting backend server (FastAPI)...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
