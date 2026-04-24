# Second Brain Architecture

## Purpose

This document describes the structural design of the project and the
architectural rules that should remain stable as the codebase evolves.

It is not intended to track implementation status, route inventories, test
coverage, or short-term task progress. Those belong in project planning and
roadmap documents.

## System Boundaries

The repository is organized around three product surfaces:

- `server` - backend API, authentication, retrieval orchestration, and
  persistence
- `client` - user-facing application surface
- `extension` - browser-based content capture surface

These surfaces should remain loosely coupled and communicate through explicit
interfaces rather than shared implementation details.

## Backend Architecture

The backend is organized around this flow:

`routes -> middleware -> controllers -> services -> persistence`

### Routes

Routes define endpoint paths and attach middleware chains. They should stay thin
and avoid business logic.

### Middleware

Middleware handles cross-cutting concerns such as authentication, not-found
handling, and error propagation.

### Controllers

Controllers translate HTTP requests into application actions. They are
responsible for request validation, user-context assumptions, and coordinating
service calls.

### Services

Services contain business logic that should not depend on Express-specific
request or response objects. This includes enrichment, retrieval, and other
reusable application behavior.

### Persistence

Prisma is the persistence boundary for relational data access. Database access
should remain explicit and localized rather than being spread across unrelated
modules.

## Authentication Model

Protected routes use JWT bearer authentication.

Authentication middleware is responsible for:

- verifying the token
- attaching authenticated user context to the request
- rejecting malformed or unauthorized requests

User-owned resources should always be queried and mutated within the scope of
the authenticated user.

## Error Handling Model

The API should prefer centralized error handling over ad hoc response logic in
unrelated modules.

Errors that represent expected request failures should be converted into
application-level errors and passed through the global error-handling path.

## Data Model Concepts

The core domain is organized around these entities:

- `User` - account owner
- `SavedItem` - a captured piece of content owned by a user
- `Tag` - a user-scoped label
- `SavedItemTag` - join model between items and tags
- `Embedding` - vector representation associated with a saved item

The model supports user-scoped ownership, normalized tagging, and
retrieval-oriented enrichment.

## Retrieval Architecture

The retrieval layer is designed around enrichment and semantic matching.

Saved content may be enriched with:

- summaries
- tags
- embeddings

Semantic retrieval is designed around comparing a query representation against
stored item embeddings and returning ranked results.

Provider-specific AI integrations should remain behind service boundaries so the
rest of the application is not tightly coupled to a single model vendor.

## Architectural Guidelines

- Keep HTTP concerns in routes and controllers.
- Keep reusable business logic in services.
- Keep persistence concerns explicit and localized.
- Prefer user-scoped queries over post-query filtering.
- Preserve clear module boundaries over convenience-driven coupling.
- Do not place source code in generated directories.
- Do not manually edit generated Prisma client output.

## Evolution Direction

The architecture should support future additions such as:

- richer enrichment pipelines
- asynchronous or background processing
- improved retrieval strategies
- grounded question answering over saved content
- fuller client and extension workflows

New features should extend the existing boundaries rather than collapse them.
