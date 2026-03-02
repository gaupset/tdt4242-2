# AI Guidebook

A web app for university students to log, categorize, and declare their use of AI tools in coursework.

## Tech Stack

- **Client:** React, Vite, Tailwind CSS
- **Server:** Node.js, Express, Prisma ORM, PostgreSQL

## Prerequisites

- Node.js 18+
- PostgreSQL running locally

## Setup

### 1. Server

```bash
cd server
cp .env.example .env   # then edit .env with your DB credentials
npm install
npx prisma migrate dev --name init
npm run dev             # starts on http://localhost:3001
```

### 2. Client

```bash
cd client
npm install
npm run dev             # starts on http://localhost:5173
```

The client proxies `/api` requests to the server automatically.

### Seed Data (optional)

```bash
cd server
npx prisma db seed
```

Creates a test user (`student@example.com` / `password123`) with a sample project.
