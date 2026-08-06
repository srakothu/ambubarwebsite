import type { MetadataRoute } from "next";
import { business } from "@/src/content/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${business.website}/sitemap.xml`,
    host: business.website,
  };
}
