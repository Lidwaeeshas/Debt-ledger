from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from database import engine ,Debts,Traders,PartialPayments,init_db
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager


def get_db():
    with Session(engine) as db:
        yield db

@asynccontextmanager
async def lifespan(app:FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
