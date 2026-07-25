import { getPostBySlug, getPostSlugs, markdownToHtml, getAllPosts } from '../../lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PostIntroCTA from '../components/PostIntroCTA';
import PostOutroCTA from '../components/PostOutroCTA';

export async function generateStaticParams() {
  const pages = getPostSlugs('pages');
  const posts = getPostSlugs('posts');
  return [...pages, ...posts].map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const page = getPostBySlug(slug, 'pages');
    const title = page.meta.seo_title || page.meta.title;
    const description = page.meta.description || `Information about ${page.meta.title}`;
    return {
      title: `${title} | Proof of Funds Nigeria`,
      description,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title,
        description,
        url: `/${slug}`,
        type: 'website',
        images: page.meta.image ? [{ url: page.meta.image }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: page.meta.image ? [page.meta.image] : undefined,
      },
    };
  } catch (e) {
    try {
      const post = getPostBySlug(slug, 'posts');
      const title = post.meta.seo_title || post.meta.title;
      const description = post.meta.description || `Read about ${post.meta.title}`;
      return {
        title: `${title} | Proof of Funds Nigeria`,
        description,
        alternates: { canonical: `/${slug}` },
        openGraph: {
          title,
          description,
          url: `/${slug}`,
          type: 'article',
          images: post.meta.image ? [{ url: post.meta.image }] : undefined,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: post.meta.image ? [post.meta.image] : undefined,
        },
      };
    } catch (e2) {
      return { title: 'Page Not Found' };
    }
  }
}

function PageView({ page, contentHtml }: { page: any; contentHtml: string }) {
  return (
    <div className="bg-[#F3F0FF] min-h-screen">
      <section className="bg-[#2E1499] text-white pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {page.meta.title}
          </h1>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-6 pt-16 pb-20">
        <div
          className="prose prose-slate prose-lg max-w-none text-slate-800 prose-p:leading-relaxed prose-p:mb-6 prose-headings:mt-12 prose-headings:mb-6 prose-li:mb-2 [&_li::marker]:text-[#2E1499] prose-img:w-full prose-img:rounded-2xl prose-img:object-cover prose-blockquote:bg-[#2E1499]/5 prose-blockquote:border-l-4 prose-blockquote:border-[#2E1499] prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}

// Splits post HTML at a safe block-level boundary near the midpoint, so a CTA
// can be inserted mid-article instead of only ever appearing after all content.
function splitContentForMidCta(html: string): [string, string] {
  const boundaryRe = /<\/(p|ul|ol|blockquote|h2|h3|h4)>/g;
  const target = html.length / 2;
  let best = -1;
  let bestDist = Infinity;
  let m;
  while ((m = boundaryRe.exec(html))) {
    const pos = m.index + m[0].length;
    const dist = Math.abs(pos - target);
    if (dist < bestDist) {
      bestDist = dist;
      best = pos;
    }
  }
  if (best === -1) return [html, ''];
  return [html.slice(0, best), html.slice(best)];
}

function PostView({ post, contentHtml, relatedPosts }: { post: any; contentHtml: string; relatedPosts: any[] }) {
  const [firstHalf, secondHalf] = splitContentForMidCta(contentHtml);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.description || post.meta.title,
    image: post.meta.image ? [`https://proofoffund.com.ng${post.meta.image}`] : undefined,
    author: { '@type': 'Person', name: 'Victoria Ajetomobi' },
    publisher: {
      '@type': 'Organization',
      name: 'Proof of Funds Nigeria',
      logo: { '@type': 'ImageObject', url: 'https://proofoffund.com.ng/logo.png' },
    },
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://proofoffund.com.ng/${post.slug}` },
  };
  return (
    <div className="bg-[#F3F0FF] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        {post.meta.image && (
          <img
            src={post.meta.image}
            alt={post.meta.title}
            className="w-full h-auto max-h-[420px] object-cover rounded-2xl mb-10"
          />
        )}

        <PostIntroCTA />

        <div
          className="prose prose-slate prose-lg max-w-none text-slate-800 prose-p:leading-relaxed prose-p:mb-6 prose-headings:mt-12 prose-headings:mb-6 prose-li:mb-2 [&_li::marker]:text-[#2E1499] prose-img:w-full prose-img:rounded-2xl prose-img:object-cover prose-blockquote:bg-[#2E1499]/5 prose-blockquote:border-l-4 prose-blockquote:border-[#2E1499] prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6"
          dangerouslySetInnerHTML={{ __html: firstHalf }}
        />

        <PostOutroCTA />

        {secondHalf && (
          <div
            className="prose prose-slate prose-lg max-w-none text-slate-800 mb-20 prose-p:leading-relaxed prose-p:mb-6 prose-headings:mt-12 prose-headings:mb-6 prose-li:mb-2 [&_li::marker]:text-[#2E1499] prose-img:w-full prose-img:rounded-2xl prose-img:object-cover prose-blockquote:bg-[#2E1499]/5 prose-blockquote:border-l-4 prose-blockquote:border-[#2E1499] prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6"
            dangerouslySetInnerHTML={{ __html: secondHalf }}
          />
        )}

        <div className="mt-16 bg-white rounded-3xl p-8 border-[3px] border-[#120E00] shadow-[-8px_8px_0px_#120E00] flex flex-col md:flex-row items-center md:items-start gap-6">
          <img src="/victoria-avatar.jpg" alt="Victoria Ajetomobi" className="w-24 h-24 rounded-full object-cover border-[3px] border-[#120E00] shadow-sm" />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-[#120E00] mb-2 font-serif">Victoria Ajetomobi</h3>
            <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
              Victoria is an expert study abroad and visa consultant with years of experience helping Nigerian students and professionals navigate complex proof of funds requirements.
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
                <div key={rp.slug} className="bg-[#F3F0FF] rounded-3xl overflow-hidden border-[3px] border-[#120E00] shadow-[-10px_10px_0px_#120E00] flex flex-col h-full text-left">
                  {rp.meta.image && (
                    <img src={rp.meta.image} alt={rp.meta.title} className="w-full h-48 object-cover border-b-[3px] border-[#120E00]" />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="font-bold font-serif text-[1.25rem] text-[#120E00] mb-3 leading-tight tracking-wide">
                      <Link href={`/${rp.slug}`} className="hover:text-[#2E1499] transition-colors">
                        {rp.meta.title}
                      </Link>
                    </h4>
                    <p className="text-[15px] text-[#120E00] leading-relaxed mb-6 flex-grow">
                      {rp.meta.excerpt || "Comprehensive guide and updates regarding proof of funds processing, requirements, and insights for Nigerian students..."}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/${rp.slug}`} className="text-sm font-black text-[#2E1499] uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center gap-1 w-max">
                        READ MORE <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const page = getPostBySlug(slug, 'pages');
    const contentHtml = await markdownToHtml(page.content || '');
    return <PageView page={page} contentHtml={contentHtml} />;
  } catch (e) {
    // not a page — fall through to try posts
  }

  try {
    const post = getPostBySlug(slug, 'posts');
    const contentHtml = await markdownToHtml(post.content || '');
    const allPosts = getAllPosts('posts');
    const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
    return <PostView post={post} contentHtml={contentHtml} relatedPosts={relatedPosts} />;
  } catch (e) {
    notFound();
  }
}
