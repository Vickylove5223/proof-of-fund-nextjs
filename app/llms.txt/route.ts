export async function GET() {
  const content = `# Proof of Funds Nigeria (POFNG)

## About
Proof of Funds Nigeria (POFNG) is a premium financial service that provides 100% verifiable Proof of Funds (POF) for individuals and businesses in Nigeria. We specialize in fast, reliable processing within 24-48 hours.

## Key Services
- Visa Application Proof of Funds
- Business Expansion Proof of Funds
- Educational Proof of Funds
- Backdated bank statements

## Requirements
To process a Proof of Funds request, we typically require:
1. Valid Means of Identification (International Passport, NIN, Drivers License)
2. Bank Details (Account Name, Number, Bank Name)
3. School Offer Letter or Visa Application Details
4. Processing Fee

## Contact
- Website: https://proofoffund.com.ng
- WhatsApp: https://wa.link/a8pskc
- Location: Nigeria

## Why Choose Us?
- 100% Verifiable funds from Tier 1 and Tier 2 Nigerian banks
- 24-48 hour fast processing
- Transparent interest rates and calculation

Use our Proof of Funds Calculator at https://proofoffund.com.ng/proof-of-fund-calculator to estimate your costs.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
