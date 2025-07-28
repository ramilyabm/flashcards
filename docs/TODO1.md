# ✅ English-Russian Flashcards App — TODO List

---

## 🟢 Phase 1: Project Setup & Home Navigation

* [x] **Initialize Vite + React + TypeScript project**
  ✅ *Acceptance:* App runs on `npm run dev` with a basic React + TS setup.

* [x] **Set up folder structure** (`/components`, `/data`, `/pages`)
  ✅ *Acceptance:* Clean folder layout for components, data files, and pages.

* [x] **Set up TailwindCSS for styling**
  ✅ *Acceptance:* Tailwind classes render correctly in sample components.

* [x] **Create static card data file (initial decks)**
  ✅ *Acceptance:* TS/JSON file contains sample cards grouped by category (e.g., Animals, Food, Verbs) with `english`, `russian`, and `deck`.

* [x] **Create Home Page with navigation buttons**

  * [x] Study Mode
  * [x] Quiz Mode
  * [x] Stats Page
    ✅ *Acceptance:* Buttons visibly route to the correct pages/components.

---

## 🟢 Phase 2: Study Mode & Flashcard System

* [x] **Create Category Selection Page for Study Mode**
  ✅ *Acceptance:* Lists available decks from data; user can select a deck.

* [x] **Build Flashcard component**

  * [x] Show Russian side by default
  * [x] Flip to English side
    ✅ *Acceptance:* Card flips on click/tap, front shows Russian, back shows English.

* [ ] **Display “✅ Right” and “❌ Wrong” buttons after flip**
  ✅ *Acceptance:* Buttons appear only after flip and record user input.

* [x] **Track incorrect cards in state**
  ✅ *Acceptance:* Cards marked wrong are stored in session state for redo.

* [x] **Allow progressing through flashcards one by one**
  ✅ *Acceptance:* User can study the full deck sequentially.

* [ ] **Persist session responses in `localStorage`**
  ✅ *Acceptance:* Refreshing the browser retains correct/incorrect state.

---

## 🟡 Phase 3: Deck Management & User Cards

* [ ] **Build Deck Management UI**

  * [ ] View all decks
  * [ ] Create new deck
  * [ ] Rename or delete existing decks
    ✅ *Acceptance:* Users can fully manage their decks.

* [ ] **Implement Card Management per deck**

  * [ ] Add new card
  * [ ] Edit card
  * [ ] Delete card
    ✅ *Acceptance:* Users can CRUD cards and changes persist in `localStorage`.

---

## 🟡 Phase 4: Redo Mode

* [ ] **Show “Redo Wrong Cards” button after study session ends**
  ✅ *Acceptance:* Button appears only if there are incorrect cards.

* [ ] **Redo session displays only incorrect cards**
  ✅ *Acceptance:* Flashcard view reuses component but filters for missed cards.

* [ ] **Add “Reset Wrong Cards” option**
  ✅ *Acceptance:* Button clears wrong-card memory from session or storage.

---

## 🟡 Phase 5: Quiz Modes

### 🧪 Multiple Choice Quiz

* [ ] **Create Quiz Mode category selection page**
  ✅ *Acceptance:* Lets user pick a deck and quiz type.

* [ ] **Multiple Choice Quiz**

  * [ ] Show Russian word as prompt
  * [ ] Display 4 English options (1 correct, 3 distractors from deck)
  * [ ] Immediate feedback: correct/incorrect
    ✅ *Acceptance:* Quiz runs smoothly with valid distractors and UI feedback.

### ✍️ Fill-in-the-Blank Quiz

* [ ] **Display Russian word prompt**

  * [ ] Text input for English translation
  * [ ] Case-insensitive, trimmed input check
  * [ ] Feedback on correctness
    ✅ *Acceptance:* Valid answers marked correct regardless of case/spacing.

* [ ] **Track quiz performance and store in `localStorage`**
  ✅ *Acceptance:* Quiz results persist and are used for statistics.

---

## 🔴 Phase 6: Statistics Page

* [ ] **Create Statistics Dashboard**
  ✅ *Acceptance:* User can view session and historical data.

* [ ] **Show total cards studied, correct vs. incorrect**
  ✅ *Acceptance:* Shows raw numbers and accuracy percentage.

* [ ] **Breakdown by deck**
  ✅ *Acceptance:* Stats grouped by category (e.g., Verbs: 70% correct).

* [ ] **Include stats from both Study and Quiz sessions**
  ✅ *Acceptance:* Dashboard reflects all types of practice sessions.

* [ ] **Add “Reset All Stats” button**
  ✅ *Acceptance:* Clears all progress data from `localStorage`.

---
Great idea! Here's how we can integrate **vocabulary-level tests** into your TODO list. This helps users assess their English level — e.g., Beginner, Elementary, Pre-Intermediate, Intermediate — and get recommended decks accordingly.

---

## 🟠 Phase 7: Vocabulary Level Placement Test

* [ ] **Create Level Test Decks**
  ✅ *Acceptance:* Decks for each level (Beginner, Elementary, etc.) contain 10–20 curated cards.

* [ ] **Build “Take Placement Test” feature (on Home Page or first use)**
  ✅ *Acceptance:* Button routes to level test selection and instructions.

* [ ] **Implement Level Test UI (like Quiz Mode)**

  * [ ] Multiple choice format
  * [ ] Show 10–15 words of increasing difficulty
    ✅ *Acceptance:* User answers a series of vocab questions without knowing the level of the word.

* [ ] **Calculate and show user’s vocabulary level**
  ✅ *Acceptance:* Based on % correct per level group, assign one of:

  * Beginner
  * Elementary
  * Pre-Intermediate
  * Intermediate
  * Upper-Intermediate

* [ ] **Store level in LocalStorage and show on Home Page**
  ✅ *Acceptance:* App remembers user’s level and shows it visibly (e.g., "Your current level: Elementary").

* [ ] **Recommend decks based on level**
  ✅ *Acceptance:* After level test, suggest appropriate decks first (e.g., Food or Basic Verbs for Beginner).

* [ ] **Allow user to retake test anytime**
  ✅ *Acceptance:* Retest resets previous level and recalculates based on new answers.

---


## 🟣 Bonus Phase: UX Enhancements

* [ ] **Add flip animation to flashcards**
  ✅ *Acceptance:* Card visually flips with smooth animation.

* [ ] **Make layout responsive for mobile**
  ✅ *Acceptance:* Flashcards and all views scale on mobile devices.

* [ ] **Dark mode toggle**
  ✅ *Acceptance:* Switch to dark mode updates styling instantly.

* [ ] **Export/Import decks as JSON**
  ✅ *Acceptance:* Users can download and upload their own deck files.
