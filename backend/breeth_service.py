import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("BREETH_API_KEY")

BASE_URL = "https://api.thebreeth.com/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def save_memory(message):

    payload = {
        "content": message
    }

    response = requests.post(
        f"{BASE_URL}/episodes",
        headers=headers,
        json=payload
    )

    return response.json()

    response = requests.post(
        f"{BASE_URL}/episodes",
        headers=headers,
        json=payload
    )

    return response.json()

def search_memory(query):
    payload = {
        "query": query,
        "limit": 5
    }

    response = requests.post(
        f"{BASE_URL}/search",
        headers=headers,
        json=payload
    )

    print(response.status_code)
    print(response.text)

    return response.json()