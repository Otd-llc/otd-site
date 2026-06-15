import type { MetadataRoute } from 'next'

const BASE = 'https://onethousanddrones.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: BASE, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/academy`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
