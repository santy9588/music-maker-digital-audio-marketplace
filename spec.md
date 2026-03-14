# Music Maker - Digital Audio Marketplace

## Overview
Music Maker is a digital audio marketplace where creators can upload and sell audio tracks, and buyers can browse, preview, and purchase them. All user interactions requiring authentication use Internet Identity.

## User Roles

### Creators
- Register and login using Internet Identity
- Upload audio files (MP3, WAV format) - requires authentication
- Add track metadata: title, description, price, and genre
- View dashboard showing their uploaded tracks and sales

### Buyers
- Register and login using Internet Identity
- Browse all available tracks (no authentication required)
- Stream audio previews - requires authentication
- Purchase tracks - requires authentication
- View dashboard showing purchased tracks

### Unauthenticated Users
- Browse track listings
- View track details
- Cannot stream previews, upload tracks, or make purchases

## Core Features

### Authentication
- Internet Identity integration for secure login/logout
- Header dropdown showing login state and user options
- Authentication-gated actions for uploading, purchasing, and streaming
- Redirect to login when attempting restricted actions

### Track Management
- Audio file upload with blob storage (authenticated users only)
- Track metadata storage (title, description, price, genre)
- Audio streaming and playback in browser (authenticated users only)
- Track preview functionality (authenticated users only)

### Purchase System
- Stripe integration for secure payments (authenticated users only)
- Purchase history tracking
- Access control for purchased content

### User Interface
- Home page with track browsing and filtering
- Track details page with embedded audio player (authentication-aware)
- User dashboard for creators (upload management, sales overview)
- User dashboard for buyers (purchase history, owned tracks)
- Header with Internet Identity login/logout dropdown

## Backend Data Storage
- User profiles and Internet Identity authentication data
- Track metadata (title, description, price, genre, creator)
- Purchase records and transaction history
- Audio file references and blob storage management

## Backend Operations
- User registration and authentication via Internet Identity
- Authentication state verification for protected operations
- Audio file upload and storage management (authenticated users only)
- Track metadata CRUD operations
- Purchase processing and validation (authenticated users only)
- User dashboard data retrieval
- Track browsing and filtering
- Audio streaming access control (authenticated users only)
