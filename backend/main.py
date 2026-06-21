from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

from breeth_service import (
    save_memory,
    search_memory
)

from cache_service import (
    get_cache,
    set_cache,
    increment,
    get_metric
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MemoryRequest(BaseModel):
    message: str

class GoalRequest(BaseModel):
    goal: str

@app.get("/")
def home():
    return {
        "project": "CareerPilot AI"
    }


@app.post("/memory")
def memory(data: MemoryRequest):

    result = save_memory(data.message)

    increment("memories")

    return result


@app.post("/search")
def search(data: MemoryRequest):

    result = search_memory(data.message)

    increment("retrievals")

    return result


@app.post("/chat")
def chat(data: MemoryRequest):

    cached = get_cache(data.message)

    if cached:
        return {
            "source": "cache",
            "response": cached
        }

    result = search_memory(data.message)

    edges = result.get("edges", [])

    if not edges:
        response = "I don't have any information about that yet."

    else:
        facts = []

        for edge in edges:
            facts.append(edge["fact"])

        response = "\n".join(facts)

    set_cache(
        data.message,
        response
    )

    return {
        "source": "breeth",
        "response": response
    }


@app.get("/stats")
def stats():

    return {
        "memories": get_metric("memories"),
        "cache_hits": get_metric("cache_hits"),
        "cache_misses": get_metric("cache_misses"),
        "retrievals": get_metric("retrievals")
    }

@app.post("/roadmap")
def roadmap(data: GoalRequest):

    return {
        "goal": data.goal,

        "roadmap": [
            "Master DSA",
            "Build 3 Full Stack Projects",
            "Learn System Design",
            "Practice Mock Interviews",
            "Contribute to Open Source"
        ],

        "recommended_projects": [
            "AI Resume Analyzer",
            "Interview Coach",
            "Job Tracker"
        ]
    }