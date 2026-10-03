import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Proof of Funds Nigeria',
  description: 'Contact Proof of Funds Nigeria for inquiries, support, and fast processing of your proof of funds. We are available to help you meet your financial requirements.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Proof of Funds Nigeria',
    description: 'Get in touch with Proof of Funds Nigeria. We process 100% verifiable proof of funds within 24-48 hours.',
    url: 'https://proofoffund.com.ng/contact',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Proof of Funds Nigeria',
  description: 'Contact Proof of Funds Nigeria for fast, reliable, and verifiable proof of funds.',
  url: 'https://proofoffund.com.ng/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Proof of Funds Nigeria',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-810-366-9924',
      contactType: 'customer service',
      email: 'info@proofoffund.com.ng',
      areaServed: 'NG',
      availableLanguage: 'English'
    }
  }
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <div className="bg-[#120E00] text-white pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance with your proof of funds? Our team is here to help you every step of the way.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold font-serif mb-4 text-[#120E00]">Get in Touch</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We understand the urgency of your applications. Reach out to us via email or phone, or visit our office during working hours.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#120E00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#120E00]">Phone</h3>
                  <a href="tel:08103669924" className="text-slate-600 hover:text-indigo-600 transition-colors">08103669924</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#120E00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#120E00]">Email</h3>
                  <a href="mailto:info@proofoffund.com.ng" className="text-slate-600 hover:text-indigo-600 transition-colors">info@proofoffund.com.ng</a>
                </div>
              </div>

              {/* Address 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#120E00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#120E00]">Office Address 1</h3>
                  <p className="text-slate-600 leading-relaxed">
                    6, Babatunde Jose Street<br />
                    Off Ademola Adetokunbo, V.I<br />
                    Lagos
                  </p>
                </div>
              </div>

              {/* Address 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#120E00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#120E00]">Office Address 2</h3>
                  <p className="text-slate-600 leading-relaxed">
                    161C Raufu Taylor Close<br />
                    Off Idejo Street, Victoria Island<br />
                    Lagos
                  </p>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#120E00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#120E00]">Working Hours</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Mon-Fri: 09:00 am - 05:00 pm<br />
                    Sat-Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action / CTA */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-fit">
            <h2 className="text-2xl font-bold font-serif mb-4 text-[#120E00]">Fastest Way to Reach Us</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              For immediate assistance and faster response time, we highly recommend chatting with our POF Officer on WhatsApp.
            </p>
            <a 
              href="https://wa.link/a8pskc" 
              target="_blank" 
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-green-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
