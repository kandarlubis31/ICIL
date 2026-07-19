# 🧪 02 — Unit & Component Testing

> 🟡 Intermediate | Prereq: 01 | ~9 min

Unit tests verify individual functions; component tests verify UI pieces in isolation. Together they form the base of the pyramid — fast, reliable, and cheap to write.

---

## 2.1 Unit Test Anatomy

```ts
// Pure function — ideal for unit testing
function calculateTax(amount: number, rate: number): number {
  return Math.round(amount * rate * 100) / 100;
}

describe('calculateTax', () => {
  // Happy path
  it('calculates 10% tax on $100', () => {
    expect(calculateTax(100, 0.10)).toBe(10);
  });

  // Edge cases
  it('handles zero amount', () => {
    expect(calculateTax(0, 0.10)).toBe(0);
  });

  it('handles fractional cents', () => {
    expect(calculateTax(33.33, 0.08)).toBe(2.67); // 2.6664 → 2.67
  });

  // Error cases
  it('throws on negative amount', () => {
    expect(() => calculateTax(-50, 0.10)).toThrow();
  });
});
```

## 2.2 Mocking External Dependencies

```ts
// Service with external API dependency
class PaymentService {
  constructor(private gateway: PaymentGateway) {}
  
  async charge(amount: number, token: string): Promise<ChargeResult> {
    if (amount <= 0) throw new Error('Invalid amount');
    return this.gateway.process({ amount, token });
  }
}

// Test with mock
const mockGateway = { process: vi.fn() };

test('charges valid amount successfully', async () => {
  mockGateway.process.mockResolvedValue({ id: 'ch_123', status: 'success' });
  const service = new PaymentService(mockGateway);
  
  const result = await service.charge(100, 'tok_visa');
  
  expect(result.status).toBe('success');
  expect(mockGateway.process).toHaveBeenCalledWith({ amount: 100, token: 'tok_visa' });
});

test('rejects zero amount', async () => {
  const service = new PaymentService(mockGateway);
  await expect(service.charge(0, 'tok')).rejects.toThrow('Invalid amount');
});
```

## 2.3 Component Testing (React)

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('Counter increments on button click', () => {
  render(<Counter initial={0} />);
  
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('+'));
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## 2.4 Anti-Patterns

- **Mocking what you own** — mock external APIs, not your own classes
- **Testing implementation** — don't assert `useState` was called; assert rendered output
- **One assertion per test** — `it('does X and Y and Z')` = hard to debug

## 2.5 ICIL Cross-Ref

Use with: `software-engineering/05` (code-level testing), `testing-qa/04` (E2E)

## ⚡ Action Checklist
- [ ] Every exported function has at least: happy path + null/empty + error test
- [ ] Mock external APIs — never call real services in unit tests
- [ ] Component tests assert rendered output, not internal state
- [ ] Coverage: ≥ 80% lines, 100% branches on critical paths
- [ ] Tests run in < 5 seconds for the entire suite
