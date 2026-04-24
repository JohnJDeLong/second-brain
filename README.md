# Second Brain

Second Brain is a full-stack TypeScript knowledge platform that enables users to capture, organize, and retrieve saved web content using semantic search and browser-extension ingestion workflows.

The system supports idea-based retrieval rather than keyword-only lookup through cosine-similarity ranking over stored content embeddings.

Built with React, Express, Prisma, PostgreSQL, and Vitest integration testing using a layered controller → service → middleware backend architecture.

---

## Features

- JWT-secured authentication pipeline
- Semantic search using cosine similarity ranking
- Relational tagging system with Prisma ORM
- Browser-extension ingestion workflow
- RESTful API architecture with controller/service layering
- Integration testing using Vitest
- User-scoped retrieval workflows

---

## System Architecture Overview

Second Brain follows a layered full-stack architecture:

User  
→ React frontend dashboard  
→ Express API (TypeScript service layer)  
→ Authentication middleware (JWT validation)  
→ Controller layer  
→ Service layer  
→ Prisma ORM  
→ PostgreSQL database

Optional enrichment pipeline:

Saved content  
→ embedding generation  
→ cosine similarity ranking  
→ semantic search retrieval

Browser capture flow:

User browsing  
→ extension capture interface  
→ authenticated API request  
→ persistence layer  
→ enrichment pipeline

---

## Backend Layer Responsibilities

Routes

Define API endpoints and attach middleware chains.

Controllers

Handle request validation and orchestrate service calls.

Services

Contain business logic such as:

- semantic search ranking
- tagging workflows
- saved-item lifecycle operations
- enrichment pipeline coordination

Middleware

Provide:

- authentication validation
- request shaping
- error handling
- authorization checks

Database Layer

Managed through Prisma ORM supporting:

- relational consistency
- normalized tagging schema
- migration tracking
- user-scoped persistence

---

## Retrieval Architecture

Semantic retrieval pipeline:

User query  
→ embedding generation  
→ similarity comparison against stored vectors  
→ cosine similarity scoring  
→ ranked results returned to client  

Supports idea-based search rather than keyword-only lookup.

Designed for future hybrid retrieval improvements:

- keyword + vector fusion
- chunk-based retrieval
- retrieval-augmented question answering (RAG)

---

## Extension Capture Architecture

Browser extension enables direct ingestion from web context:

Page interaction  
→ capture URL / selected text  
→ attach metadata + notes  
→ authenticated request to API  
→ persistence layer  
→ optional AI enrichment pipeline

This supports frictionless knowledge capture without leaving browsing workflow.

---

## Future Architecture Expansion

System is structured to support future additions without major refactors:

Planned extensions include:

- background job queue for enrichment processing
- Redis caching layer for retrieval acceleration
- hybrid semantic + keyword ranking
- chat-based retrieval interface
- multi-document synthesis workflows

---

## Stack

Frontend: React  
Backend: Express + TypeScript  
Database: PostgreSQL via Prisma ORM  
Auth: JWT middleware pipeline  
Search: vector embeddings + cosine similarity ranking  
Testing: Vitest integration testing  
Extension: browser capture interface  
Architecture: controller → service → middleware layering

---

## Example Feature Lifecycle: Semantic Search

POST /api/search/semantic

Pipeline:

validate request  
→ authenticate user  
→ generate query embedding  
→ compute similarity scores  
→ rank saved items  
→ return structured response  

Implements retrieval beyond keyword matching.

---

## Backend Architecture

Server structure follows production-style service layering:

routes/  
controllers/  
services/  
middleware/  
utils/  
types/  

Responsibilities are separated to support:

- maintainability
- integration testing
- modular feature ownership
- scalable service evolution

---


## API Routes

### Health Check

**GET /api/health**

Returns basic server status.

---

### Auth

**POST /api/auth/signup**

Creates a new user account.

**POST /api/auth/login**

Authenticates a user.

**GET /api/auth/me**

Returns the currently authenticated user.

Protected: yes

---

### Saved Items

**POST /api/items**

Creates a new saved item.

Protected: yes

**GET /api/items**

Returns all saved items for the authenticated user.

Protected: yes

**GET /api/items/:id**

Returns a single saved item by ID.

Protected: yes

**PATCH /api/items/:id**

Updates an existing saved item.

Protected: yes

**DELETE /api/items/:id**

Deletes an existing saved item.

Protected: yes

---

### Search

**POST /api/search/semantic**

Runs semantic search over the authenticated user’s saved items.

Protected: yes
---

## Database Model

Relational schema managed with Prisma migrations:

users  
saved_items  
tags  
saved_item_tags  

Supports normalized tagging workflows and user-scoped retrieval.

---

## Testing Strategy

Integration tests implemented using Vitest covering:

route validation  
controller behavior  
middleware authorization  
API response correctness  

Designed to support regression-safe iteration as the service evolves.

---

## Browser Extension Capture Layer

Includes extension-based ingestion workflow supporting:

URL capture  
selected text capture  
user notes  
metadata enrichment  

Allows direct knowledge capture from browsing context.

---

## Deployment Status

Planned production deployment:

Frontend: planned (Render)  
Backend API: planned (Render)  
Database: PostgreSQL  

Deployment will support authenticated ingestion, semantic retrieval, and AI enrichment workflows.

---

# Product Overview

## Overview

Second Brain is a full-stack application designed to help users capture, organize, and retrieve meaningful information from the web.

The long-term vision is to create a personal knowledge system that turns saved content into structured, searchable, and useful information instead of leaving it buried in browser tabs, bookmarks, notes apps, or disconnected documents.

At its core, the project aims to help users save content they care about, enrich it with AI-generated context, and make it easier to find and use later.

---

## Why This Project Exists

People save useful information online all the time, but most of it becomes difficult to revisit in a meaningful way.

Common problems include:

- too many open tabs
- disorganized bookmarks
- saved content spread across multiple tools
- difficulty remembering where something was saved
- difficulty searching old content by meaning instead of exact words
- useful research becoming effectively lost over time

Traditional bookmarking tools often store links, but they do not do much to help users understand, organize, or reuse what they saved.

Second Brain is meant to solve that problem by transforming saved content into a more structured personal knowledge base.

---

## Problems This Project Tries to Solve

### 1. Saved information becomes hard to find later
Users often remember *what* they learned, but not *where* they saved it.

### 2. Bookmarks do not capture understanding
A saved link alone does not explain why it mattered, what it was about, or how it connects to other saved material.

### 3. Search is often too literal
Keyword search only works if the user remembers the exact phrasing. Many users remember ideas, not exact words.

### 4. Research workflows are fragmented
Content may live in browser tabs, notes apps, docs, screenshots, or messages, making retrieval slow and frustrating.

### 5. Saved knowledge is underused
Even when users collect valuable resources, those resources are rarely transformed into something easy to revisit, explore, and learn from.

---

## Project Vision

The long-term goal of Second Brain is to become an AI-assisted personal knowledge retrieval system.

The project is intended to evolve from a simple content-saving workflow into a system that can:

- capture content from the web
- summarize and organize saved information
- support semantic retrieval
- answer questions over a user’s saved knowledge
- help users rediscover and connect ideas across what they have saved

This repository is being built with that broader direction in mind, even if some features are implemented incrementally over time.

---

## Current Direction

The current version of the project is focused on building a strong backend and product foundation for future iterations.

The main direction includes:

- user authentication
- persistent storage of saved content
- content metadata and structure
- AI-assisted summarization and tagging
- semantic search
- grounded question-answering over saved content
- a browser extension or capture layer for easy ingestion

---

## Core Product Idea

A user should be able to:

1. save content from the web
2. store that content in their personal workspace
3. enrich it with AI-generated summaries, tags, or metadata
4. search for it later by idea, not just exact keyword
5. ask questions over their saved content and get grounded answers

This creates a workflow where saved information becomes more usable over time instead of less usable.

---

## Guiding Principles

### Build for real retrieval
The goal is not only to store information, but to make it easier to retrieve and use later.

### Keep the system extensible
The architecture should support future AI and retrieval features without requiring a full rewrite.

### Start simple, expand thoughtfully
The project should be useful in its MVP form while leaving room for richer features later.

### Prefer clarity over novelty
Features should solve real user problems, not just showcase technology.

### Ground AI in user data
AI features should be focused on helping users understand and retrieve their own saved content, not producing generic unsupported responses.

---

## Intended Users

Second Brain may be useful for:

- developers saving documentation and technical resources
- students collecting study material
- researchers gathering sources
- job seekers saving interview prep material
- creators organizing research and inspiration
- anyone who wants a better system for saving and retrieving knowledge

---

## Current Status

This project is actively evolving.

Some features described here may already exist, some may be partially implemented, and some may still be planned. This README is meant to document the project’s direction and intent as much as its current functionality.

As the codebase grows, this document should be updated to reflect:

- what is currently implemented
- what is planned next
- what architectural decisions have changed
- what tradeoffs have been made

---

## Summary

Second Brain is a project focused on turning saved web content into structured, searchable, and reusable personal knowledge.

Its purpose is not just to store information, but to help users find, understand, and make use of what they have saved over time.

The project should continue evolving in ways that strengthen that mission.
