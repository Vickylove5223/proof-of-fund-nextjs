'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-[#F3F0FF] relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={closeMenu}>
          <img src="/logo.png" alt="POFNG Logo" className="h-10 w-auto" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-800">
          <Link href="/" className="hover:text-[#2E1499] transition-colors">Home</Link>
          <Link href="/see-requirements" className="hover:text-[#2E1499] transition-colors">POF Requirements</Link>
          <Link href="/step-guides" className="hover:text-[#2E1499] transition-colors">STEP Guides</Link>
          <Link href="/guides" className="hover:text-[#2E1499] transition-colors">Insights & Updates</Link>
          <Link href="/proof-of-fund-calculator" className="hover:text-[#2E1499] transition-colors">POF Calculator</Link>
        </div>

        {/* Desktop CTA */}
        <Link 
          href="https://wa.link/a8pskc" 
          target="_blank" 
          rel="noreferrer" 
          className="hidden md:block bg-[#120E00] hover:bg-black text-white px-6 py-2.5 rounded font-medium text-sm transition-colors uppercase tracking-wide"
        >
          CHAT OUR REP
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-slate-800 p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col py-4 px-6 gap-6">
          <Link href="/" className="text-lg font-medium text-slate-800 hover:text-[#2E1499]" onClick={closeMenu}>Home</Link>
          <Link href="/see-requirements" className="text-lg font-medium text-slate-800 hover:text-[#2E1499]" onClick={closeMenu}>POF Requirements</Link>
          <Link href="/step-guides" className="text-lg font-medium text-slate-800 hover:text-[#2E1499]" onClick={closeMenu}>STEP Guides</Link>
          <Link href="/guides" className="text-lg font-medium text-slate-800 hover:text-[#2E1499]" onClick={closeMenu}>Insights & Updates</Link>
          <Link href="/proof-of-fund-calculator" className="text-lg font-medium text-slate-800 hover:text-[#2E1499]" onClick={closeMenu}>POF Calculator</Link>
          
          <div className="pt-4 border-t border-slate-100">
            <Link 
              href="https://wa.link/a8pskc" 
              target="_blank" 
              rel="noreferrer" 
              className="block text-center bg-[#120E00] hover:bg-black text-white px-6 py-3.5 rounded font-medium text-base transition-colors uppercase tracking-wide"
              onClick={closeMenu}
            >
              CHAT OUR REP
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
