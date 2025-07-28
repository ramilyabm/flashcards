import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the main title is visible
    await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');
    
    // Check if the subtitle is visible
    await expect(page.getByText('Learn English vocabulary with Russian translations')).toBeVisible();

    // Check if all navigation buttons are present
    await expect(page.getByRole('button', { name: '📚 Study Mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🧩 Quiz Mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: '📊 Stats Page' })).toBeVisible();
  });

  test('should navigate to Study Mode when Study Mode button is clicked', async ({ page }) => {
    await page.goto('/');

    // Click the Study Mode button
    await page.getByRole('button', { name: '📚 Study Mode' }).click();

    // Should navigate to category selection
    await expect(page.locator('h1')).toContainText('📚 Choose a Deck');
    await expect(page.getByText('Select a category to start studying')).toBeVisible();
  });

  test('should show placeholder for Quiz Mode', async ({ page }) => {
    await page.goto('/');

    // Click the Quiz Mode button
    await page.getByRole('button', { name: '🧩 Quiz Mode' }).click();

    // Should show placeholder page
    await expect(page.locator('h1')).toContainText('Quiz Mode');
    await expect(page.getByText('This feature will be implemented in Phase 5')).toBeVisible();
  });

  test('should show placeholder for Stats Page', async ({ page }) => {
    await page.goto('/');

    // Click the Stats Page button
    await page.getByRole('button', { name: '📊 Stats Page' }).click();

    // Should show placeholder page
    await expect(page.locator('h1')).toContainText('Statistics');
    await expect(page.getByText('This feature will be implemented in Phase 6')).toBeVisible();
  });

  test('should have working back buttons from placeholder pages', async ({ page }) => {
    await page.goto('/');

    // Test Quiz Mode back button
    await page.getByRole('button', { name: '🧩 Quiz Mode' }).click();
    await page.getByRole('button', { name: '← Back to Home' }).click();
    await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');

    // Test Stats Page back button
    await page.getByRole('button', { name: '📊 Stats Page' }).click();
    await page.getByRole('button', { name: '← Back to Home' }).click();
    await expect(page.locator('h1')).toContainText('🎓 English Flashcards ✨');
  });
}); 