# Candy Crush Mobile Game

## Current State
Empty project — building from scratch.

## Requested Changes (Diff)

### Add
- Full match-3 candy game optimized for mobile (touch/swipe)
- 8x8 grid with 6 candy types rendered as colorful emoji/styled divs
- Swipe gesture support (touchstart/touchend) for candy swapping
- Tap-to-select-then-tap-to-swap fallback
- Score tracking, move counter, level progression
- Cascade chain matching with score multipliers
- 5 lives system with local persistence
- High score saved to localStorage
- Special candies (striped, wrapped) on 4+ matches
- Mobile viewport meta, safe-area support, PWA-feel layout
- Smooth CSS animations for match, fall, and swap

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Create React game component with full match-3 logic
2. Implement swipe gesture detection with touch events
3. Add CSS animations for candy movements
4. Mobile-first layout: full-screen, no scroll, safe-area insets
5. Score/lives/level HUD at top
6. Level complete and game over modals
