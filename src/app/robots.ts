import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/my-prompts', '/api/'],
      },
    ],
    sitemap: 'https://www.prompt-architect.io/sitemap.xml',
  }
}
