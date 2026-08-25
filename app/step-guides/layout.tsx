import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'STEP Guides | Find Your POF Requirement by Country & Visa Type',
  description: 'Select your destination country and visa type to see exactly how much Proof of Funds you need, how many months of bank statement to submit, and which POF option fits you.',
  alternates: {
    canonical: 'https://proofoffund.com.ng/step-guides',
  },
  openGraph: {
    title: 'STEP Guides | Proof of Funds Nigeria',
    description: 'Select your country and visa type to see your exact POF amount and bank statement duration.',
    url: 'https://proofoffund.com.ng/step-guides',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
