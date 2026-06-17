# AI Expense Tracker

A full-stack expense tracking app with natural language input. Instead of filling out a form, type something like *"Paid 450 for groceries today"* and the app automatically extracts the amount, category, and date.

## Features

- Add expenses manually through a form, or describe them in plain English
- AI-powered parsing using a locally-run LLM (Llama 3.2 via Ollama) — no API key or billing required
- Visual breakdown of spending by category using an interactive bar chart
- Full CRUD support: create, view, and delete expenses
- Persistent storage with SQLite

## Tech stack

**Frontend:** React, Axios, Recharts
**Backend:** Node.js, Express
**Database:** SQLite (via better-sqlite3)
**AI:** Ollama running Llama 3.2 locally

## How it works

The React frontend sends either a structured form submission or a free-text sentence to the Express backend. For free-text input, the backend sends the sentence to a locally running Ollama instance, which returns structured JSON (amount, category, description, date). That data is then validated and saved to a SQLite database, and the frontend re-renders the updated expense list and chart.

## Running it locally

**1. Install Ollama (ollama.com) and pull the model:**