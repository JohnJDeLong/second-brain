# Second Brain Roadmap

## Purpose

This roadmap is intended to help current and future developers, collaborators, and coding agents understand:

- what the project is trying to become
- what has already been completed
- what should be built next
- what work is blocked, in progress, or planned
- what the current priorities are

This document should evolve with the project. It is not meant to lock the project into a rigid plan. Instead, it should provide a clear shared direction while leaving room for iteration.

---

## Project Goal

Second Brain is a personal knowledge application designed to help users capture, organize, and retrieve web content more effectively.

The long-term vision is to create a system where users can:

1. save content from the web
2. store it in a structured way
3. enrich it with AI-generated summaries and metadata
4. search it by keyword or semantic meaning
5. ask grounded questions over their own saved content

The product should make saved information more useful over time rather than harder to find.

---

## Current Product Direction

The current direction is to build a strong backend-first foundation that supports:

- authentication
- protected user-specific data
- item creation and retrieval
- future AI summarization and tagging
- future semantic search
- future grounded chat over saved content
- future browser extension capture flow

The project is currently in its early backend foundation stage.

---

## Current Status Snapshot

### Completed

- project repo initialized
- GitHub repo connected
- `.gitignore` created and protecting `.env`
- `server` directory initialized
- TypeScript configured for backend
- Express server running
- Prisma configured
- initial Prisma schema created
- initial migration successfully applied
- Prisma client connection working
- database test route working
- JWT auth utilities created
- signup route working
- login route working
- `/api/auth/me` protected route working
- JWT middleware working
- `POST /api/items` working
- `GET /api/items` working
- item creation tied to authenticated user
- item retrieval scoped to authenticated user

### In Progress

- backend API foundation
- planning next protected item routes
- shaping documentation and roadmap for future work

### Not Started Yet

- update item route
- delete item route
- single item detail route
- AI summary generation
- AI tag generation
- embedding generation
- semantic search
- grounded chat over saved content
- frontend dashboard
- browser extension
- deployment

---

## Current Architecture Direction

The intended architecture is:

- **capture layer** for collecting content from the web
- **backend API** for auth and core business logic
- **database layer** for persistence
- **AI/retrieval layer** for summaries, tags, embeddings, and grounded Q&A
- **frontend/dashboard layer** for user interaction
- **browser extension layer** for convenient content ingestion

This architecture may evolve, but future decisions should generally support this shape.

---

## Recommended Development Order

The project should be built in layers.

### Phase 1 — Backend Foundation
Focus: auth, database, protected routes, user-owned data

#### Goals
- establish user authentication
- protect routes with JWT middleware
- create and read saved items tied to the current user
- make the backend reliable before building the frontend or extension

#### Status
Mostly underway / partially complete

#### Completed in this phase
- signup
- login
- `/api/auth/me`
- `POST /api/items`
- `GET /api/items`

#### Remaining in this phase
- `GET /api/items/:id`
- `PATCH /api/items/:id`
- `DELETE /api/items/:id`
- better validation and error handling
- route/controller cleanup as needed

---

### Phase 2 — Item Lifecycle Completion
Focus: finish core CRUD and item ownership protections

#### Goals
- allow users to view a single item
- allow users to update their own item metadata
- allow users to delete their own items
- make sure ownership checks are enforced consistently

#### Recommended next tasks
1. build `GET /api/items/:id`
2. build `PATCH /api/items/:id`
3. build `DELETE /api/items/:id`
4. ensure each route verifies item ownership

#### Important rule
No user should ever be able to read, edit, or delete another user’s saved item.

---

### Phase 3 — AI Enrichment
Focus: make saved items more useful through AI-generated context

#### Goals
- generate summaries for saved items
- generate tags for saved items
- track processing state
- prepare for future retrieval workflows

#### Possible implementation approaches
- synchronous processing during item creation
- asynchronous processing after item creation

#### Recommended starting point
Start simple with synchronous processing, then refactor later if needed.

#### Suggested tasks
- add AI service module
- create summary generation function
- create tag generation function
- store outputs on `SavedItem` / related models
- update `processingStatus`

---

### Phase 4 — Semantic Search
Focus: retrieval by meaning, not only exact keyword

#### Goals
- generate embeddings for saved items
- store embeddings
- allow the user to query by semantic meaning
- retrieve relevant saved items by similarity

#### Suggested tasks
- decide final embedding storage approach
- generate one embedding per saved item first
- create semantic search route
- test query-to-item similarity flow

#### Scope note
Start with one embedding per saved item. Do not overcomplicate retrieval too early.

---

### Phase 5 — Grounded Chat / RAG
Focus: answer user questions using their saved content only

#### Goals
- retrieve the most relevant saved items for a question
- pass that context into the model
- return an answer grounded in retrieved content
- include source references where possible

#### Suggested tasks
- create chat route
- retrieve top matching saved items
- construct grounded prompt
- return answer + sources

#### Important rule
The model should answer using retrieved user content, not generic unsupported responses.

---

### Phase 6 — Frontend Dashboard
Focus: user-facing experience

#### Goals
- allow users to sign up and log in
- browse saved items
- view summaries and tags
- search saved items
- use grounded chat

#### Suggested features
- auth flow
- item list view
- detail view
- search bar
- chat panel
- status indicators

---

### Phase 7 — Browser Extension
Focus: capture layer for real web workflows

#### Goals
- let users save content directly from the browser
- capture title, URL, and selected text or extracted content
- send saved data to backend

#### Suggested MVP
- save current tab title and URL
- capture selected text if available
- fallback to page text
- send authenticated request to backend

---

### Phase 8 — Polish and Deployment
Focus: production readiness and presentation

#### Goals
- improve error handling
- improve UI polish
- add environment documentation
- deploy backend and frontend
- prepare project for demo and portfolio use

---

## Immediate Next Priorities

These are the most logical next steps from the current state.

### Priority 1
Finish protected item lifecycle routes:

- `GET /api/items/:id`
- `PATCH /api/items/:id`
- `DELETE /api/items/:id`

### Priority 2
Add stronger request validation and cleaner error responses.

### Priority 3
Decide how AI enrichment should be introduced:
- summary first
- tags second
- embeddings after that

### Priority 4
Begin frontend setup once backend item lifecycle is stable.

---

## Suggested Near-Term Task Queue

### Backend
- [ ] add `GET /api/items/:id`
- [ ] add `PATCH /api/items/:id`
- [ ] add `DELETE /api/items/:id`
- [ ] add ownership checks for all item routes
- [ ] add input validation for item creation and update
- [ ] clean up controller and route organization if needed

### AI Layer
- [ ] create AI service structure
- [ ] summary generation
- [ ] tag generation
- [ ] update `processingStatus`
- [ ] define embedding strategy

### Retrieval
- [ ] semantic search route
- [ ] query embedding generation
- [ ] similarity-based item retrieval

### Chat / RAG
- [ ] grounded chat route
- [ ] retrieve top relevant items
- [ ] answer generation with context
- [ ] include sources in response

### Frontend
- [ ] initialize client app
- [ ] auth pages
- [ ] dashboard page
- [ ] item list UI
- [ ] search UI
- [ ] chat panel

### Extension
- [ ] initialize extension project
- [ ] capture current page metadata
- [ ] optional selected text capture
- [ ] authenticated request to backend

---

## Engineering Guidelines

When making changes, contributors and coding agents should follow these principles:

### Preserve user ownership boundaries
User-specific routes must always scope data access to the authenticated user.

### Prefer small, testable steps
Avoid introducing too many moving parts at once. Ship one stable layer before building the next.

### Build from core workflow outward
The most important workflow is:
1. authenticate user
2. save item
3. retrieve item
4. enrich item
5. search item
6. ask grounded questions over item

### Keep features aligned with product intent
A feature is likely a good fit if it improves one of these:
- saving knowledge
- organizing knowledge
- understanding knowledge
- retrieving knowledge
- using knowledge later

### Avoid overengineering early
Future extensibility matters, but not at the cost of blocking the MVP.

---

## Definition of a Good Next Step

A good next step is one that either:

- strengthens the core user workflow
- reduces technical uncertainty for future phases
- unlocks the next layer of the roadmap

Examples:
- finishing item CRUD is a good next step
- adding semantic search before stable item routes is probably too early
- building a browser extension before stable backend item creation is probably too early

---

## Known Product Throughline

The project should continue moving toward this core experience:

> A user saves something meaningful from the web, the system enriches it with AI, and later helps the user find and use it again.

That is the main thread future contributors should keep in mind.

---

## Suggested Documentation to Add Later

As the codebase grows, consider adding:

- setup guide
- environment variable guide
- API route reference
- database schema overview
- auth flow notes
- AI pipeline notes
- semantic search notes
- extension architecture notes
- deployment guide

---

## Working Rule for Future Agents

Before implementing a feature, ask:

1. What phase of the roadmap are we currently in?
2. Does this feature support the main product goal?
3. Does this depend on unfinished foundational work?
4. Can this be implemented in a smaller version first?

If a task is ambiguous, prefer the smaller implementation that supports the next roadmap milestone.

---

## Current Recommendation

The next concrete engineering task should be:

**finish the remaining protected item routes and enforce item ownership checks.**