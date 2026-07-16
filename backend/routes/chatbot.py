"""
Chatbot API - portfolio assistant using Pydantic AI + Groq.

Answers visitor questions about the portfolio owner's skills, experience,
and services, grounded in the profile/skills/services documents stored
in MongoDB (see backend/seed_profile.py). The system prompt is rebuilt
from the database on every request so edits to the DB show up in the
assistant's answers immediately, with no redeploy needed.
"""

from fastapi import APIRouter, Body
from pydantic_ai import Agent
from dotenv import load_dotenv

from ..database import (
    profile_collection,
    skills_collection,
    services_collection,
    education_collection,
    projects_collection,
)

load_dotenv()

router = APIRouter(prefix="/chat", tags=["Chatbot"])

agent = Agent("groq:qwen/qwen3-32b")


@agent.system_prompt
async def portfolio_system_prompt() -> str:
    """Build a fresh system prompt from the current profile/skills/services in Mongo."""
    profile = profile_collection.find_one({}) or {}
    skills = list(skills_collection.find({}))
    services = list(services_collection.find({}))
    education = list(education_collection.find({}))
    projects = list(projects_collection.find({}))

    name = profile.get("name", "the portfolio owner")

    skills_lines = "\n".join(
        f"- {s.get('name')} ({s.get('category')}): {s.get('description', '').strip()}"
        for s in skills
    ) or "No skills on file yet."

    services_lines = "\n".join(
        f"- {s.get('title')}: {s.get('description')}"
        for s in services
    ) or "No services on file yet."

    education_lines = "\n".join(
        f"- {e.get('degree')}, {e.get('institution')} ({e.get('location')}): {e.get('description', '').strip()}"
        for e in education
    ) or "No education on file yet."

    projects_lines = "\n".join(
        f"- {p.get('name')} ({', '.join(p.get('technologies', []))}): {p.get('description', '').strip()}"
        for p in projects
    ) or "No projects on file yet."

    return (
        f"You are the AI assistant on {name}'s personal portfolio website. "
        "Visitors are usually recruiters, hiring managers, or fellow engineers. "
        "Answer questions about this person's skills, experience, and services "
        "using ONLY the information below — never invent skills, employers, or "
        "years of experience that aren't listed. Be friendly, concise, and specific; "
        "reference actual skills or services by name when relevant. If you don't have "
        "the information to answer, say so honestly and suggest they reach out directly "
        "via the contact details on the page. If a question is completely unrelated to "
        f"{name}'s professional background, politely steer the conversation back.\n\n"
        f"Name: {name}\n"
        f"Title: {profile.get('title', '')}\n"
        f"Location: {profile.get('location', '')}\n"
        f"Summary: {profile.get('tagline', '')}\n\n"
        f"Education (chronological, bachelor's to most recent):\n{education_lines}\n\n"
        f"Skills:\n{skills_lines}\n\n"
        f"Projects:\n{projects_lines}\n\n"
        f"Services offered:\n{services_lines}\n"
    )


@router.post("")
async def chat_bot(data: dict = Body(...)):
    """
    Main chat endpoint. Accepts `{ "message": str, "history"?: list }` and
    returns `{ "reply": str }`, matching the Angular ChatService contract.
    """
    user_message = (data.get("message") or "").strip()
    if not user_message:
        return {"reply": "Please type a message!"}

    try:
        result = await agent.run(user_message)
        return {"reply": result.output}
    except Exception as e:
        print(f"[Chatbot Error] {e}")
        return {"reply": "Sorry, I ran into an issue answering that — please try again in a moment."}
