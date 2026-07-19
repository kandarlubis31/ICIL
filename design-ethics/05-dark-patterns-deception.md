# ⚖️ 05 — Dark Patterns, Deception & Manipulation

> **Level: 🟡 Intermediate** | Prerequisite: 01 | ~10 min

Dark patterns are UI/UX designed to trick users into doing things they didn't intend. This isn't just bad design — it's increasingly illegal (FTC, EU DSA, GDPR). Know them to avoid them — and to recognize when you're being asked to build one.

---

## 5.1 The 12 Dark Patterns (Brignull + FTC)

| Pattern | How It Works | Example |
|---------|-------------|---------|
| **Confirm-shaming** | Guilt-trips user into opting in | "No thanks, I don't want to save money" |
| **Forced continuity** | Free trial → auto-charge without clear warning | "7-day free trial" (requires card, hard to cancel) |
| **Disguised ads** | Ads look like native content or UI elements | Download button that's actually an ad |
| **Roach motel** | Easy to sign up, nearly impossible to cancel | Cancel button hidden behind 5 screens + phone call |
| **Privacy zuckering** | Trick users into sharing more data than intended | Confusing privacy settings with pre-ticked boxes |
| **Sneak into basket** | Items added to cart without user action | "You may also like" auto-adds donation at checkout |
| **Hidden costs** | Fees revealed only at final step | $29/night hotel → $54 after "resort fee" + "cleaning fee" |
| **Bait and switch** | UI does something different from what user expected | Clicking X closes AND opts into newsletter |
| **Misdirection** | Visual design steers toward undesired choice | "Accept All" = bright green, "Reject All" = grey on grey |
| **Price comparison prevention** | Makes it hard to compare prices | "Was $99, now $49" (never actually sold at $99) |
| **Trick wording** | Confusing double negatives | "Uncheck this box if you DON'T want to NOT receive emails" |
| **Friend spam** | Accesses contacts under false pretenses | "Find your friends!" → emails everyone in your address book |

---

## 5.2 Legal Landscape

| Regulation | Jurisdiction | Key Dark Pattern Provision |
|-----------|-------------|--------------------------|
| **FTC Act §5** | USA | "Unfair or deceptive acts" — includes dark patterns since 2021 enforcement update |
| **EU Digital Services Act** | EU | Explicitly bans dark patterns on online platforms (Article 25) |
| **GDPR** | EU | Consent must be "freely given, specific, informed" — dark patterns invalidate consent |
| **California AADC** | California | Bans dark patterns targeting children |
| **UK DMCC Bill** | UK | Consumer protection against subscription traps + fake reviews |

---

## 5.3 The Designer's Defense

When asked to implement a dark pattern:

```
"What's the user benefit of this approach?"
"Is there a way to achieve the same business goal transparently?"
"How would we feel if a competitor did this to our users?"
"Would this hold up under FTC/DSA scrutiny?"
```

| If They Say | Respond With |
|------------|-------------|
| "Competitors do it" | "They'll also get fined. Let's be the one that doesn't." |
| "It's just UX optimization" | "Deception isn't optimization. A/B test a transparent version." |
| "Legal signed off" | "Legal minimum ≠ ethical maximum. Can we aim higher?" |
| "It'll hurt conversion" | "Short-term conversion vs long-term trust + regulatory risk — let's model both." |

---

## ⚡ Action Checklist

- [ ] Run a dark pattern audit on your product — use the 12-pattern checklist above
- [ ] Fix the top 3 most deceptive patterns in your current UI
- [ ] Document an ethical escalation path: "If I'm asked to build a dark pattern, I talk to ___"
- [ ] Read the FTC's 2022 "Bringing Dark Patterns to Light" report

> **ICIL Cross-Ref:** ux-psikologi/06 (Dark Patterns & Ethics), ux-writing/03 (Component Microcopy), design-ethics/01 (Ethical Frameworks)
