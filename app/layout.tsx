import { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import GlobalFooterCTA from './components/GlobalFooterCTA';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://proofoffund.com.ng'),
  title: {
    default: 'Proof of Funds Nigeria | 100% Verifiable & Fast Processing',
    template: '%s | Proof of Funds Nigeria'
  },
  description: 'We make it easy to meet financial requirements for visas, business, or education with fast processing (24-48 hours) and 100% verifiable proof of funds in Nigeria.',
  openGraph: {
    title: 'Proof of Funds Nigeria | 100% Verifiable',
    description: 'Get your proof of funds sorted in 24-48 hours. Fast, reliable, and verifiable for visa or business applications.',
    url: 'https://proofoffund.com.ng',
    siteName: 'Proof of Funds Nigeria',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'POFNG Logo',
      }
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proof of Funds Nigeria',
    description: 'Fast, reliable, and verifiable Proof of Funds in Nigeria (24-48 hours processing).',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png', // Fallback for apple touch if needed
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Proof of Funds Nigeria',
  url: 'https://proofoffund.com.ng',
  logo: 'https://proofoffund.com.ng/logo.png',
  description: 'Fast, reliable, and verifiable Proof of Funds in Nigeria for visa, business, and education applications.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NG'
  },
  areaServed: 'NG',
  provider: {
    '@type': 'Organization',
    name: 'POFNG'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#F3F0FF] text-slate-800 antialiased min-h-screen flex flex-col font-sans">
        {/* Top Banner */}
        <div className="bg-[#120E00] text-white text-center py-2.5 px-4 text-sm font-medium tracking-wide">
          We can provide you a backdated bank statement depending on your needs.
        </div>

        {/* Top Navbar */}
        <Navbar />
        
        <main className="flex-grow">{children}</main>
        
        <GlobalFooterCTA />
        
        <footer className="border-t border-indigo-900 py-12 px-6 bg-[#2E1499] text-sm text-indigo-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-white hover:text-indigo-100 transition-colors">POFNG</Link>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="https://wa.link/a8pskc" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div>&copy; {new Date().getFullYear()} Proof of Funds Nigeria.</div>
          </div>
        </footer>
        <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 group">
          <span className="bg-white text-slate-800 text-sm font-bold py-2 px-4 rounded-full shadow-lg border border-slate-100 pointer-events-none">Live Chat our POF Officer</span>
          <a href="https://wa.link/a8pskc" target="_blank" rel="noreferrer" aria-label="WhatsApp Chat Button" className="bg-[#25D366] text-white p-3 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center h-12 w-12">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
        </div>
      </body>
    </html>
  );
}

