import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Work | Proof of Funds Nigeria',
  description: 'Learn about the 3 easy steps to get your Proof of Funds sorted in 24-48 hours.',
  alternates: {
    canonical: 'https://proofoffund.com.ng/step-guides',
  },
  openGraph: {
    title: 'How We Work | Proof of Funds Nigeria',
    description: 'Learn about the 3 easy steps to get your Proof of Funds sorted in 24-48 hours.',
    url: 'https://proofoffund.com.ng/step-guides',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
