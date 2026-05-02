import { MetadataRoute } from 'next'
import { ARTICLES } from './lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.prompt-architect.io'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                          lastModified: now,  changeFrequency: 'weekly',  priority: 1 },
    { url: `${baseUrl}/generate`,            lastModified: now,  changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/library`,             lastModified: now,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`,             lastModified: now,  changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`,                lastModified: now,  changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${baseUrl}/faq`,                 lastModified: now,  changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`,             lastModified: now,  changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${baseUrl}/login`,               lastModified: now,  changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${baseUrl}/legal`,               lastModified: now,  changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/cgv`,                 lastModified: now,  changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/remboursement`,       lastModified: now,  changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const blogPages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
