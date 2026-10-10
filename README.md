# Legal Doc AI

A prototype legal-document review and drafting assistant focused on:
- inconsistency detection
- civil-rights and compliance checks
- New Mexico jurisdictional review
- bias-aware, evidence-based legal analysis
- document summarization and risk review

## Features
- Legal review form with jurisdiction and document type
- AI-powered risk analysis for contracts and policies
- Findings + recommendations output
- Clean dark dashboard interface
- ready for OpenAI-backed document analysis

## Getting started

1. Install dependencies:
   npm install
2. Create local env:
   cp .env.example .env.local
3. Add your OpenAI key:
   OPENAI_API_KEY=your_key_here
4. Start the app:
   npm run dev
5. Open http://localhost:3000

## Important note
This app is designed for document review assistance and drafting support. It is not a substitute for legal advice.

## Project structure
- app/page.tsx — review dashboard UI
- app/api/analyze/route.ts — AI analysis endpoint
- app/layout.tsx — root layout
- app/globals.css — styling
