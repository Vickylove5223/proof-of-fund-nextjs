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
      title: post.meta.seo_title ? `${post.meta.seo_title} | Proof of Funds Nigeria` : `${post.meta.title} | Proof of Funds Nigeria`,
      description: post.meta.description || `Read about ${post.meta.title}`,
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

          {/* Author Bio */}
          <div className="mt-16 bg-white rounded-3xl p-8 border-[3px] border-[#120E00] shadow-[-8px_8px_0px_#120E00] flex flex-col md:flex-row items-center md:items-start gap-6">
            <img src="/victoria-avatar.jpg" alt="Victoria Ajetomobi" className="w-24 h-24 rounded-full object-cover border-[3px] border-[#120E00] shadow-sm" />
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-[#120E00] mb-2 font-serif">Victoria Ajetomobi</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                Victoria is an expert study abroad and visa consultant with years of experience helping Nigerian students and professionals navigate complex proof of funds requirements. She specializes in legally structured financial solutions for Canada, UK, US, and Schengen visas.
              </p>
              <a href="https://wa.me/2348103669924" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#2E1499] text-white px-6 py-2 rounded-full font-bold text-sm border-[2px] border-[#120E00] hover:shadow-[-4px_4px_0px_#120E00] transition-all">
                Chat with Victoria
              </a>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-bold text-[#120E00] mb-10 text-center">More Insights & Updates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {relatedPosts.map((rp) => (
                  <div key={rp.slug} className="bg-[#F3F0FF] rounded-3xl p-6 overflow-hidden border-[3px] border-[#120E00] shadow-[-10px_10px_0px_#120E00] flex flex-col h-full text-left">
                    <h4 className="font-bold font-serif text-[1.25rem] text-[#120E00] mb-3 leading-tight tracking-wide">
                      <Link href={`/guides/${rp.slug}`} className="hover:text-[#2E1499] transition-colors">
                        {rp.meta.title}
                      </Link>
                    </h4>
                    <p className="text-[15px] text-[#120E00] leading-relaxed mb-6 flex-grow">
                      {rp.meta.excerpt || "Comprehensive guide and updates regarding proof of funds processing, requirements, and insights for Nigerian students..."}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/guides/${rp.slug}`} className="text-sm font-black text-[#2E1499] uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center gap-1 w-max">
                        READ MORE <ChevronRight size={14} />
                      </Link>
                    </div>
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
