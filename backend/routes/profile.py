"""
Portfolio content routes — profile, skills, and services, all read from
MongoDB (populated by backend/seed_profile.py). Mirrors the shape the
Angular frontend used to read from local JSON fixtures, so the frontend
PortfolioService just swaps its HTTP target.
"""

from fastapi import APIRouter, HTTPException

from ..database import (
    profile_collection,
    skills_collection,
    services_collection,
    education_collection,
    projects_collection,
)

router = APIRouter(tags=["Profile"])


def _strip_id(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


@router.get("/profile")
def get_profile():
    """Return the portfolio owner's profile (name, tagline, contact, nav, socials)."""
    doc = profile_collection.find_one({})
    if not doc:
        raise HTTPException(status_code=404, detail="Profile not seeded yet")
    return _strip_id(doc)


@router.get("/skills")
def get_skills():
    """Return all skill tiles, ordered as inserted."""
    return [_strip_id(doc) for doc in skills_collection.find({})]


@router.get("/services")
def get_services():
    """Return all service tiles, ordered as inserted."""
    return [_strip_id(doc) for doc in services_collection.find({})]


@router.get("/education")
def get_education():
    """Return the education roadmap, ordered chronologically as inserted."""
    return [_strip_id(doc) for doc in education_collection.find({})]


@router.get("/projects")
def get_projects():
    """Return project cards, ordered as inserted."""
    return [_strip_id(doc) for doc in projects_collection.find({})]
