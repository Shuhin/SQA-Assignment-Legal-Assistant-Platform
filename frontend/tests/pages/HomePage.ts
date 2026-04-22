// tests/pages/HomePage.ts
import { Page } from '@playwright/test';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillSearch(text: string) {
    const input = this.page.getByPlaceholder('Search for legal documents...');
    await input.clear();          // clear first before typing
    await input.fill(text);
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  heading() {
    return this.page.getByRole('heading', { name: 'Legal Assistant' });
  }
}