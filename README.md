# Personal Resume / Portfolio AI Chatbot

A personal portfolio site (Angular 18) with a floating AI chat widget backed by a **FastAPI** + **Pydantic AI** (Groq) assistant. The assistant answers visitor questions grounded in profile/skills/services data stored in **MongoDB**.

## Stack

- **Frontend:** Angular 18, Angular Material, NgRx, SCSS (`frontend/`)
- **Backend:** FastAPI, Pydantic AI + Groq, MongoDB (`backend/`, entry point `main.py`)
- **Observability:** Pydantic Logfire

---

## Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)
- A MongoDB connection string (e.g. MongoDB Atlas)
- A Groq API key

---

## 1. Backend (FastAPI) — runs on `http://localhost:8000`

```bash
# from the repo root
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file in the repo root with:

```env
MONGO_URI="<your MongoDB connection string>"
GROQ_API_KEY="<your Groq API key>"
LOGFIRE_API_KEY="<your Logfire token>"   # optional, for observability
```

Seed the portfolio content (profile, skills, services, education, projects) into MongoDB:

```bash
python -m backend.seed_profile
```

Start the API server:

```bash
python main.py
```

- API base URL: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- Chat endpoint: `POST http://localhost:8000/chat`

---

## 2. Frontend (Angular) — runs on `http://localhost:4200`

```bash
cd frontend
npm install
npm start           # ng serve --open
```

The default dev environment (`src/environments/environment.ts`) already points at:

- `apiUrl: http://localhost:9000/`
- `chatApiUrl: http://localhost:8000`

so no changes are needed as long as the backend is running on port 8000. Open `http://localhost:4200` in your browser — the chat widget will call the local FastAPI backend.

---

## Running both together

Open two terminals:

```bash
# Terminal 1 — backend
venv\Scripts\activate
python main.py

# Terminal 2 — frontend
cd frontend
npm start
```

Then browse to `http://localhost:4200`.

---

## Useful references

- Full backend/frontend docs: [`docs/README.md`](./docs/README.md)
- Frontend-specific notes: [`frontend/README.md`](./frontend/README.md)

## License

Distributed under the **MIT License**.
