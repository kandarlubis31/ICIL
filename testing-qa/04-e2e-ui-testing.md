# 🧪 04 — E2E & UI Testing

> 🟡 Intermediate | Prereq: 01 | ~9 min

E2E tests simulate real user behavior — clicking buttons, filling forms, navigating pages. Playwright dominates in 2026: faster, more reliable, better debugging than Cypress or Selenium.

---

## 4.1 Playwright Basics

```ts
import { test, expect } from '@playwright/test';

test.describe('Checkout flow', () => {
  test('user can add item to cart and checkout', async ({ page }) => {
    await page.goto('/products');
    
    // Add to cart
    await page.click('[data-testid="add-to-cart"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    
    // Checkout
    await page.click('[data-testid="cart-icon"]');
    await page.click('[data-testid="checkout-button"]');
    
    // Fill payment form
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/28');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.click('[data-testid="pay-button"]');
    
    // Verify success
    await expect(page.locator('[data-testid="order-confirmed"]')).toBeVisible();
    await expect(page).toHaveURL(/\/orders\/ord_/);
  });
});
```

## 4.2 Test Selectors — Use data-testid

```
PRIORITY (best → worst):
  data-testid="submit"     ← BEST: stable, intentional
  getByRole('button')       ← Good: accessible
  getByText('Submit')       ← Okay: breaks on copy changes
  .btn-primary              ← Fragile: breaks on CSS changes
  #submit                   ← Worst: breaks on everything
```

## 4.3 Visual Regression Testing

```ts
test('homepage matches screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixels: 100  // tolerance
  });
});

// Update screenshots when UI intentionally changes:
// npx playwright test --update-snapshots
```

## 4.4 E2E Best Practices

| Rule | Why |
|------|-----|
| Independently runnable | Test B doesn't need Test A's state |
| Real API or mocked | Don't test against production |
| Authenticated setup | Use storage state for login, not login flow each time |
| Retry on CI | `retries: 2` for flaky network issues |
| Limit to critical paths | E2E is slow; don't test every edge case |

## 4.5 Anti-Patterns

- **E2E-only testing** — ice cream cone; E2E is slow, flaky, hard to debug
- **Testing 3rd-party UIs** — don't test Stripe/GitHub login pages; mock them
- **No parallelization** — Playwright runs in parallel by default; use it

## 4.6 ICIL Cross-Ref

Use with: `testing-qa/02` (component testing), `devops-infra/03` (CI/CD)

## ⚡ Action Checklist
- [ ] Use `data-testid` attributes — stable, intentional, framework-agnostic
- [ ] Critical user journeys covered (signup, purchase, search)
- [ ] Visual regression on key pages (home, pricing, dashboard)
- [ ] E2E tests run in CI; 2 retries for flaky tests
- [ ] Login state cached via `storageState` — don't re-login every test
