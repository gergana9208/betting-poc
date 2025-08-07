### Setup & Run Instructions

# Install dependencies

npm install

# Run the API

npx tsx backend/index.ts

# Run tests

npm test

### Architecture

This is a simple RESTful api service for managing bets. It's built with Fastify for performace and simplicity. with an in-memoty store(Map) for holding bet information. The app uses an in-memory store (Map) to hold betting data and includes custom validation and centralised error handling to improve maintainability and separation of logic

### Folder Structure

/backend
│
├── app.ts # Fastify app builder
├── index.ts # App entry point
│
├── errors/ # Error handling
│ ├── AppError.ts
│ ├── BusinessError.ts
│ ├── ErrorCodes.ts
│ ├── ErrorHandler.ts
│ └── TechnicalError.ts
│
├── events/ # Event-driven logic
│ └── emitter.ts
│
├── models/ # TypeScript interfaces and types
│ └── bets.ts
│
├── routes/ # Route definitions
│ └── betsRoute.ts
│
└── services/ # Business logic
├── betService.ts
└── oddsService.ts

### Key technical decisions (bullet points are fine)

- Fastify chosen for high performance and minimal boilerplate over heavier frameworks like Express.
- In-memory store (Map) used to meet POC requirements with fast, simple data access.
- Modular structure with clear separation of concerns (routes, services, models, errors, events).
- Custom error classe provide clear distinction between internal and domain level issues
- Service-layer validation keeps route handlers clean and focused on HTTP concerns.
- EventEmitter used to simulate an event-driven architecture on odds updates.
- Error codes follow a structured naming convention (BETTING_POC_4XXX) to improve traceability and debugging.
- Unit tests cover both happy and edge cases.

### Main Assumptions Made

- No authentication or user management — this is a public, open API for demonstration purposes only.
- Bets are stored in-memory using a Map, meaning data is lost on server restart.
- Only three endpoints created for the POC:
  - POST /bets to create a bet
  - GET /bets to retrieve bets (with optional filters)
  - PUT /bets/:id/odds to update odds
- Odds updates emit a simple event using Node’s EventEmitter; no persistent event queue or subscriber model is needed for this POC.
- Error codes follow a custom convention (BETTING_POC_4XXX) and are split into business and technical categories for clarity.

### AI Usage

This solution was developed with the help of ChatGPT, used specifically for:

- Refactoring code for readability and maintainability
- Writing inline documentation and test scaffolding

All AI-generated code was manually reviewed, modified, and tested to meet production-quality standards
