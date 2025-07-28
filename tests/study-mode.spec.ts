import { test, expect } from '@playwright/test';

test.describe('Study Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to Study Mode
    await page.getByRole('button', { name: '📚 Study Mode' }).click();
  });

  test('should display category selection page correctly', async ({ page }) => {
    // Check if category selection page is displayed
    await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
    await expect(page.getByText('Select a category to start studying')).toBeVisible();

    // Check if all deck options are present
    await expect(page.getByRole('button').filter({ hasText: 'Animals' })).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'Food' })).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'Verbs' })).toBeVisible();

    // Check if deck descriptions are visible
    await expect(page.getByText('Common animals and pets')).toBeVisible();
    await expect(page.getByText('Food and drinks')).toBeVisible();
    await expect(page.getByText('Common action verbs')).toBeVisible();

    // Check if back button is present
    await expect(page.getByRole('button', { name: '← Back to Home' })).toBeVisible();
  });

  test('should navigate back to home from category selection', async ({ page }) => {
    // Click back to home button
    await page.getByRole('button', { name: '← Back to Home' }).click();

    // Should be back on home page
    await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');
  });

  test('should start study session when deck is selected', async ({ page }) => {
    // Click on Animals deck
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Should navigate to flashcard study interface
    await expect(page.locator('h1')).toContainText('📚 Animals');
    await expect(page.getByText('Card 1 of 5')).toBeVisible();

    // Should show progress bar
    await expect(page.locator('.bg-blue-600.h-2')).toBeVisible();

    // Should show the first flashcard with Russian text
    await expect(page.getByText('кот')).toBeVisible();
    await expect(page.getByText('Русский')).toBeVisible();
    await expect(page.getByText('Click to flip')).toBeVisible();

    // Should not show action buttons initially
    await expect(page.getByRole('button', { name: '✅ Right' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: '❌ Wrong' })).not.toBeVisible();
  });

  test('should flip flashcard when clicked', async ({ page }) => {
    // Select Animals deck and start studying
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Click on the flashcard to flip it
    await page.locator('.cursor-pointer').first().click();

    // Should now show English translation
    await expect(page.locator('.text-4xl').filter({ hasText: 'cat' })).toBeVisible();
    await expect(page.getByText('English')).toBeVisible();

    // Should show example sentence
    await expect(page.getByText('The cat is sleeping on the sofa.')).toBeVisible();

    // Should now show action buttons
    await expect(page.getByRole('button', { name: '✅ Right' })).toBeVisible();
    await expect(page.getByRole('button', { name: '❌ Wrong' })).toBeVisible();

    // Should not show "Click to flip" instruction
    await expect(page.getByText('Click to flip')).not.toBeVisible();
  });

  test('should progress to next card when marking as correct', async ({ page }) => {
    // Select Animals deck and start studying
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Flip the first card
    await page.locator('.cursor-pointer').first().click();

    // Mark as correct
    await page.getByRole('button', { name: '✅ Right' }).click();

    // Should progress to card 2
    await expect(page.getByText('Card 2 of 5')).toBeVisible();

    // Should show the second card (dog/собака)
    await expect(page.getByText('собака')).toBeVisible();
    await expect(page.getByText('Русский')).toBeVisible();

    // Progress bar should update (2/5 = 40%)
    const progressBar = page.locator('.bg-blue-600.h-2');
    const progressBarWidth = await progressBar.evaluate(el => el.style.width);
    expect(progressBarWidth).toBe('40%');
  });

  test('should progress to next card when marking as incorrect', async ({ page }) => {
    // Select Animals deck and start studying
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Flip the first card
    await page.locator('.cursor-pointer').first().click();

    // Mark as incorrect
    await page.getByRole('button', { name: '❌ Wrong' }).click();

    // Should progress to card 2
    await expect(page.getByText('Card 2 of 5')).toBeVisible();
    await expect(page.getByText('собака')).toBeVisible();
  });

  test('should complete study session and show statistics', async ({ page }) => {
    // Select Animals deck
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Go through all 5 cards (mark some correct, some incorrect)
    const responses = [true, false, true, true, false]; // 3 correct, 2 incorrect

    for (let i = 0; i < 5; i++) {
      // Flip the card
      await page.locator('.cursor-pointer').first().click();

      // Mark response
      if (responses[i]) {
        await page.getByRole('button', { name: '✅ Right' }).click();
      } else {
        await page.getByRole('button', { name: '❌ Wrong' }).click();
      }
    }

    // Should show completion screen
    await expect(page.locator('h1')).toContainText('🎉 Deck Complete!');
    await expect(page.locator('h2')).toContainText('Animals');

    // Should show accuracy (3/5 = 60%)
    await expect(page.getByText('60% Accuracy')).toBeVisible();

    // Should show statistics breakdown
    await expect(page.getByText('✅ Correct:')).toBeVisible();
    await expect(page.getByText('3', { exact: true })).toBeVisible();
    await expect(page.getByText('❌ Incorrect:')).toBeVisible();
    await expect(page.getByText('2', { exact: true })).toBeVisible();
    await expect(page.getByText('📊 Total:')).toBeVisible();
    await expect(page.getByText('5', { exact: true })).toBeVisible();

    // Should show action buttons
    await expect(page.getByRole('button', { name: '🔄 Study Again' })).toBeVisible();
    await expect(page.getByRole('button', { name: '📚 Choose Another Deck' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🏠 Back to Home' })).toBeVisible();
  });

  test('should restart study session when "Study Again" is clicked', async ({ page }) => {
    // Complete a study session first
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Go through all cards quickly
    for (let i = 0; i < 5; i++) {
      await page.locator('.cursor-pointer').first().click();
      await page.getByRole('button', { name: '✅ Right' }).click();
    }

    // Should be on completion screen
    await expect(page.locator('h1')).toContainText('🎉 Deck Complete!');

    // Click "Study Again"
    await page.getByRole('button', { name: '🔄 Study Again' }).click();

    // Should restart the session
    await expect(page.getByText('Card 1 of 5')).toBeVisible();
    await expect(page.getByText('кот')).toBeVisible();
  });

  test('should navigate back to deck selection when "Choose Another Deck" is clicked', async ({ page }) => {
    // Complete a study session first
    await page.getByRole('button').filter({ hasText: 'Food' }).click();

    // Go through all cards quickly
    for (let i = 0; i < 5; i++) {
      await page.locator('.cursor-pointer').first().click();
      await page.getByRole('button', { name: '✅ Right' }).click();
    }

    // Click "Choose Another Deck"
    await page.getByRole('button', { name: '📚 Choose Another Deck' }).click();

    // Should be back on category selection
    await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
    await expect(page.getByRole('button').filter({ hasText: 'Animals' })).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'Food' })).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'Verbs' })).toBeVisible();
  });

  test('should navigate back to home from completion screen', async ({ page }) => {
    // Complete a study session first
    await page.getByRole('button').filter({ hasText: 'Verbs' }).click();

    // Go through all cards quickly
    for (let i = 0; i < 5; i++) {
      await page.locator('.cursor-pointer').first().click();
      await page.getByRole('button', { name: '✅ Right' }).click();
    }

    // Click "Back to Home"
    await page.getByRole('button', { name: '🏠 Back to Home' }).click();

    // Should be back on home page
    await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');
  });

  test('should navigate back to categories from study session', async ({ page }) => {
    // Select a deck and start studying
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();

    // Should be in study mode
    await expect(page.getByText('Card 1 of 5')).toBeVisible();

    // Click back to categories button
    await page.getByRole('button', { name: '← Back to Categories' }).click();

    // Should be back on category selection
    await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
  });

  test('should work with different decks (Food)', async ({ page }) => {
    // Select Food deck
    await page.getByRole('button').filter({ hasText: 'Food' }).click();

    // Should start with food vocabulary
    await expect(page.locator('h1')).toContainText('📚 Food');
    await expect(page.getByText('Card 1 of 5')).toBeVisible();

    // Should show a Russian food word (яблоко)
    await expect(page.getByText('яблоко')).toBeVisible();

    // Flip the card
    await page.locator('.cursor-pointer').first().click();

    // Should show English translation (apple)
    await expect(page.locator('.text-4xl').filter({ hasText: 'apple' })).toBeVisible();
    await expect(page.getByText('I eat an apple every morning.')).toBeVisible();
  });

  test('should work with different decks (Verbs)', async ({ page }) => {
    // Select Verbs deck
    await page.getByRole('button').filter({ hasText: 'Verbs' }).click();

    // Should start with verb vocabulary
    await expect(page.locator('h1')).toContainText('📚 Verbs');
    await expect(page.getByText('Card 1 of 5')).toBeVisible();

    // Should show a Russian verb (бегать)
    await expect(page.getByText('бегать')).toBeVisible();

    // Flip the card
    await page.locator('.cursor-pointer').first().click();

    // Should show English translation (run)
    await expect(page.locator('.text-4xl').filter({ hasText: 'run' })).toBeVisible();
    await expect(page.getByText('I run every morning for exercise.')).toBeVisible();
  });
}); 