"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function BlogListClient({ posts }: { posts: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 30;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 min-h-[400px]">
        {currentPosts.map((post) => (
          <div key={post.slug} className="bg-[#F3F0FF] rounded-3xl p-6 overflow-hidden border-[3px] border-[#120E00] shadow-[-10px_10px_0px_#120E00] flex flex-col h-full text-left">
            <h2 className="font-bold font-serif text-[1.25rem] text-[#120E00] mb-3 leading-tight uppercase tracking-wide">
              <Link href={`/blog/${post.slug}`} className="hover:text-[#2E1499] transition-colors">
                {post.meta.title}
              </Link>
            </h2>
            <p className="text-[15px] text-[#120E00] leading-relaxed mb-6 flex-grow">
              {post.meta.excerpt || "Comprehensive guide and updates regarding proof of funds processing, requirements, and insights for Nigerian students..."}
            </p>
            <div className="mt-auto">
              <Link href={`/blog/${post.slug}`} className="text-sm font-black text-[#2E1499] uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center gap-1 w-max">
                READ MORE <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-20">
          <button 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center text-sm ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-white hover:border-slate-200 cursor-pointer'} border border-transparent font-bold`}
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${
                currentPage === page 
                  ? 'bg-white border border-slate-200 text-[#120E00]' 
                  : 'text-slate-500 hover:bg-white hover:border-slate-200 border border-transparent cursor-pointer'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center text-sm ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-white hover:border-slate-200 cursor-pointer'} border border-transparent font-bold`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
