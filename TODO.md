# Second Brain Master TODO

A working master checklist for the project.  
This file should stay practical, concrete, and easy to update.

Use it as the main source of truth for:
- what is already done
- what should happen next
- what order we want to build in

---

## Core Product Goal

Build a personal knowledge app that lets users:

- save content from the web
- store it in a structured way
- enrich it with AI-generated context
- search by keyword or semantic meaning
- ask grounded questions over their saved content

---

## Current Recommended Build Order

1. Finish backend item lifecycle
2. Improve validation and error handling
3. Add AI summaries and tags
4. Add embeddings and semantic search
5. Add grounded chat / RAG
6. Build frontend dashboard
7. Build browser extension
8. Polish and deploy

---

## Foundation / Project Setup

- [x] Initialize project repo
- [x] Connect GitHub repo
- [x] Create root `.gitignore`
- [x] Protect `.env` files from git tracking
- [x] Create `server` directory
- [ ] Create `client` app
- [ ] Create `extension` app
- [x] Configure backend TypeScript
- [x] Configure backend package scripts
- [x] Get Express server running
- [x] Add basic `/api/health` route
- [x] Configure Prisma
- [x] Create initial Prisma schema
- [x] Apply initial migration
- [x] Connect Prisma client successfully
- [x] Create database test route
- [x] Add root `README.md`
- [x] Add root `ROADMAP.md`
- [x] Add root `TODO.md`
- [ ] Add setup instructions for future contributors
- [ ] Add environment variable documentation

---

## Database / Prisma

- [x] Create `User` model
- [x] Create `SavedItem` model
- [x] Create `Tag` model
- [x] Create `SavedItemTag` join model
- [x] Create `Embedding` model
- [x] Add `ProcessingStatus` enum
- [x] Run first migration
- [ ] Review schema for naming consistency
- [ ] Decide whether any fields should be renamed before frontend work grows
- [ ] Add indexes if needed for common queries
- [ ] Revisit embedding storage approach before semantic search implementation
- [ ] Add future migration notes if schema changes become more complex

---

## Authentication

- [x] Create JWT utility file
- [x] Create signup route
- [x] Create login route
- [x] Create `/api/auth/me`
- [x] Create auth middleware
- [x] Verify protected routes work with token
- [ ] Add logout strategy decision note
- [ ] Decide frontend token storage approach
- [ ] Add auth flow documentation
- [ ] Add token expiration / session behavior notes
- [ ] Decide whether refresh tokens are needed later
- [ ] Add better auth input validation
- [ ] Add consistent auth error response shapes

---

## Item CRUD

- [x] Build `POST /api/items`
- [x] Build `GET /api/items`
- [x] Tie item creation to authenticated user
- [x] Scope item retrieval to authenticated user
- [ ] Build `GET /api/items/:id`
- [ ] Build `PATCH /api/items/:id`
- [ ] Build `DELETE /api/items/:id`
- [ ] Enforce ownership checks on all item routes
- [ ] Return consistent item response shapes
- [ ] Add item route validation
- [ ] Add better item route error handling
- [ ] Decide whether item updates should allow all editable fields or only some
- [ ] Add route tests if test framework is introduced
- [ ] Add controller/service separation if backend complexity increases

---

## Validation / Error Handling

- [ ] Validate required fields for item creation
- [ ] Validate URL format where useful
- [ ] Validate auth request body shapes
- [ ] Normalize 400 vs 401 vs 403 vs 404 responses
- [ ] Create consistent error response format
- [ ] Add centralized Express error handling middleware
- [ ] Add not-found handler for API routes
- [ ] Add input trimming / normalization where helpful
- [ ] Decide whether to use a validation library later
- [ ] Add friendly error messages for common failures

---

## AI Enrichment

- [ ] Create AI service module
- [ ] Add summary generation function
- [ ] Add tag generation function
- [ ] Store AI summary on saved item
- [ ] Create or attach tags after generation
- [ ] Update `processingStatus` during AI flow
- [ ] Handle AI failures cleanly
- [ ] Decide whether AI processing should be synchronous or async for MVP
- [ ] Add logging around AI calls
- [ ] Limit content size before sending to model
- [ ] Decide what text should be used for summary generation
- [ ] Decide what text should be used for tag generation
- [ ] Document AI workflow in project docs

---

## Embeddings / Semantic Search

- [ ] Choose final embedding generation approach
- [ ] Decide whether to keep one embedding per item for MVP
- [ ] Create embedding generation function
- [ ] Generate embeddings for saved items
- [ ] Store embeddings correctly
- [ ] Decide whether to use plain storage or a vector-specific approach
- [ ] Create semantic search route
- [ ] Generate embedding for search query
- [ ] Compare query embedding to saved item embeddings
- [ ] Return top relevant results
- [ ] Decide on result ranking / sorting strategy
- [ ] Test semantic search with realistic saved content
- [ ] Document retrieval flow

---

## Grounded Chat / RAG

- [ ] Create chat route
- [ ] Accept user question input
- [ ] Retrieve top relevant saved items
- [ ] Build grounded prompt with retrieved context
- [ ] Generate answer using retrieved content only
- [ ] Return answer plus sources
- [ ] Decide how many items to retrieve for chat context
- [ ] Add fallback behavior when retrieved content is weak
- [ ] Make sure responses stay grounded in user data
- [ ] Add clear “not enough information” behavior
- [ ] Decide whether to save chat history
- [ ] Decide whether streaming is worth adding later
- [ ] Document RAG flow for future contributors

---

## Backend Cleanup / Structure

- [ ] Review file structure as backend grows
- [ ] Decide when to introduce service layer more formally
- [ ] Keep route files small and focused
- [ ] Keep controller responsibilities narrow
- [ ] Document backend architecture decisions
- [ ] Add comments only where they improve clarity
- [ ] Remove temporary test routes when no longer needed
- [ ] Replace ad hoc debug logging with intentional logs
- [ ] Add clear naming conventions for controllers/services/routes

---

## Frontend Setup

- [ ] Initialize client app
- [ ] Choose frontend stack details
- [ ] Add frontend TypeScript setup
- [ ] Add routing
- [ ] Add API utility layer
- [ ] Add auth state management
- [ ] Add environment variable handling for frontend
- [ ] Create app shell / layout
- [ ] Add loading and error state patterns
- [ ] Add minimal styling system
- [ ] Decide whether to use Tailwind or another styling approach

---

## Frontend Auth

- [ ] Build signup page
- [ ] Build login page
- [ ] Store token client-side
- [ ] Call `/api/auth/me` on app load
- [ ] Restore logged-in state after refresh
- [ ] Add logout behavior
- [ ] Protect frontend routes
- [ ] Show auth errors cleanly
- [ ] Add basic auth UX polish

---

## Frontend Dashboard / Items

- [ ] Build dashboard page
- [ ] Fetch current user’s items
- [ ] Display item list
- [ ] Create item cards
- [ ] Show title, URL, summary, tags, and dates
- [ ] Build item detail view
- [ ] Add create item flow from frontend
- [ ] Add update item flow from frontend
- [ ] Add delete item flow from frontend
- [ ] Add empty states
- [ ] Add loading states
- [ ] Add error states
- [ ] Add basic responsive layout

---

## Frontend Search / Chat

- [ ] Add keyword search UI
- [ ] Add semantic search UI
- [ ] Show ranked search results
- [ ] Add chat panel UI
- [ ] Submit grounded chat questions
- [ ] Display answer plus sources
- [ ] Add chat loading states
- [ ] Add chat error states
- [ ] Improve source display / citations in UI

---

## Browser Extension

- [ ] Initialize extension project
- [ ] Add extension manifest
- [ ] Create popup UI
- [ ] Read current tab metadata
- [ ] Capture current tab title
- [ ] Capture current tab URL
- [ ] Capture selected text if available
- [ ] Add fallback content extraction
- [ ] Decide how much page content to send
- [ ] Authenticate extension requests
- [ ] Send item creation request to backend
- [ ] Show success state in popup
- [ ] Show error state in popup
- [ ] Document extension architecture

---

## Product / UX Improvements

- [ ] Improve item display design
- [ ] Improve search UX
- [ ] Improve chat UX
- [ ] Add better onboarding for first-time users
- [ ] Add a useful empty state for no saved items
- [ ] Add “why this was saved” style note support
- [ ] Consider folders / collections later
- [ ] Consider favorites / archive state later
- [ ] Consider related items later
- [ ] Consider import flows later

---

## Documentation

- [ ] Finalize `README.md`
- [ ] Finalize `ROADMAP.md`
- [ ] Keep `TODO.md` updated
- [ ] Add setup guide
- [ ] Add environment variable guide
- [ ] Add API route reference
- [ ] Add database schema overview
- [ ] Add auth flow notes
- [ ] Add AI enrichment notes
- [ ] Add semantic search notes
- [ ] Add RAG / grounded chat notes
- [ ] Add extension notes
- [ ] Add deployment notes

---

## Testing

- [ ] Decide test strategy
- [ ] Add backend route tests
- [ ] Add auth tests
- [ ] Add item CRUD tests
- [ ] Add ownership protection tests
- [ ] Add semantic search tests later
- [ ] Add chat route tests later
- [ ] Add frontend tests later if helpful

---

## Deployment

- [ ] Choose backend host
- [ ] Choose frontend host
- [ ] Configure production environment variables
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Confirm production DB connection works
- [ ] Confirm auth works in production
- [ ] Confirm protected routes work in production
- [ ] Confirm frontend ↔ backend communication works in production
- [ ] Add deployment instructions to docs

---

## Demo / Portfolio Prep

- [ ] Clean up repository structure
- [ ] Remove temporary debug code
- [ ] Polish README screenshots / descriptions
- [ ] Prepare demo flow
- [ ] Prepare sample user account or sample content
- [ ] Prepare project summary for portfolio
- [ ] Prepare resume bullets
- [ ] Prepare interview talking points
- [ ] Prepare explanation of architecture and tradeoffs

---

## Stretch Features

- [ ] Improve AI summaries
- [ ] Improve tag quality
- [ ] Hybrid keyword + semantic search
- [ ] Better embedding retrieval strategy
- [ ] Chunk-based retrieval
- [ ] Related items suggestions
- [ ] Topic clustering
- [ ] Chat history
- [ ] Better source citation display
- [ ] Collections / folders
- [ ] Bookmark import
- [ ] Activity history
- [ ] Shared collections / collaboration
- [ ] Voice capture ideas
- [ ] Weekly digest ideas

---

## Always Keep In Mind

- [ ] Protect user ownership boundaries
- [ ] Build in small stable layers
- [ ] Prefer clear architecture over clever architecture
- [ ] Keep the main workflow intact:
  - [ ] authenticate user
  - [ ] save item
  - [ ] retrieve item
  - [ ] enrich item
  - [ ] search item
  - [ ] ask grounded questions over item

---

## Immediate Next Task

- [ ] Build `GET /api/items/:id`
