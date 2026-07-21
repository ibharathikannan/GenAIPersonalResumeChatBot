"""
Seeds the portfolio_db (profile, skills, services collections) with
Bharathikannan Ilanchezhiyan's real profile data.

Safe to re-run: each collection is fully replaced on every run, so this
is the source of truth for portfolio content — edit this file and re-run
it to update the live site (no redeploy needed for the chat assistant,
since it reads Mongo fresh on every request; the Angular frontend picks
up changes on its next page load).

Usage:
    python -m backend.seed_profile
"""

from backend.database import (
    profile_collection,
    skills_collection,
    services_collection,
    education_collection,
    projects_collection,
)

PROFILE = {
    "name": "Bharathikannan Ilanchezhiyan",
    "title": "Software Engineer",
    "subtitle": "Full-Stack .NET, Angular, Azure Cloud & AI",
    "location": "Singapore",
    "tagline": (
        "10+ years designing, building, and shipping robust software — from "
        "C#/.NET REST APIs to Angular front-ends, Azure cloud infrastructure, "
        "and GenAI/agentic AI systems like this chat assistant. "
        "Ask my AI assistant about my experience below."
    ),
    "avatarUrl": "assets/icons/avatar-cartoon.png",
    "speechBubbles": [
        "Hey! Ask my AI assistant about my experience.",
        "Curious about my .NET, Azure, or AI work? Ask below!",
    ],
    "navLinks": [
        {"label": "Home", "link": "home", "icon": "house"},
        {"label": "About", "link": "about", "icon": "circle-info"},
        {"label": "Services", "link": "services", "icon": "gear"},
    ],
    "contact": {
        "label": "Contact Me",
        "email": "i.bharathikannan@gmail.com",
        "phone": "+65 9716 6797",
    },
    "socials": [
        {"platform": "LinkedIn", "url": "#", "icon": "linkedin"},
        {"platform": "GitHub", "url": "#", "icon": "github"},
    ],
    "footerLinks": [
        {"label": "Privacy Policy", "link": "#"},
        {"label": "Terms", "link": "#"},
    ],
}

EDUCATION = [
    {
        "id": "bachelors-anna-university",
        "degree": "Bachelor of Computer Science & Engineering",
        "institution": "Anna University",
        "location": "Chennai, India",
        "period": "",  # TODO: fill in exact years in this file
        "description": (
            "Foundation in computer science, data structures, algorithms, and "
            "software engineering that launched a 10+ year engineering career."
        ),
        "icon": "graduation-cap",
    },
    {
        "id": "gradip-nus",
        "degree": "Graduate Diploma in System Analysis",
        "institution": "National University of Singapore (NUS)",
        "location": "Singapore",
        "period": "",  # TODO: fill in exact years in this file
        "description": (
            "Advanced systems analysis and design coursework, bridging hands-on "
            "engineering experience with formal systems thinking."
        ),
        "icon": "diagram-project",
    },
    {
        "id": "masters-ai-nus",
        "degree": "Master of Science in Artificial Intelligence Systems",
        "institution": "National University of Singapore (NUS)",
        "location": "Singapore",
        "period": "",  # TODO: fill in exact years in this file
        "description": (
            "Graduate study in AI systems — machine learning, deep learning, NLP, "
            "computer vision, generative AI, and agentic AI architectures, building "
            "on a full-stack engineering foundation."
        ),
        "icon": "brain",
    },
]

SKILLS = [
    {
        "id": "csharp",
        "name": "C#",
        "category": "Backend",
        "iconUrl": "assets/icons/skills/csharp.svg",
        "colorHex": "#9B4F96",
        "description": (
            "10+ years writing C# across every role, most recently at Tata Consulting "
            "Services designing REST APIs and backend modules."
        ),
    },
    {
        "id": "dotnet",
        "name": ".NET Core",
        "category": "Backend",
        "iconUrl": "assets/icons/skills/dotnet.svg",
        "colorHex": "#512BD4",
        "description": (
            "Architected and developed web portals, REST API services, and batch jobs "
            "in .NET Core / .NET Framework at TCS, Samsung SDS, NCS, and on the IRAS "
            "Budget Project via Avanade/Accenture."
        ),
    },
    {
        "id": "entity-framework",
        "name": "Entity Framework",
        "category": "Backend",
        "iconUrl": "assets/icons/skills/entity-framework.svg",
        "colorHex": "#1C7C54",
        "description": (
            "Used Entity Framework at TCS to build backend modules with clean "
            "integration to Angular/TypeScript front-ends."
        ),
    },
    {
        "id": "python",
        "name": "Python",
        "category": "Backend",
        "iconUrl": "assets/icons/skills/python.svg",
        "colorHex": "#4B8BBE",
        "description": (
            "Wrote production Python at Samsung SDS, plus completed IBM's Python for "
            "Data Science, AI & Development and Databases and SQL for Data Science "
            "coursework."
        ),
    },
    {
        "id": "angular",
        "name": "Angular",
        "category": "Frontend",
        "iconUrl": "assets/icons/skills/angular.svg",
        "colorHex": "#DD0031",
        "description": (
            "Hands-on Angular front-end development at Samsung SDS and TCS, building "
            "web portal UIs that integrate with C#/.NET REST APIs."
        ),
    },
    {
        "id": "typescript",
        "name": "TypeScript",
        "category": "Frontend",
        "iconUrl": "assets/icons/skills/typescript.svg",
        "colorHex": "#3178C6",
        "description": "TypeScript, JavaScript, and jQuery across Angular front-end projects.",
    },
    {
        "id": "sql-server",
        "name": "SQL Server",
        "category": "Database",
        "iconUrl": "assets/icons/skills/sql-server.svg",
        "colorHex": "#CC2927",
        "description": (
            "Architected and optimized SQL Server (and MySQL, DB2) schemas at TCS, "
            "enhancing data integrity and query performance; MS-SQL used across most roles."
        ),
    },
    {
        "id": "azure",
        "name": "Microsoft Azure",
        "category": "Cloud",
        "iconUrl": "assets/icons/skills/azure.svg",
        "colorHex": "#0078D4",
        "description": (
            "Configured Azure cloud services and built serverless, event-driven "
            "solutions with Azure Function Apps at TCS; cloud hosting experience at "
            "Samsung SDS too."
        ),
    },
    {
        "id": "azure-devops",
        "name": "Azure DevOps",
        "category": "DevOps",
        "iconUrl": "assets/icons/skills/azure-devops.svg",
        "colorHex": "#0078D7",
        "description": (
            "Built and maintained CI/CD pipelines with Azure DevOps and GitHub Actions "
            "at TCS and Samsung SDS, reducing deployment time and manual errors."
        ),
    },
    {
        "id": "git",
        "name": "Git",
        "category": "DevOps",
        "iconUrl": "assets/icons/skills/git.svg",
        "colorHex": "#F05032",
        "description": "Git, GitHub, GitLab, and TFS for version control across every role since 2015.",
    },
    {
        "id": "scikit-learn",
        "name": "scikit-learn",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/scikit-learn.svg",
        "colorHex": "#F7931E",
        "description": (
            "Classical ML — regression, classification, clustering, and pipeline "
            "design — as part of NUS's Master's in AI Systems coursework and projects."
        ),
    },
    {
        "id": "tensorflow",
        "name": "TensorFlow",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/tensorflow.svg",
        "colorHex": "#FF6F00",
        "description": "Building and training deep learning models with TensorFlow for the Master's in AI Systems program.",
    },
    {
        "id": "keras",
        "name": "Keras",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/keras.svg",
        "colorHex": "#D00000",
        "description": "Rapid neural network prototyping with Keras on top of TensorFlow.",
    },
    {
        "id": "pytorch",
        "name": "PyTorch",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/pytorch.svg",
        "colorHex": "#EE4C2C",
        "description": "Deep learning model development and experimentation with PyTorch.",
    },
    {
        "id": "nlp",
        "name": "NLP",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/nlp.svg",
        "colorHex": "#7C3AED",
        "description": "Natural language processing — text classification, embeddings, and language model fine-tuning.",
    },
    {
        "id": "computer-vision",
        "name": "Computer Vision",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/computer-vision.svg",
        "colorHex": "#0EA5E9",
        "description": "Image classification, object detection, and vision model pipelines.",
    },
    {
        "id": "genai",
        "name": "Generative AI",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/genai.svg",
        "colorHex": "#A855F7",
        "description": "Designing applications on top of large language models — this very portfolio chat assistant is one example.",
    },
    {
        "id": "agentic-ai",
        "name": "Agentic AI",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/agentic-ai.svg",
        "colorHex": "#DB2777",
        "description": "Building autonomous, tool-using AI agents with Pydantic AI, powering this site's own chatbot backend.",
    },
    {
        "id": "langchain",
        "name": "LangChain",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/langchain.svg",
        "colorHex": "#1C3C3C",
        "description": "Composing LLM-powered chains and retrieval pipelines with LangChain.",
    },
    {
        "id": "langgraph",
        "name": "LangGraph",
        "category": "AI & Machine Learning",
        "iconUrl": "assets/icons/skills/langgraph.svg",
        "colorHex": "#16A34A",
        "description": "Building stateful, multi-step agent workflows as graphs with LangGraph.",
    },
    {
        "id": "fastapi",
        "name": "FastAPI",
        "category": "Backend",
        "iconUrl": "assets/icons/skills/fastapi.svg",
        "colorHex": "#009688",
        "description": (
            "Building the AI/ML-powered backend APIs for this very portfolio site — "
            "FastAPI, MongoDB, and Groq-hosted LLMs serving the chat assistant."
        ),
    },
]

SERVICES = [
    {
        "id": "web-api-development",
        "title": "Web & API Development",
        "description": "Designing and building robust web portals and REST APIs with C#, .NET Core, and Angular.",
        "iconUrl": "assets/icons/services/web-development.svg",
    },
    {
        "id": "cloud-devops",
        "title": "Cloud & DevOps",
        "description": "Architecting Azure cloud solutions and CI/CD pipelines with Azure DevOps and GitHub Actions.",
        "iconUrl": "assets/icons/services/cloud-devops.svg",
    },
    {
        "id": "database-design",
        "title": "Database Design",
        "description": "Designing and optimizing SQL Server, MySQL, and DB2 schemas for performance and integrity.",
        "iconUrl": "assets/icons/services/database-design.svg",
    },
    {
        "id": "genai-agentic-apps",
        "title": "GenAI & Agentic AI Apps",
        "description": (
            "Designing and building LLM-powered applications — chat assistants, RAG "
            "pipelines, and autonomous tool-using agents with LangChain, LangGraph, "
            "and Pydantic AI. This portfolio's own AI assistant is a working example."
        ),
        "iconUrl": "assets/icons/services/genai-agentic.svg",
    },
    {
        "id": "machine-learning",
        "title": "Machine Learning",
        "description": (
            "Building predictive models and end-to-end ML pipelines with "
            "scikit-learn — regression, classification, clustering, and feature "
            "engineering."
        ),
        "iconUrl": "assets/icons/services/machine-learning.svg",
    },
    {
        "id": "deep-learning",
        "title": "Deep Learning",
        "description": (
            "Designing and training neural networks with TensorFlow, Keras, and "
            "PyTorch, from prototyping to production-ready models."
        ),
        "iconUrl": "assets/icons/services/deep-learning.svg",
    },
    {
        "id": "computer-vision-service",
        "title": "Computer Vision",
        "description": (
            "Image classification, object detection, and vision model pipelines "
            "for real-world visual data."
        ),
        "iconUrl": "assets/icons/services/computer-vision.svg",
    },
    {
        "id": "nlp-service",
        "title": "Natural Language Processing",
        "description": (
            "Text classification, embeddings, and language model fine-tuning for "
            "extracting meaning and structure from unstructured text."
        ),
        "iconUrl": "assets/icons/services/nlp.svg",
    },
]


PROJECTS = [
    {
        "id": "ai-portfolio-chat",
        "name": "AI-Powered Portfolio & Chat Assistant",
        "description": (
            "This very site — an Angular front-end talking to a FastAPI + MongoDB "
            "backend, with a Groq-hosted LLM (via Pydantic AI) answering visitor "
            "questions live, grounded in this profile's real resume data."
        ),
        "technologies": ["Angular", "FastAPI", "MongoDB", "Groq", "Pydantic AI", "Three.js"],
        "link": "#",  # TODO: put your GitHub repo or live deployment URL here
        "icon": "rocket",
    },
    {
        "id": "student-performance-predictor",
        "name": "Student Exam Performance Indicator",
        "description": (
            "An end-to-end ML web app predicting a student's math exam score from "
            "demographic and academic inputs. FastAPI backend serving a scikit-learn "
            "regression pipeline, Angular front-end, packaged as a single multi-stage "
            "Docker image and deployed to Azure via GitHub Actions CI/CD."
        ),
        "technologies": ["FastAPI", "Angular", "scikit-learn", "Docker", "Azure", "GitHub Actions"],
        "link": "https://student-performance-prediction-ml-docker-gkbseec6fhhtddbe.japaneast-01.azurewebsites.net/",
        "icon": "rocket",
    },
    {
        "id": "loan-approval-ml-system",
        "name": "Loan Approval ML System — Two-Stage Predictor",
        "description": (
            "An end-to-end two-stage ML pipeline for loan approval: a scikit-learn "
            "RandomForest classifier decides approve/reject, then a second "
            "RandomForest regressor estimates the loan amount for approved "
            "applicants. Streamlit front-end, containerized with Docker, built and "
            "pushed to Azure Container Registry via GitHub Actions, and deployed to "
            "Azure App Service for Containers."
        ),
        "technologies": ["Python", "scikit-learn", "Streamlit", "Docker", "Azure", "Azure Container Registry", "GitHub Actions"],
        "link": "https://loanapprovaldetection-fddrhfcqfffsf3gc.japaneast-01.azurewebsites.net/",
        "icon": "rocket",
    },
    # TODO: add your other projects here, e.g.:
    # {
    #     "id": "my-project-slug",
    #     "name": "Project Name",
    #     "description": "One or two sentences on what it does and your role.",
    #     "technologies": ["Tech1", "Tech2"],
    #     "link": "https://github.com/you/project",
    #     "icon": "rocket",
    # },
]


def seed():
    profile_collection.delete_many({})
    profile_collection.insert_one(PROFILE)

    skills_collection.delete_many({})
    skills_collection.insert_many(SKILLS)

    services_collection.delete_many({})
    services_collection.insert_many(SERVICES)

    education_collection.delete_many({})
    education_collection.insert_many(EDUCATION)

    projects_collection.delete_many({})
    projects_collection.insert_many(PROJECTS)

    print(
        f"Seeded 1 profile, {len(SKILLS)} skills, {len(SERVICES)} services, "
        f"{len(EDUCATION)} education entries, {len(PROJECTS)} projects into portfolio_db."
    )


if __name__ == "__main__":
    seed()
