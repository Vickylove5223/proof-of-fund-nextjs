"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function RequirementsPage() {
  return (
    <div className="min-h-screen bg-[#F3F0FF] font-sans text-[#120E00]">
      {/* Header Section */}
      <div className="bg-[#2E1499] text-white pt-20 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-blue-200 mb-4 font-medium flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> 
            <ChevronRight size={14} /> 
            <span>POF Requirements</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">POF Requirements</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#2E1499] prose-a:text-blue-600">
          <h2 className="text-3xl font-bold mb-6">Requirements for Individuals and Businesses</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            When applying for visas, loans, or international transactions, one of the most common requests you will encounter is Proof of Funds (POF). This is a formal statement showing you have the financial ability to carry out your intended goals, such as tuition, living expenses, or investments.
          </p>
          <p className="text-slate-700 leading-relaxed mb-12">
            Whether you are an individual applying for a student visa or a business seeking expansion capital, having the correct documentation is critical to your success. Below is a comprehensive breakdown of the typical requirements.
          </p>

          <h3 className="text-2xl font-bold mb-4">Proof of Fund Requirements for Individuals</h3>
          <p className="text-slate-700 mb-6">For individual applicants, you will need to complete the form below in full. Here is everything you will be asked for:</p>

          <h4 className="font-bold text-lg mb-3">1. Personal Details</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            <li>BVN</li>
            <li>Title</li>
            <li>Surname</li>
            <li>First Name</li>
            <li>Middle Name (optional)</li>
            <li>Gender</li>
            <li>Marital Status</li>
            <li>Date of Birth</li>
            <li>Country of Birth</li>
            <li>Nationality</li>
            <li>State of Origin</li>
            <li>LGA of Origin</li>
            <li>Mother's Maiden Name</li>
            <li>Phone Number</li>
            <li>Email</li>
            <li>POF Amount Needed</li>
            <li>Bank</li>
            <li>Account Number</li>
            <li>Occupation</li>
            <li>Residential Address</li>
            <li>State of Residence</li>
            <li>City/Town</li>
            <li>Nearest Bus Stop</li>
          </ul>

          <h4 className="font-bold text-lg mb-3">2. Next of Kin</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            <li>Title</li>
            <li>Surname</li>
            <li>First Name</li>
            <li>Middle Name (optional)</li>
            <li>Date of Birth</li>
            <li>Relationship</li>
            <li>Gender</li>
            <li>Phone Number</li>
            <li>Email</li>
            <li>Residential Address</li>
            <li>Nearest Bus Stop</li>
            <li>City/Town</li>
            <li>State</li>
            <li>LGA</li>
          </ul>

          <h4 className="font-bold text-lg mb-3">3. Documents to Upload</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            <li>Valid ID (names must match your BVN)</li>
            <li>Utility Bill (current)</li>
            <li>Passport Photograph</li>
            <li>Signature signed on plain paper</li>
            <li>Proof of Travel — Admission Letter, Contract Letter, Visa, or other (optional, if applicable)</li>
          </ul>

          <h4 className="font-bold text-lg mb-3">How to Get Funds</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            <li>Personal Savings</li>
            <li>Family Sponsorship</li>
            <li>Educational Loans</li>
            <li>Scholarships or Grants</li>
            <li>Verified POF Providers (like POFNG)</li>
          </ul>

          <h4 className="font-bold text-lg mb-3">Why These Requirements Matter</h4>
          <p className="text-slate-700 mb-4">Embassies and institutions need absolute certainty that:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-12">
            <li>The funds are genuinely yours (or legally accessible to you).</li>
            <li>The money has been in your account for the required duration (e.g., 28 days for UK visas).</li>
            <li>The source of the funds is legitimate and verifiable.</li>
          </ul>

          <div className="w-full h-px bg-slate-200 my-12"></div>

          <h3 className="text-2xl font-bold mb-4">POF Requirements for Businesses</h3>
          <p className="text-slate-700 mb-6">Business applicants looking for Proof of Funds for large-scale contracts, trade financing, or expansion must provide corporate documentation:</p>

          <h4 className="font-bold text-lg mb-3">Corporate Registration & Details</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            <li>Certificate of Incorporation (CAC)</li>
            <li>Memorandum and Articles of Association (MEMART)</li>
            <li>Status Report (Form CAC 1.1)</li>
            <li>Tax Clearance Certificate (TCC)</li>
            <li>Company Profile</li>
            <li>Board Resolution authorizing the POF request</li>
            <li>Directors' valid identification (Passport, NIN)</li>
          </ul>

          <h4 className="font-bold text-lg mb-3">Financial Documentation</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            <li>Audited Financial Statements (Last 3 years)</li>
            <li>6 to 12 months Company Bank Statements</li>
            <li>Proforma Invoices or Contract Agreements (justifying the required amount)</li>
            <li>Evidence of previous successful executions (if applicable)</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 mt-12">Final Thoughts</h3>
          <p className="text-slate-700 leading-relaxed">
            While these lists cover standard requirements, every institution or embassy has specific nuances regarding formatting, currency conversions, and holding periods. Working with experienced professionals like POFNG ensures your documentation is structured perfectly the first time, avoiding costly delays or rejections.
          </p>
        </div>
      </div>
    </div>
  );
}
