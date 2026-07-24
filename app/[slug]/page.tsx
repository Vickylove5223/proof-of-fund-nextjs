import { getPostBySlug, getPostSlugs, markdownToHtml } from '../../lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const pages = getPostSlugs('pages');
  return pages.map((page) => ({
    slug: page.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const page = getPostBySlug(slug, 'pages');
    return {
      title: page.meta.seo_title ? `${page.meta.seo_title} | Proof of Funds Nigeria` : `${page.meta.title} | Proof of Funds Nigeria`,
      description: page.meta.description || `Information about ${page.meta.title}`,
    };
  } catch (e) {
    return { title: 'Page Not Found' };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const page = getPostBySlug(slug, 'pages');
    const contentHtml = await markdownToHtml(page.content || '');

    return (
      <div className="bg-[#F3F0FF] min-h-screen">
        {/* Full-width brand hero section */}
        <section className="bg-[#2E1499] text-white pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {page.meta.title}
            </h1>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-6 pt-16 pb-20">
          <div 
            className="prose prose-slate prose-lg max-w-none text-slate-800 prose-p:leading-relaxed prose-p:mb-6 prose-headings:mt-12 prose-headings:mb-6 prose-li:mb-2 prose-img:w-full prose-img:rounded-2xl prose-img:shadow-lg prose-img:object-cover"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </article>
      </div>
    );
  } catch (e) {
    notFound();
  }
}
