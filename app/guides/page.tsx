import Link from 'next/link';
import { getAllPosts } from '../../lib/markdown';
import { ChevronRight } from 'lucide-react';
import BlogListClient from './BlogListClient';

export const metadata = {
  title: 'Insights & Updates | Proof of Funds Nigeria',
  description: 'Read the latest guides and tips on obtaining Proof of Funds for your visa applications.',
};

export default function BlogList() {
  const posts = getAllPosts('posts');

  // Strip heavy content — only send lightweight metadata to the client
  const lightPosts = posts.map(({ slug, meta }) => ({
    slug,
    meta: {
      title: meta.title || '',
      excerpt: meta.description || meta.excerpt || '',
      image: meta.image || '',
      date: meta.date || '',
    },
  }));

  return (
    <div className="min-h-screen bg-[#F3F0FF] pb-24">
      {/* Header Section */}
      <div className="bg-[#2E1499] text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-blue-200 mb-4 font-medium uppercase tracking-wider flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> 
            <ChevronRight size={14} /> 
            <span>Insights & Updates</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Insights & Updates</h1>
          <p className="text-indigo-100 text-lg">
            get the latest proof of funds updates on our pages as we drop them
          </p>
        </div>
      </div>

      {/* Blog Grid Section */}
      <BlogListClient posts={lightPosts} />


    </div>
  );
}
