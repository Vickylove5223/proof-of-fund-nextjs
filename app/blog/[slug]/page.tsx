import { getPostBySlug, getPostSlugs, markdownToHtml, getAllPosts } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PostIntroCTA from '../../components/PostIntroCTA';
import PostOutroCTA from '../../components/PostOutroCTA';

export async function generateStaticParams() {
  const posts = getPostSlugs('posts');
  return posts.map((post) => ({
    slug: post.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug, 'posts');
    return {
      title: `${post.meta.title} | Proof of Funds Nigeria`,
      description: `Read about ${post.meta.title}`,
    };
  } catch (e) {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug, 'posts');
    const contentHtml = await markdownToHtml(post.content || '');
    
    // Get related posts (exclude current)
    const allPosts = getAllPosts('posts');
    const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

    return (
      <div className="bg-[#F3F0FF] min-h-screen">
        {/* Full-width brand hero section */}
        <section className="bg-[#2E1499] text-white pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {post.meta.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/80 font-medium text-sm">
              <div className="flex items-center gap-2">
                <img src="/victoria-avatar.jpg" alt="Victoria Ajetomobi" className="w-8 h-8 rounded-full object-cover shadow-sm border border-white/50" />
                <span>By Victoria Ajetomobi</span>
              </div>
              <span>•</span>
              <time dateTime={new Date().toISOString()}>
                Last Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </time>
            </div>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 pt-16 pb-16">
          <PostIntroCTA />
          
          <div 
            className="prose prose-slate prose-lg max-w-none text-slate-800 mb-20 prose-p:leading-relaxed prose-p:mb-6 prose-headings:mt-12 prose-headings:mb-6 prose-li:mb-2 prose-img:w-full prose-img:rounded-2xl prose-img:shadow-lg prose-img:object-cover"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
          
          <PostOutroCTA />
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-bold text-[#120E00] mb-10 text-center">More Insights & Updates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {relatedPosts.map((rp) => (
                  <div key={rp.slug} className="flex flex-col">
                    <h4 className="text-lg font-bold text-[#120E00] leading-snug mb-3">
                      <Link href={`/blog/${rp.slug}`} className="hover:text-[#2E1499] transition-colors">
                        {rp.meta.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                      {rp.meta.excerpt || "Comprehensive guide and updates regarding proof of funds processing, requirements, and insights for Nigerian students..."}
                    </p>
                    <Link href={`/blog/${rp.slug}`} className="text-xs font-bold text-[#2E1499] uppercase tracking-wider hover:underline flex items-center gap-1 w-max">
                      Read More <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  } catch (e) {
    notFound();
  }
}
