from sqlalchemy import Column, Integer, create_engine, String, ForeignKey, Numeric, DateTime, func, Boolean
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, MappedColumn
from decimal import Decimal
from datetime import datetime, timedelta
import os


engine = create_engine(os.getenv("DATABASE", "sqlite:///./mydb.db"))


def two_weeks_from_now_on():
    return datetime.now() + timedelta(weeks=2)


class Base(DeclarativeBase):
    pass


class Traders(Base):
    __tablename__ = "traders"
    id = Column(Integer, primary_key=True)
    trader_name = Column(String(255))
    trader_phone_number = Column(String(255), unique=True)
    debts = relationship("Debts", back_populates="trader")


class Debts(Base):
    __tablename__ = "debts"
    id = Column(Integer, primary_key=True, unique=True)
    trader_id = Column(Integer, ForeignKey("traders.id"))
    debtor_name = Column(String(255))
    debtor_phone_number = Column(String(255), default="")
    recievable: Mapped[Decimal] = MappedColumn(Numeric(10, 2))
    liability = Column(String)
    guarantor = Column(Boolean, default=False)
    guarantor_name = Column(String(255), default="")
    addtional_description = Column(String, default="")
    due_date = Column(DateTime, default=lambda: two_weeks_from_now_on())
    trader = relationship("Traders", back_populates="debts")
    partial_payments = relationship("PartialPayments", back_populates="debt")
    created_at = Column(DateTime, server_default=func.now())


class PartialPayments(Base):
    __tablename__ = "partial_payments"
    id = Column(Integer, primary_key=True)
    debt_id = Column(Integer, ForeignKey("debts.id"), nullable=True)
    amount = Column(Numeric(10, 2))
    description = Column(String)
    outstanding_balance = Column(Numeric(10, 2))
    repayment_date = Column(DateTime, server_default=func.now())
    next_due_date = Column(DateTime, default=lambda: two_weeks_from_now_on())
    debt = relationship("Debts", back_populates="partial_payments")


def init_db():
    Base.metadata.create_all(engine)
