import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should work correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size

    await page.goto('/');

    // Check if home page elements are properly sized on mobile
    await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');
    
    // Check if buttons are properly sized and clickable on mobile
    const studyButton = page.getByRole('button', { name: '📚 Study Mode' });
    await expect(studyButton).toBeVisible();
    
    // Navigate to study mode
    await studyButton.click();
    
    // Check category selection on mobile
    await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
    
    // Select a deck on mobile
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();
    
    // Check flashcard display on mobile
    await expect(page.getByText('Card 1 of 5')).toBeVisible();
    await expect(page.getByText('кот')).toBeVisible();
    
    // Test flip functionality on mobile
    await page.locator('.cursor-pointer').first().click();
    await expect(page.locator('.text-4xl').filter({ hasText: 'cat' })).toBeVisible();
    
    // Test action buttons on mobile
    await expect(page.getByRole('button', { name: '✅ Right' })).toBeVisible();
    await expect(page.getByRole('button', { name: '❌ Wrong' })).toBeVisible();
  });

  test('should work correctly on tablet devices', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size

    await page.goto('/');

    // Navigate through the app on tablet
    await page.getByRole('button', { name: '📚 Study Mode' }).click();
    await page.getByRole('button').filter({ hasText: 'Food' }).click();

    // Check flashcard layout on tablet
    await expect(page.getByText('Card 1 of 5')).toBeVisible();
    await expect(page.getByText('яблоко')).toBeVisible();

    // Test interactions on tablet
    await page.locator('.cursor-pointer').first().click();
    await expect(page.locator('.text-4xl').filter({ hasText: 'apple' })).toBeVisible();
    
    await page.getByRole('button', { name: '✅ Right' }).click();
    await expect(page.getByText('Card 2 of 5')).toBeVisible();
  });

  test('should maintain functionality across different screen sizes', async ({ page }) => {
    // Test various screen sizes
    const screenSizes = [
      { width: 320, height: 568 }, // iPhone 5/SE
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad landscape
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const size of screenSizes) {
      await page.setViewportSize(size);
      await page.goto('/');

      // Test basic navigation works at all sizes
      await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');
      await expect(page.getByRole('button', { name: '📚 Study Mode' })).toBeVisible();
      
      // Quick navigation test
      await page.getByRole('button', { name: '📚 Study Mode' }).click();
      await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
      
      // Go back to home for next iteration
      await page.getByRole('button', { name: '← Back to Home' }).click();
    }
  });
});

test.describe('Accessibility', () => {
  test('should have proper button roles and labels', async ({ page }) => {
    await page.goto('/');

    // Check if buttons have proper accessibility attributes
    const studyButton = page.getByRole('button', { name: '📚 Study Mode' });
    const quizButton = page.getByRole('button', { name: '🧩 Quiz Mode' });
    const statsButton = page.getByRole('button', { name: '📊 Stats Page' });

    await expect(studyButton).toBeVisible();
    await expect(quizButton).toBeVisible();
    await expect(statsButton).toBeVisible();

    // Test keyboard navigation
    await studyButton.focus();
    await expect(studyButton).toBeFocused();
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toContainText('🎓 English Flashcards ✨');

    // Navigate to study mode and check heading structure
    await page.getByRole('button', { name: '📚 Study Mode' }).click();
    
    const categoryHeading = page.locator('h1');
    await expect(categoryHeading).toContainText('📚 Choose a Deck');

    // Select deck and check study interface headings
    await page.getByRole('button').filter({ hasText: 'Animals' }).click();
    
    const studyHeading = page.locator('h1');
    await expect(studyHeading).toContainText('📚 Animals');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '📚 Study Mode' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '🧩 Quiz Mode' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '📊 Stats Page' })).toBeFocused();

    // Test Enter key activation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Go back to Study Mode
    await page.keyboard.press('Enter');

    // Should navigate to study mode
    await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
  });
}); 