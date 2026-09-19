# Debt Ledger

Debt Ledger is a voice-enabled debt tracker for small businesses and independent traders. Record who owes money, why they owe it, when repayment is due, and how much remains outstanding from one focused dashboard.

The project combines a React and Vite frontend with a FastAPI backend. Its ASR workflow accepts a voice recording, transcribes it with ElevenLabs Scribe, and sends the transcript to Gemini for structured debt-field extraction before opening the add-debt flow.

## Features

- Dashboard view of amounts owed, debtor count, and overdue balances
- Debt records with debtor details, liability, due date, phone number, guarantor, and notes
- Debt list for reviewing and managing records
- Browser microphone recording for voice-first data entry
- ASR transcription and structured debt extraction through the backend
- Responsive UI built with React Router and plain CSS

## Stack

- Frontend: React 19, Vite, React Router, Axios
- Backend: FastAPI, SQLAlchemy, SQLite
- Voice and extraction: ElevenLabs Scribe and Google Gemini

## Project Structure

```text
src/                 React application and debt-tracking UI
backend/main.py      FastAPI routes, ASR upload, and persistence API
backend/agent.py     Gemini debt-field extraction schema and prompt
backend/database.py  SQLAlchemy models and SQLite setup
```

## Getting Started

### Frontend

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

### Backend

Create a Python environment and install the backend dependencies used by the application:

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install fastapi uvicorn sqlalchemy python-multipart itsdangerous elevenlabs google-genai pydantic
uvicorn backend.main:app --reload --port 8000
```

The voice workflow requires valid provider credentials configured through environment variables before starting the backend. Never commit API keys to source control.

## Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Status

This is an active portfolio project. The frontend currently includes dashboard demo values while the backend routes are being connected to authenticated, persistent user data. Provider credentials, authentication hardening, and API error handling should be completed before production deployment.

