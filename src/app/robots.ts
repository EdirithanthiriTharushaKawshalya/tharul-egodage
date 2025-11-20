import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin', // Tell Google NOT to index your admin page
    },
    sitemap: 'https://www.tharulegodage.com/sitemap.xml',
  };
}