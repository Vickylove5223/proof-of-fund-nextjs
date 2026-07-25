"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';

const CATEGORIES = ["All", "Canada", "UK", "USA", "Australia", "Europe", "Student Visa", "General"];

function getCategoryForPost(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('canada')) return "Canada";
  if (t.includes('uk ') || t.includes('united kingdom')) return "UK";
  if (t.includes('usa ') || t.includes('united states') || t.includes('f1 visa')) return "USA";
  if (t.includes('australia')) return "Australia";
  if (t.includes('europe') || t.includes('portugal') || t.includes('ireland') || t.includes('italy') || t.includes('germany') || t.includes('france') || t.includes('schengen') || t.includes('austria') || t.includes('poland')) return "Europe";
  if (t.includes('student') || t.includes('study')) return "Student Visa";
  return "General";
}

export default function BlogListClient({ posts }: { posts: any[] }) {
  const [visibleCount, setVisibleCount] = useState(30);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const postsPerPage = 30;

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const titleMatch = post.meta.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const excerptMatch = post.meta.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = !searchQuery || titleMatch || excerptMatch;

      const category = getCategoryForPost(post.meta.title || "");
      const matchesCategory = selectedCategory === "All" || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const currentPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const loadMore = () => {
    setVisibleCount((count) => count + postsPerPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(postsPerPage);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(postsPerPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16">
      
      {/* Filters Section */}
      <div className="mb-12 space-y-8">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search proof of funds guides..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-6 py-4 rounded-full border-[3px] border-[#120E00] shadow-[-6px_6px_0px_#120E00] focus:outline-none focus:translate-x-[-2px] focus:translate-y-[2px] focus:shadow-[-4px_4px_0px_#120E00] transition-all bg-white text-[#120E00] font-bold text-lg placeholder:text-slate-400 placeholder:font-normal"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full font-bold text-sm tracking-wide transition-all border-[2px] border-[#120E00] ${
                selectedCategory === cat
                  ? "bg-[#2E1499] text-white shadow-[-4px_4px_0px_#120E00]"
                  : "bg-white text-[#120E00] shadow-none hover:shadow-[-4px_4px_0px_#120E00] hover:translate-x-[2px] hover:translate-y-[-2px]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-[3px] border-[#120E00] shadow-[-10px_10px_0px_#120E00]">
          <h3 className="text-2xl font-bold text-[#120E00] mb-2">No posts found</h3>
          <p className="text-slate-600">Try adjusting your search or category filters.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="mt-6 px-6 py-3 bg-[#2E1499] text-white font-bold rounded-full border-[2px] border-[#120E00] hover:shadow-[-4px_4px_0px_#120E00] transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 min-h-[400px]">
          {currentPosts.map((post) => (
            <div key={post.slug} className="bg-[#F3F0FF] rounded-3xl overflow-hidden border-[3px] border-[#120E00] shadow-[-10px_10px_0px_#120E00] flex flex-col h-full text-left">
              {post.meta.image && (
                <img src={post.meta.image} alt={post.meta.title} className="w-full h-48 object-cover border-b-[3px] border-[#120E00]" />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-bold font-serif text-[1.25rem] text-[#120E00] mb-3 leading-tight tracking-wide">
                  <Link href={`/${post.slug}`} className="hover:text-[#2E1499] transition-colors">
                    {post.meta.title}
                  </Link>
                </h2>
                <p className="text-[15px] text-[#120E00] leading-relaxed mb-6 flex-grow">
                  {post.meta.excerpt || "Comprehensive guide and updates regarding proof of funds processing, requirements, and insights for Nigerian students..."}
                </p>
                <div className="mt-auto">
                  <Link href={`/${post.slug}`} className="text-sm font-black text-[#2E1499] uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center gap-1 w-max">
                    READ MORE <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {hasMore && (
        <div className="flex justify-center mt-20">
          <button
            onClick={loadMore}
            className="px-8 py-3.5 bg-white text-[#120E00] font-bold rounded-full border-[3px] border-[#120E00] shadow-[-6px_6px_0px_#120E00] hover:shadow-none hover:translate-x-[-6px] hover:translate-y-[6px] transition-all uppercase tracking-widest text-sm"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
