from fastapi import FastAPI, Request, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Debts, Traders, PartialPayments, init_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from decimal import Decimal
from starlette.middleware.sessions import SessionMiddleware
from elevenlabs.client import ElevenLabs
import os
from agent import json_resonse

two_weeks = datetime.now() + timedelta(weeks=2)

API = "sk_992b9e96884c35df2740891c33aaac32c145c9b561601980"

client = ElevenLabs(api_key=API)


class DebtData(BaseModel):
    debtor_name: str
    recievable: Decimal
    debtor_phoneNumber: Optional[str] = None
    liability: Optional[str] = None
    due_date: Optional[datetime] = None
    guarantor: Optional[bool] = None
    guarantor_name: Optional[str] = None
    addtional_description: Optional[str] = None
    trader_id: int


class PartialPaymentData(BaseModel):
    amount: Decimal
    next_repayment_date: Optional[datetime]


class DeleteDebt(BaseModel):
    id: int


def response(status, message, data=None):
    return {"status": status, "message": message, "data": data}


def data_return(dataObj):
    payload = [
        {
            "id": data.id,
            "debtor_name": data.debtor_name,
            "recievable": float(data.recievable),
            "debtor_phoneNumber": data.debtor_phoneNumber,
            "liability": data.liability,
            "due_date": data.due_date.isoformat() if data.due_date else None,
            "guarantor": data.guarantor,
            "guarantor_name": data.guarantor_name,
            "addtional_description": data.addtional_description,
            "created_at": data.created_at.isoformat() if data.created_at else None,
        }
        for data in dataObj
    ]
    return payload


def handle_access(request):
    trader_id = request.session.get("trader_id")
    if not trader_id:
        return False
    return True, trader_id


def get_db():
    with Session(engine) as db:
        yield db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(SessionMiddleware, secret_key="idkicidgaf")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/save-debt")
def save_debt(debt: DebtData, request: Request, db: Session = Depends(get_db)):
    if not handle_access:
        return response("failed", "Unauthorised access")
    data = debt.model_dump()
    debt_data = Debts(**data)
    try:
        db.add(debt_data)
        db.commit()
        return response("success", "Data saved successfully")
    except SQLAlchemyError as e:
        db.rollback()
        return response("failed", str(e))


@app.get("/due-dates")
def due_dates(request: Request, db: Session = Depends(get_db)):
    if not handle_access(request):
        return response("failed", "Unauthorised access")
    trader_id = handle_access[1]
    try:
        debts_due = (
            db.query(Debts)
            .filter(Debts.due_date <= datetime.now(), Debts.trader_id == trader_id)
            .all()
        )
        data = data_return(debts_due)
        return response("success", "Due dates fetched successfully", data)
    except SQLAlchemyError as e:
        return response("failed", str(e))


@app.get("/all-debts")
def all_debts(request, db: Session = Depends(get_db)):
    if not handle_access(request):
        return response("failed", "Unauthorized access")
    trader_id = handle_access[1]
    trader_debts = db.query(Debts).filter_by(trader_id=trader_id).all()
    all_debts = data_return(trader_debts)
    return all_debts


@app.get("/update-payments")
def update_payments(
    partial: PartialPaymentData, request: Request, db: Session = Depends(get_db)
):
    debt = (
        db.query(Debts)
        .filter_by(debtor_name=partial.debtor_name, id=partial.debt_id)
        .first()
    )

    amount_paid = partial.amount
    debt.recievable -= amount_paid

    db.flush()

    outstanding = debt.recievable
    next_due_date = partial.next_repayment_date

    if not next_due_date:
        next_due_date = two_weeks

    debt.due_date = next_due_date

    partial_payment = PartialPayments(
        amount=amount_paid,
        description=partial.description,
        outstanding_balance=outstanding,
        next_due_date=next_due_date,
    )
    try:
        db.add(partial_payment)
        db.commit()

        return response("success", "data updated successfully")
    except SQLAlchemyError as e:
        db.rollback()
        return response("failed", str(e))


@app.post("/delete-debt")
def delete_debt(ids: DeleteDebt, request: Request, db: Session = Depends(get_db)):
    trader_id = ids.trader_id
    debt_id = ids.debt_id

    try:
        db.query(Debts).filter(trader_id=trader_id, id=debt_id).delete(
            synchronize_session=False
        )
        return response("success", "debt deleted successfully")
    except SQLAlchemyError as e:
        db.rollback()
        return response("failed", f"error: {e}")


@app.post("/audio")
async def audio(request: Request, audio: UploadFile = File(...)):
    try:
        # 1. Read the raw audio bytes from the upload stream
        audio_bytes = await audio.read()

        # 2. Package it exactly how the ElevenLabs SDK expects it (filename, bytes)
        file_tuple = (audio.filename or "recording.webm", audio_bytes)

        # 3. Call the transcription service
        transcription = client.speech_to_text.convert(
            file=file_tuple, model_id="scribe_v2", language_code="hau"
        )
        json_res = json_resonse(transcription.text)
        return {"status": "success", "json": json_res}

    except Exception as e:
        # If something else fails, return a 400 bad request instead of crashing with a 500
        print(f"Error during transcription: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    print("yes" if os.getenv("ELEVEN_API") else "No")

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
