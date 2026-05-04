# Testing Guide

## Overview
This project uses Jest and React Testing Library for testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are located in `app/__tests__/` directory:

- `utils.test.ts` - Tests for utility functions
- `TopNav.test.tsx` - Tests for TopNav component
- `LeftSidebar.test.tsx` - Tests for LeftSidebar component
- `RightSidebar.test.tsx` - Tests for RightSidebar component
- `MatchRow.test.tsx` - Tests for MatchRow component
- `betSlipStore.test.ts` - Tests for Zustand store

## What's Tested

### Components
- **TopNav**: Navigation tabs, active states, click handlers
- **LeftSidebar**: Search, quick actions, game cards, leagues, drawer behavior
- **RightSidebar**: Betslip display, stake input, odds calculation, tab switching
- **MatchRow**: Team display, odds rendering, selection handling

### Store
- **betSlipStore**: Add/remove selections, stake management, clear functionality

### Utils
- **formatMatchTime**: Date formatting
- **calcReturn**: Return calculation
- **calcAccaOdd**: Accumulator odds calculation
- **competitionBadge**: Competition name formatting
- **competitionColor**: Competition color mapping
- **oddDirection**: Odd movement detection

## Coverage Goals
- Aim for >80% code coverage
- Focus on critical user flows
- Test edge cases and error states
