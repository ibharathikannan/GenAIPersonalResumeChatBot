"""
Pydantic models for data validation and serialization.
"""    

from pydantic import BaseModel
from typing import Optional, List

## type hiniting

class Product(BaseModel):
    """Product model for the store inventory."""
    name: str
    description: str
    price: int
    category: str
    size: List[str]  #m , # s # L # xl
    color: List[str] # red, blue, green, yellow, black, white, purple, pink, orange, brown, gray, etc.
    image: str  # url of picsum photos 


class Order(BaseModel):
    """Order placement model."""
    user_email: str
    product_name: str
    quantity: int


class CartItem(BaseModel):
    """Shopping cart item model."""
    user_email: str
    product_name: str
    quantity: int


## portfolio site models

class NavLink(BaseModel):
    label: str
    link: str
    icon: str


class SocialLink(BaseModel):
    platform: str
    url: str
    icon: str


class FooterLink(BaseModel):
    label: str
    link: str


class ContactInfo(BaseModel):
    label: str
    email: str
    phone: str


class Profile(BaseModel):
    """Portfolio owner's profile, shown on the landing page hero/nav/footer."""
    name: str
    title: str
    subtitle: str
    location: str
    tagline: str
    avatarUrl: str
    speechBubbles: List[str]
    navLinks: List[NavLink]
    contact: ContactInfo
    socials: List[SocialLink]
    footerLinks: List[FooterLink]


class Education(BaseModel):
    """A stop on the education roadmap timeline (bachelor's → grad dip → master's)."""
    id: str
    degree: str
    institution: str
    location: str
    period: str
    description: str = ""
    icon: str = "graduation-cap"


class Skill(BaseModel):
    """A skill tile on the landing page, with extra context for the chat assistant."""
    id: str
    name: str
    category: str
    iconUrl: str
    colorHex: str
    description: str = ""


class ServiceOffering(BaseModel):
    """A service tile on the landing page."""
    id: str
    title: str
    description: str
    iconUrl: str


class Project(BaseModel):
    """A project card — name, what it does, tech stack, and a link out."""
    id: str
    name: str
    description: str
    technologies: List[str]
    link: str
    icon: str = "rocket"
