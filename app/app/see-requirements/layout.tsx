import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'POF Requirements | How to Get Your Proof of Funds in 24 Hours',
  description: 'Learn exactly what you need to apply for Proof of Funds in Nigeria. Fast processing, transparent requirements, and 100% verifiable bank statements for your visa success.',
  alternates: {
    canonical: 'https://proofoffund.com.ng/see-requirements',
  },
  openGraph: {
    title: 'POF Requirements | Proof of Funds Nigeria',
    description: 'Fast processing, transparent requirements, and 100% verifiable bank statements.',
    url: 'https://proofoffund.com.ng/see-requirements',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
