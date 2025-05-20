from fastapi import APIRouter

entry_router = APIRouter()

@entry_router.get('/')
def entry():
    return {
        "status":"ok",
        "message":"The server is running",
        "port":2000
        }