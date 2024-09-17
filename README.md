# GooseGuard

Made under 36 hours for Hack the North 2024

### Links
- Demo: https://goose-guard.vercel.app
- Devpost: https://devpost.com/software/gooseguard 
- Hugging Face: https://huggingface.co/zelchy/scam-detection

Protect yourself from scam emails, texts, and calls with our AI-powered cybersecurity platform. GooseGuard helps identify fraudulent communication using AI to analyze and detect suspicious patterns in emails, text messages, and phone calls!

### [`goose-guard`](/goose-guard/)
- The core of the GooseGuard platform, a full-stack web application built with Next.js on top of Convex

### [`goose-guard-model`](/goose-guard-model/)
- Interfaces Python scripts responsible for transcribing and detecting suspicious activity via the LLM Bert (featuring 460,000,000+ parameters)

## Installation
- Clone *this* repository
- Instructions diverge below for Next.js application and BERT model:
- [`goose-guard`](/goose-guard/) - Next.js
    1. Setup virtual environment: `python -m venv .venv`, then `pip install -r requirements.txt`
        - To enter the virtual environment: `./venv/Scripts/activate`
        - To leave the virtual environment: `deactivate`
    2. `.env` variables: `HF_API_KEY` - Hugging Face API key
- [`goose-guard-model`](/goose-guard-model/) - BERT:
    1. Setup environment: `npm install`
    2. Setup Convex: `npx convex dev`
    3. `.env` variables: `HF_API_KEY` - Hugging Face API key, `GROQ_API_KEY` - Groq API key
