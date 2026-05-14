# TESTS.md

## Automated Test Coverage

This project includes testing of the core audit engine logic that powers cost optimization recommendations.

### Covered Cases

### 1. ChatGPT Team downgrade logic
Checks whether users on higher plans with fewer seats are recommended to downgrade for savings.

### 2. Claude plan optimization
Validates cost recommendations for Claude based on team size and usage.

### 3. Cursor Business optimization
Ensures the audit engine detects overspending for Cursor business plans.

### 4. Annual savings calculation
Confirms annual savings are calculated from monthly savings correctly.

### 5. Recommendation generation
Checks if audit results contain:
- tool name
- recommendation
- savings amount
- reason

---

## Manual Testing

### UI Flow Tested

- Add tool
- Select plan
- Enter spend
- Enter seats
- Submit audit
- Display result
- Save report
- Public share page
- Copy link
- Refresh persistence

### Edge Cases Tested

- Empty inputs
- Zero spend
- Large team size
- Multiple tools
- Repeated submissions

---

## Future Tests

Planned:
- API tests
- Load testing
- Lead capture validation
- Share route tests
- Email integration tests