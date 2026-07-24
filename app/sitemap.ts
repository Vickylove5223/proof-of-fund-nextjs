import { MetadataRoute } from 'next';
import { getPostSlugs } from '../lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://proofoffund.com.ng';
  
  const posts = getPostSlugs('posts').map((slug) => ({
    url: `${baseUrl}/guides/${slug.replace(/\.md$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const pages = getPostSlugs('pages').map((slug) => ({
    url: `${baseUrl}/${slug.replace(/\.md$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...posts,
    ...pages,
  ];
}
