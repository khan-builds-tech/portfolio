import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amankhan.dev";
  
  // Last content update date
  const lastUpdated = new Date("2026-01-11");

  return [
    // Main portfolio page (single-page app - all content is here)
    {
      url: siteUrl,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Section anchors for better crawling (Google can index these)
    {
      url: `${siteUrl}/#experience`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#projects`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#knowledge-sharing`,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#skills`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#achievements`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#contact`,
      lastModified: lastUpdated,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    // Resume PDF (important for recruiters)
    {
      url: `${siteUrl}/AmanKhan_Resume.pdf`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
