# EduMind AI

**Learn Smarter. Prepare Better. Achieve More.**

Professional AI-powered learning platform for Nigerian students preparing for WAEC, NECO and JAMB.

## Features

- **Snap & Solve** – Upload question photos, get subject/topic/difficulty, step-by-step solutions, concept explanations and similar questions
- **AI Tutor** – Conversational teaching with examples, hints, testing and difficulty adjustment + voice input/output
- **Quiz Engine** – Timed practice, auto-marking, detailed explanations
- **AI Learning Coach** – Personalised recommendations from real performance data
- **Smart Study Planner** – Schedules based on exam date, hours and weaknesses
- **Performance Analytics** – Subject & topic mastery tracking
- **Document AI** – Summarise notes/PDFs, generate quizzes & flashcards
- **Career Navigator** & **University Explorer**
- **Gamification** – XP, levels, streaks, badges
- **Competition Demo Mode** – Full learning loop in one flow

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + SQLite (easy local DB)
- NextAuth-ready auth structure
- Modular AI services (`src/ai/`) with intelligent mock layer (swap for real xAI/OpenAI via env)

## Quick Start

```bash
cd edumind-ai
cp .env.example .env   # or use existing .env
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000

**Competition judges:** go straight to **/demo** for the full Snap → Solve → Quiz → Analysis → Plan experience.

## Environment

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
DEMO_MODE="true"
OPENAI_API_KEY=   # optional – when set, real AI can replace mocks
XAI_API_KEY=      # optional
```

## Project Structure

```
src/
  ai/           # tutor, questionSolver, quizGenerator, coach, planner...
  app/          # routes: demo, dashboard, snap, tutor, practice...
  components/
  lib/
prisma/
  schema.prisma # full student learning models
```

## Notes

- AI-generated questions are clearly labelled as practice material.
- Not affiliated with WAEC, NECO or JAMB.
- Designed mobile-first.
- Mock AI produces structured, educational responses suitable for live demos when API keys are unavailable.

Built for AI + Web Development competition to professional startup standard.
