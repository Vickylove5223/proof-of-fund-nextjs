"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

export default function HowWeWorkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { 
      q: "How and when will I pay the interest fee?", 
      a: "You provide us with your details, we open the mandate for you, you pay for the interest rate for the 1st month, then we fund your account. After the mandate expires you can either tell us you want to extend the fund in your account or we take the money back if you don't want to extend it." 
    },
    { 
      q: "Which narration can I use?", 
      a: "You should choose a narration that fits your profile, visa type, and the source of funds in your account. For example, you can use 'Investment Return' from a finance company (we can provide an investment certificate to back this up). If you are a student, you can use 'Study Allowance' issued by a family member's company. You can also use 'Sponsorship' if you are under 40 and have a parent with a strong income (₦1M+) or who is retired. Other options include 'Sales of Assets' and more. We will help you pick the perfect narration!" 
    },
    { 
      q: "Who am I paying to?", 
      a: "Clearato Global (the parent company of Proof of Fund NG). You can learn more about our parent company here: https://clearato.com/" 
    },
    { 
      q: "Can I get an investment certificate?", 
      a: "Yes, we also can provide anyone that needs it at a price." 
    },
    { 
      q: "What are the documents required for starting?", 
      a: "See the requirement here: https://proofoffund.com.ng/see-requirements/" 
    },
    { 
      q: "How long will this take?", 
      a: "24 hrs to 48 hrs is our disbursement process for you to get the fund." 
    },
    { 
      q: "Can I use a new account?", 
      a: "Yes, if you are building your account for the 6 months or number of months your embassy required." 
    },
    { 
      q: "Can I use my Opay, Moniepoint or any micro finance bank?", 
      a: "It depends on the embassy you are applying to, as some countries do accept microfinance banks. We advise you to check your embassy's official website to confirm if they accept them. Otherwise, we highly recommend using commercial banks as they are widely accepted for all official purposes." 
    },
    { 
      q: "How will my account be liened? Will I still be able to use the account?", 
      a: "To place the lien, you will provide us with your account details, and we will open a mandate with your bank. The bank then places a lien (a temporary hold) only on the specific funded amount. Yes, you will still be able to use your account for your regular transactions, but you cannot withdraw the specific POF amount." 
    },
    {
      q: "Is the Proof of Funds legal and verifiable?",
      a: "Yes, our Proof of Funds is 100% legal and verifiable by any embassy, school, or financial institution. The funds are physically deposited into your account by our partner finance houses."
    },
    {
      q: "Do I need to give you my ATM card, PIN, or banking passwords?",
      a: "No, you retain full control of your account at all times. We only require a bank mandate to place a lien on the funded amount. We will never ask for your ATM card, PIN, or login passwords."
    },
    {
      q: "What happens if my visa processing takes longer than expected?",
      a: "If your visa processing takes longer than 30 days, you can easily renew the Proof of Funds for another 30-day cycle by paying the interest fee for the extended period."
    },
    {
      q: "Do you provide Proof of Funds for family or dependent visas?",
      a: "Absolutely. We can provide Proof of Funds that covers the required amount for the principal applicant as well as all accompanying dependents."
    }
  ];

  return (
    <main className="min-h-screen bg-[#F3F0FF] pb-24 font-sans text-[#120E00]">
      <div className="bg-[#2E1499] text-white pt-20 pb-32 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-blue-200 mb-4 font-medium flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>How We Work</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">How We Work</h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto px-2">
            Getting your Proof of Funds is a simple, straightforward process. Follow these three easy steps to get funded.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 mb-20">
        <div className="relative rounded-3xl overflow-hidden border-[3px] border-[#120E00]">
          <img src="/featured-info-v2.jfif" alt="Featured Proof of Funds Information" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col gap-12 text-left">
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <span className="text-6xl md:text-8xl font-serif italic text-[#2E1499] opacity-80 leading-none">1</span>
            <div>
              <h3 className="text-2xl md:text-3xl leading-tight font-serif font-bold text-[#120E00] mb-4">Chat with us & Get Funded</h3>
              <p className="text-[#120E00] text-lg leading-relaxed opacity-90">
                Contact us via WhatsApp on <strong>08103669924</strong> to discuss the exact amount you need, the bank you prefer to use, and the rate for that bank. Once everything is agreed and approved, we proceed to transfer the requested POF amount directly to your Bank Account.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <span className="text-6xl md:text-8xl font-serif italic text-[#2E1499] opacity-80 leading-none">2</span>
            <div>
              <h3 className="text-2xl md:text-3xl leading-tight font-serif font-bold text-[#120E00] mb-4">Confirm & Secure Your POF</h3>
              <p className="text-[#120E00] text-lg leading-relaxed opacity-90">
                After receiving the funds, you can instantly confirm by checking your bank app or bank statement. The funds are "frozen" by a lien during your verification period. You retain full control to use your account for other regular transactions, but you cannot withdraw the POF principal.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <span className="text-6xl md:text-8xl font-serif italic text-[#2E1499] opacity-80 leading-none">3</span>
            <div>
              <h3 className="text-2xl md:text-3xl leading-tight font-serif font-bold text-[#120E00] mb-4">Extension or Liquidation</h3>
              <p className="text-[#120E00] text-lg leading-relaxed opacity-90">
                Each funding cycle lasts exactly 30 days starting from the date you receive the funds. We will notify you 5 days and 1 day before your due date. You can choose to extend (for 1 or more months) by paying the renewal fee, and your extension will start precisely when the first cycle ends. Otherwise, if you confirm the funds are no longer needed, we initiate the lien release and liquidate the funds back to our account to officially settle the transaction.
              </p>
            </div>
          </div>

        </div>


      </div>

      <section className="pt-12 pb-8 px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#120E00] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <span itemProp="name" className="font-bold text-[#2E1499] text-base md:text-lg pr-4">{faq.q}</span>
                  {openFaq === i ? <Minus size={24} className="text-blue-600 flex-shrink-0" /> : <Plus size={24} className="text-slate-400 flex-shrink-0" />}
                </button>
                <div 
                  itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-60 pb-6' : 'max-h-0'}`}
                >
                  {faq.a.includes('https://') ? (
                    <div itemProp="text" className="text-slate-600 text-base md:text-lg leading-relaxed">
                      {faq.a.split('https://')[0]}
                      <a href={`https://${faq.a.split('https://')[1]}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        https://{faq.a.split('https://')[1]}
                      </a>
                    </div>
                  ) : (
                    <div itemProp="text" className="text-slate-600 text-base md:text-lg leading-relaxed">{faq.a}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
