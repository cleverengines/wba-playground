# WBA Pricing Strategy & Payment Plan Risk Mitigation

## Core Pricing Decision

**Launch Price: $1,497 USD**

Why this specific number:
- Just under the $1,500 psychological barrier
- Premium positioning without entering corporate education territory
- Allows room to increase to $1,997-2,497 after validation
- USD pricing gives us 30-35% currency arbitrage advantage in Australia
- Positions us between online courses ($300-800) and corporate consulting ($5,000+)

## Price Testing Strategy

**Phase 1: Validation (First 50 customers)**
- Early bird: $997 USD
- Creates urgency and allows testimonial gathering
- Lower risk for initial validation

**Phase 2: Standard Launch**
- Regular price: $1,497 USD
- Payment plan: 3 x $549 ($150 premium for installments)

**Phase 3: Premium Positioning (After 100+ customers)**
- Increase to $1,997 USD
- Payment plan: 3 x $729

## Payment Plan Structure

**Our 3-Payment Approach:**
- Down payment: $549 USD
- Payment 2: $549 USD (30 days)
- Payment 3: $549 USD (60 days)
- Total: $1,647 ($150 premium over full payment)

**Why 3 payments max:**
- Shorter timeline = lower default risk
- Higher payments create more commitment
- Easier to collect on 60-day vs 6-month timeline

## Risk Mitigation Framework

### Technical Safeguards

**Payment Capture:**
- Full credit card authorization upfront using Stripe Setup Intents
- Validate card can handle full amount before access
- NO PayPal payment plans (40%+ higher default rates)
- Automatic retry logic: 3 attempts over 7 days

**Access Control:**
- Course access suspended immediately on failed payment
- Drip content release tied to payment status
- Community access revoked until payment resolved
- Certificate only issued with full payment completion

### Legal Protection

**Terms & Conditions Must Include:**
- "Course access contingent on successful payment plan completion"
- "Failed payments result in immediate access suspension"
- "Collection fees and legal costs added to outstanding balance"
- "Disputes governed by Australian law"

**Collection Process:**
1. Day 1: Automated payment retry
2. Day 3: Email notification + SMS
3. Day 7: Final automated retry
4. Day 10: Personal outreach (if high-value student)
5. Day 14: Access suspension + collections notice

### Behavioral Incentives

**Encourage Full Payment:**
- 10% discount for paying in full ($1,347 vs $1,647)
- Bonus module only available to full-pay customers
- Priority support for full-pay customers

**Payment Plan Commitment:**
- Require completion of onboarding module before first installment
- Personal welcome call for payment plan customers
- Higher perceived value = lower default rates

## Expected Default Rates

**Industry Benchmarks:**
- Well-structured payment plans: 8-15%
- Our target: <12% (premium audience + strong safeguards)
- Budget for 15% defaults in financial planning

**Revenue Impact Calculation:**
- 100 payment plan customers at $1,647 = $164,700
- 15% default after first payment = $14,823 loss
- Net revenue: $149,877
- Still higher than discounting to $1,347 for everyone

## Pricing Psychology Elements

**Why $1,497 Works:**
- Anchored below $1,500 barrier
- Premium enough to attract quality customers
- Corporate training budgets can approve
- Individual professionals can justify

**Payment Plan Premium Logic:**
- Risk compensation for defaults
- Incentivizes full payment
- Standard practice in high-ticket courses
- Customers expect to pay more for convenience

## Global Pricing Considerations

**USD Benefits:**
- International credibility
- Currency arbitrage advantage
- Simplified global pricing
- Most premium courses price in USD

**PPP Adjustments (if needed later):**
- Developing countries: 50% discount with income verification
- Only if significant demand from these markets
- Use separate landing pages to avoid price anchoring

## Future Pricing Evolution

**Course 2+:**
- Price at $997-1,497 depending on depth
- Bundle discounts for multiple courses
- Annual membership model consideration at $2,997/year

**Brand Symmetry Certification:**
- Premium tier at $2,997
- Includes 1:1 coaching session
- Certification badge and credentials
- Limited cohort size (50 people max)

## Implementation Checklist

- [ ] Set up Stripe with Setup Intents capability
- [ ] Configure automatic retry logic (3 attempts, 7 days)
- [ ] Create access suspension automation
- [ ] Draft payment plan terms and conditions
- [ ] Set up collections email sequence
- [ ] Configure course access tied to payment status
- [ ] Test payment failure scenarios
- [ ] Create full-pay discount landing page variation