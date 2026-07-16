from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import products, orders, cart, chatbot, profile
import os
import uvicorn
import logfire

# Initialize FastAPI app
app = FastAPI()

# Allow the Angular dev server to call this API directly. `ng serve` can
# land on different ports (4200 default, 4300/4400 if that's taken), so
# rather than chase exact ports, allow any localhost/127.0.0.1 origin here.
# In production the frontend is served by this same app (see the static
# mount below), so same-origin requests don't need CORS at all.
app.add_middleware(
    CORSMiddleware,
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


# Serve the Angular production build natively, if it's been built.
# For local development, run `ng serve` separately instead (see README) —
# CORS above makes that work against this same backend.
FRONTEND_DIST = os.path.join("frontend", "dist")
if os.path.isdir(FRONTEND_DIST):
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")

if __name__ == "__main__":
    print("⚙️ Starting backend server (FastAPI)...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
