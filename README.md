
# Betting POC API

## 🧰 Setup & Run Instructions

```bash
# Install dependencies
npm install

# Run the API
npx tsx backend/index.ts

# Run tests
npm test
```

Server runs on `http://localhost:3001`

## ⚙️ Architecture Explanation

This is a simple RESTful API service for managing bets. It's built using Fastify for performance with an in-memory store (`Map`) for holding bet information. It includes error validation and error handling to improve maintainability and scalability potential.

## 📁 Folder Structure

```text
/backend
│
├── app.ts                # Fastify app builder
├── index.ts              # App entry point
│
├── errors/               # Error handling
│   ├── AppError.ts
│   ├── BusinessError.ts
│   ├── ErrorCodes.ts
│   ├── ErrorHandler.ts
│   └── TechnicalError.ts
│
├── events/               # Event-driven logic
│   └── emitter.ts
│
├── models/               # TypeScript interfaces and types
│   └── bets.ts
│
├── routes/               # Route definitions
│   └── betsRoute.ts
│
└── services/             # Business logic
    ├── betService.ts
    └── oddsService.ts
```

## 📌 Key Technical Decisions

- **Fastify**: Used for its speed and modern plugin system
- **Centralised error handling** with custom `AppError` types for business and technical errors
- **In-memory store**: Simple and fast for proof-of-concept
- **Service-layer validation**: Keeps routes clean and logic reusable
- **EventEmitter** used to simulate basic event-driven behaviour
- **Modular folder structure** for separation of concerns

## ✅ Assumptions

- No authentication required
- Bets are stored in-memory using a Map, meaning data is lost on server restart.
- Only three endpoints: create, get (with filters), update odds
- Odds must be a number > 0
- Valid bet `status` is either `'open'` or `'closed'`
- Error handling uses fixed error codes

## 🤖 AI Usage

ChatGPT was used for:
- Code structure design & refactoring
- README and documentation drafting

All code was reviewed and modified by a human before submission.
