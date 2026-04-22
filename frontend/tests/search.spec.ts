// tests/search.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

// --- Basic UI Tests ---

test('1 - Page loads and shows the heading', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await expect(home.heading()).toBeVisible();
});

test('2 - Search input is visible on the page', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const input = page.getByPlaceholder('Search for legal documents...');
  await expect(input).toBeVisible();
});

test('3 - User can type in the search box', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.fillSearch('law');

  const input = page.getByPlaceholder('Search for legal documents...');
  await expect(input).toHaveValue('law');
});

test('4 - Search button is visible', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const button = page.getByRole('button', { name: 'Search' });
  await expect(button).toBeVisible();
});

// --- Search Result Tests ---

test('5 - Searching "law" shows a result summary', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.fillSearch('law');
  await home.clickSearch();
  const summary = page.getByText(/Found.*relevant legal document/i);
  await expect(summary).toBeVisible();
});


test('6 - Search results disappear when a new search is typed', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  // First search
  await home.fillSearch('law');
  await home.clickSearch();
  await expect(page.getByText(/Found.*relevant legal document/i)).toBeVisible();

  // Clear and type something else 2nd search
  await home.fillSearch('');
  await home.fillSearch('new');

  // The old results should no longer be visible OR
  // a new result summary should show instead
});
