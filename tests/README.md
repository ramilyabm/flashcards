# E2E Test Suite for English-Russian Flashcards App

This directory contains comprehensive end-to-end tests using [Playwright](https://playwright.dev/) to verify the functionality of the flashcards application.

## Test Structure

### 🏠 `home.spec.ts`
Tests the main home page functionality:
- Home page displays correctly with title and navigation buttons
- Navigation to Study Mode, Quiz Mode, and Stats Page
- Back button functionality from placeholder pages
- Basic UI elements and accessibility

### 📚 `study-mode.spec.ts`
Comprehensive tests for the core Study Mode functionality:
- **Category Selection**: Deck listing and selection
- **Flashcard Interaction**: Card flipping from Russian to English
- **Response System**: Right/Wrong button functionality
- **Progress Tracking**: Sequential progression through cards
- **Session Completion**: Statistics display and accuracy calculation
- **Navigation**: Back buttons and deck switching
- **Multiple Decks**: Testing Animals, Food, and Verbs decks

### 📱 `responsive.spec.ts`
Tests responsive design and accessibility:
- **Mobile Compatibility**: iPhone and tablet viewport testing
- **Cross-Device Functionality**: Consistent behavior across screen sizes
- **Accessibility**: Keyboard navigation, button roles, heading structure
- **Responsive Layout**: Proper element sizing and interaction

## Test Coverage

### ✅ Functionality Tested
- ✅ Home page navigation
- ✅ Category/deck selection
- ✅ Flashcard flip animations
- ✅ Russian → English translation display
- ✅ Right/Wrong response tracking
- ✅ Progress bar and card counter
- ✅ Session completion with statistics
- ✅ Navigation between decks and modes
- ✅ Mobile and tablet responsiveness
- ✅ Keyboard accessibility
- ✅ Button roles and ARIA labels

### 📊 Test Statistics
- **Total Tests**: 24
- **Test Files**: 3
- **Browser Coverage**: Chromium (Desktop)
- **Viewport Coverage**: Desktop, Mobile, Tablet

## Running Tests

### Prerequisites
```bash
npm install
```

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests with UI
```bash
npm run test:e2e:ui
```

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```

### Run Specific Test File
```bash
npx playwright test tests/study-mode.spec.ts
```

### Run Tests with Verbose Output
```bash
npx playwright test --reporter=list
```

## Test Configuration

Tests are configured in `playwright.config.ts`:
- **Base URL**: http://localhost:5173
- **Auto-start Dev Server**: Tests automatically start the Vite dev server
- **Browser**: Chromium (can be extended to Firefox/Safari)
- **Retries**: 2 on CI, 0 locally
- **Trace**: Captured on first retry for debugging

## Test Patterns and Best Practices

### Selector Strategy
- **Role-based selectors**: `page.getByRole('button', { name: 'Study Mode' })`
- **Filtered selectors**: `page.getByRole('button').filter({ hasText: 'Animals' })`
- **CSS class selectors**: `page.locator('.text-4xl').filter({ hasText: 'cat' })`
- **Specific targeting**: Avoiding ambiguous text selectors

### Test Organization
- **Describe blocks**: Grouped by page/feature
- **BeforeEach hooks**: Common navigation setup
- **Clear assertions**: Specific, readable expectations
- **Progressive testing**: Building from simple to complex scenarios

### Error Handling
- **Strict mode**: Prevents ambiguous element selection
- **Timeout handling**: Appropriate waits for async operations
- **Debug traces**: Available for failed test investigation

## Continuous Integration

Tests are designed to run in CI environments:
- Headless browser execution
- Retry logic for flaky tests
- Screenshot/video capture on failures
- Detailed reporting with HTML output

## Future Enhancements

Potential test expansions:
- **Quiz Mode tests** (when implemented in Phase 5)
- **Statistics Page tests** (when implemented in Phase 6)
- **localStorage persistence tests**
- **Multi-browser testing** (Firefox, Safari)
- **Performance testing**
- **Visual regression testing** 