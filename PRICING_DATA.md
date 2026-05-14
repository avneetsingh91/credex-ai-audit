# PRICING_DATA.md

## Pricing Sources

The audit engine uses publicly available pricing as reference.

Verified in May 2026.

---

## ChatGPT

Provider: OpenAI

Plans:
- Plus → $20/month
- Team → $30/user/month
- Enterprise → custom

Source:
https://openai.com/pricing

---

## Claude

Provider: Anthropic

Plans:
- Pro → $20/month
- Team → estimated business pricing

Source:
https://www.anthropic.com/pricing

---

## Cursor

Provider: Cursor

Plans:
- Pro → $20/month
- Business → $40/user/month

Source:
https://www.cursor.com/pricing

---

## GitHub Copilot

Provider: GitHub

Plans:
- Individual → $10/month
- Business → $19/user/month

Source:
https://github.com/features/copilot/plans

---

## Pricing Logic Used

The audit engine uses:

- spend per tool
- number of seats
- team size
- selected use case

The engine compares these against estimated standard plans and identifies potential overpayment.

---

## Assumptions

- Underused seats indicate overspending
- Small teams can often downgrade plans
- Savings = current spend - optimized spend
- Annual savings = monthly savings × 12