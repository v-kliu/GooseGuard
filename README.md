# GooseGuard

![Home Picture](/goose-guard/app/gooseguardhome.png)
Built in under 36 hours for **Hack the North 2024**

## Links
- **Live Website**: [GooseGuard](https://goose-guard.vercel.app)
- **Devpost**: [GooseGuard on Devpost](https://devpost.com/software/gooseguard)
- **Hugging Face**: [Scam Detection Model](https://huggingface.co/harrumnoor/scam-detection)

## Overview

**GooseGuard** was created at **Hack the North 2024** to address the increasing problem of online scams. In today's digital world, scam emails, texts, and calls have become more sophisticated, making it difficult for individuals to identify fraudulent communication. GooseGuard is an AI-powered cybersecurity platform that helps users protect themselves by analyzing and detecting suspicious patterns in various forms of communication.

## Problem Statement

Online scams are a global issue, costing individuals and businesses billions of dollars annually. Despite advancements in cybersecurity, scammers continue to evolve their tactics, targeting people through emails, text messages, and phone calls. The challenge is to develop a solution that can quickly and accurately identify these scams to protect users.

## Solution

**GooseGuard** uses a multi-layered approach to scam detection:
- **AI Analysis**: The core of GooseGuard is an AI-powered model trained to detect scam patterns in communication.
- **Transcription**: Through our model's integration with audio transcription tools, scam phone calls are accurately converted to text for analysis.
- **Multi-Format Detection**: GooseGuard analyzes emails, texts, and phone calls, providing a comprehensive defense against scams.

## Key Features

- **AI-Powered Scam Detection**: Utilizes a fine-tuned BERT model with over 340 million parameters to accurately detect scam content.
- **Cross-Validation**: Checks area codes, identifies robocallers, and flags requests for personal information to enhance scam detection.
- **User-Friendly Interface**: An intuitive web application that allows users to easily upload and analyze their messages and recordings.

## Tech Stack

- **Frontend**: TypeScript, Next.js, Tailwind CSS
- **Backend**: Convex, Supabase
- **Machine Learning**: Python, BERT Model (via Hugging Face)

## [`goose-guard`](/goose-guard/)
- The core of the GooseGuard platform, a full-stack web application built with Next.js and Convex for the backend.

## [`goose-guard-model`](/goose-guard-model/)
- Interfaces Python scripts responsible for transcribing and detecting suspicious activity using BERT (featuring 460,000,000+ parameters).

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
 
## Team
![Team Picture](/goose-guard/app/gooseguardteam.jpg)
