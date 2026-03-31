# Candy Crush Game

## Current State
Fresh project. Only scaffolded backend (empty actor) and UI component library files exist.

## Requested Changes (Diff)

### Add
- Match-3 game engine: 8x8 grid of colored candies (6 types: red, blue, green, yellow, purple, orange)
- Swap mechanic: tap/click adjacent candies to swap; valid only if it creates a match of 3+
- Match detection: horizontal and vertical matches of 3, 4, or 5
- Cascade: after clearing matches, candies fall down and new ones fill from top; re-check for chain matches
- Score system: +30 per candy cleared, bonus for 4-match (+60) and 5-match (+100), chain bonuses
- Level system: each level has a target score; completing it advances to next level
- Moves counter: limited moves per level (e.g. 20)
- Lives system: lose a life when moves run out without meeting target
- High score persistence via backend canister
- Animated candy swap, match explosion, and fall effects
- Mobile-first responsive design (portrait orientation)
- Colorful, playful UI matching the design preview

### Modify
- Replace all existing Music Maker frontend pages and components with game UI

### Remove
- All Music Maker code (TrackCard, AudioPlayer, UploadTrackDialog, etc.)

## Implementation Plan
1. Backend: store player high scores, level progress per user (optional login via Internet Identity)
2. Frontend: full match-3 game engine in React with canvas or CSS grid
3. Game board component with candy rendering, swap animation, match/explosion animation
4. HUD: score, level, moves remaining, target score
5. Level complete / game over modals
6. Home screen with play button and leaderboard
7. Mobile-optimized touch events (tap to select, tap adjacent to swap)
