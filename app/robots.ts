import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.khanbuilds.tech";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      // Googlebot specific rules
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Bingbot specific rules  
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Allow social media crawlers full access
      {
        userAgent: "Twitterbot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
        crawlDelay: 0,
      },
      // AI/ML crawlers with controlled access
      {
        userAgent: "GPTBot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
