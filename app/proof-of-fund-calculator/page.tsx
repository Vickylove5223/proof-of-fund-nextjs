"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalculatorPage() {
  const [amount, setAmount] = useState<string>('');
  const [bankType, setBankType] = useState<string>('tier1');
  const [interestRate, setInterestRate] = useState<string>('3.9%');
  const [duration, setDuration] = useState<number>(1);
  const [startMonth, setStartMonth] = useState<string>('November');
  const [startYear, setStartYear] = useState<string>('2025');
  const [purpose, setPurpose] = useState<string>('Visa Application');
  const [isCalculated, setIsCalculated] = useState(false);
  const [error, setError] = useState<string>('');

  // Auto-format amount with commas
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    if (!isNaN(Number(val)) && val !== '') {
      setAmount(Number(val).toLocaleString());
      setError('');
      setIsCalculated(false);
    } else if (val === '') {
      setAmount('');
      setIsCalculated(false);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!amount || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    setIsCalculated(true);
    
    // Smooth scroll to results on mobile
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const getCalculationBreakdown = () => {
    const principal = Number(amount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100;
    const monthlyInterest = principal * rate;
    const totalInterest = monthlyInterest * duration;

    // Generate schedule
    const startMonthIndex = months.indexOf(startMonth);
    let currentYear = parseInt(startYear) || new Date().getFullYear();
    let currentMonth = startMonthIndex;
    
    const schedule = [];
    for(let i = 1; i <= duration; i++) {
       const monthName = months[currentMonth].substring(0,3);
       schedule.push({
          paymentNo: i,
          date: `${monthName}-${currentYear}`,
          amount: principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          interest: monthlyInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
       });
       currentMonth++;
       if(currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
       }
    }

    return {
      principal: principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      monthlyInterest: monthlyInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalInterest: totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      schedule
    };
  };

  return (
    <div className="min-h-screen bg-[#F3F0FF] pb-24 font-sans text-[#120E00]">
      {/* Header Section */}
      <div className="bg-[#2E1499] text-white pt-20 pb-32 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-blue-200 mb-4 font-medium flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> 
            <ChevronRight size={14} /> 
            <span>Proof Of Fund Calculator</span>
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">Proof Of Fund Calculator</h1>
          <p className="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto px-2">
            A simple tool to help you calculate Proof of Funds for various purposes. Get a detailed breakdown of your payments.
          </p>
        </div>
      </div>

      {/* Calculator Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-slate-100">
          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">POF Fund Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₦</span>
                <input 
                  type="text" 
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className={`w-full pl-10 pr-4 py-3 sm:py-4 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-[#2E1499]'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-lg font-medium`}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bank Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Type</label>
                <div className="relative">
                  <select 
                    value={bankType}
                    onChange={(e) => { 
                      setBankType(e.target.value); 
                      setInterestRate(e.target.value === 'tier1' ? '3.9%' : '3.0%');
                      setIsCalculated(false); 
                    }}
                    className="w-full px-4 py-3 sm:py-4 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all bg-white appearance-none cursor-pointer"
                  >
                    <option value="tier1">Tier 1 Banks (First Bank, GTB, UBA, Zenith)</option>
                    <option value="tier2">Tier 2 Banks (Globus, Parallax, Fidelity)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>
              
              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  Monthly Interest Rate (%)
                </label>
                <div className="relative">
                  <select 
                    value={interestRate}
                    onChange={(e) => { setInterestRate(e.target.value); setIsCalculated(false); }}
                    className="w-full px-4 py-3 sm:py-4 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all bg-white appearance-none cursor-pointer"
                  >
                    {bankType === 'tier1' ? (
                      <>
                        <option value="3.9%">3.9%</option>
                        <option value="3.8%">3.8%</option>
                        <option value="3.7%">3.7%</option>
                        <option value="3.6%">3.6%</option>
                        <option value="3.5%">3.5%</option>
                        <option value="3.4%">3.4%</option>
                        <option value="3.3%">3.3%</option>
                        <option value="3.2%">3.2%</option>
                        <option value="3.1%">3.1%</option>
                      </>
                    ) : (
                      <>
                        <option value="3.0%">3.0%</option>
                        <option value="2.9%">2.9%</option>
                        <option value="2.8%">2.8%</option>
                        <option value="2.7%">2.7%</option>
                        <option value="2.6%">2.6%</option>
                      </>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Loan Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Duration (Months)</label>
                <div className="relative">
                  <select 
                    value={duration}
                    onChange={(e) => { setDuration(Number(e.target.value)); setIsCalculated(false); }}
                    className="w-full px-4 py-3 sm:py-4 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all bg-white appearance-none cursor-pointer"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m}>{m} month{m > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Start Month */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Start Month</label>
                <div className="relative">
                  <select 
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all bg-white appearance-none cursor-pointer"
                  >
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Start Year */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Start Year</label>
                <input 
                  type="text" 
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full px-4 py-3 sm:py-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Purpose of Fund</label>
                <div className="relative">
                  <select 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all bg-white appearance-none cursor-pointer"
                  >
                    <option value="Visa Application">Visa Application</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2E1499] hover:bg-black text-white font-bold py-4 rounded-lg transition-colors mt-8 text-lg transform hover:-translate-y-0.5"
            >
              Calculate
            </button>
          </form>

          {/* Results Area */}
          {isCalculated && amount && (
             <div id="calculator-results" className="mt-16 pt-10 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
               
               {/* Summary Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="bg-[#fcfafc] border border-slate-100 rounded-xl p-8 text-center shadow-sm">
                   <p className="text-sm font-semibold text-[#2E1499] mb-4">Monthly Repayment</p>
                   <p className="text-3xl font-black text-slate-700">₦{getCalculationBreakdown().monthlyInterest}</p>
                 </div>
                 <div className="bg-[#fcfafc] border border-slate-100 rounded-xl p-8 text-center shadow-sm">
                   <p className="text-sm font-semibold text-[#2E1499] mb-4">Total Repayment</p>
                   <p className="text-3xl font-black text-slate-700">₦{getCalculationBreakdown().totalInterest}</p>
                 </div>
               </div>

               {/* WhatsApp Alert */}
               <div className="bg-[#e8f7fa] text-slate-700 text-sm md:text-base text-center p-6 rounded-lg mb-10 border border-blue-50">
                 Check with us on <span className="font-semibold text-slate-800">whatsapp</span> to see if you can get this rate ({interestRate}) for your POF as at today: 
                 <a href="https://wa.link/a8pskc" target="_blank" rel="noreferrer" className="text-blue-600 font-bold ml-1 hover:underline">
                   Message on WhatsApp
                 </a>
               </div>
               
               {/* Schedule Table */}
               <h3 className="text-xl font-bold text-[#2E1499] mb-6 text-center">Loan Repayment Schedule</h3>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[600px]">
                   <thead>
                     <tr className="border-b border-slate-200">
                       <th className="py-4 px-4 font-bold text-[#2E1499] text-sm">Payment No.</th>
                       <th className="py-4 px-4 font-bold text-[#2E1499] text-sm">Payment Date</th>
                       <th className="py-4 px-4 font-bold text-[#2E1499] text-sm">POF Amount</th>
                       <th className="py-4 px-4 font-bold text-[#2E1499] text-sm">Interest to be Paid</th>
                     </tr>
                   </thead>
                   <tbody>
                     {getCalculationBreakdown().schedule.map((row) => (
                       <tr key={row.paymentNo} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                         <td className="py-4 px-4 text-sm font-medium text-slate-700">{row.paymentNo}</td>
                         <td className="py-4 px-4 text-sm font-medium text-slate-700">{row.date}</td>
                         <td className="py-4 px-4 text-sm font-medium text-slate-700">₦{row.amount}</td>
                         <td className="py-4 px-4 text-sm font-medium text-slate-700">₦{row.interest}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>

             </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}

    </div>
  );
}
