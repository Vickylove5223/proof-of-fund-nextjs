import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proof Of Fund Calculator',
  description: 'Calculate your Proof of Funds effortlessly. Get a detailed breakdown of monthly and total interest for Nigerian banks.',
  alternates: {
    canonical: 'https://proofoffund.com.ng/proof-of-fund-calculator',
  },
  openGraph: {
    title: 'Proof Of Fund Calculator | POFNG',
    description: 'Calculate your Proof of Funds effortlessly. Get a detailed breakdown of monthly and total interest for Nigerian banks.',
    url: 'https://proofoffund.com.ng/proof-of-fund-calculator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
