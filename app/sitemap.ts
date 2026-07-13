import type { MetadataRoute } from "next";
import { business } from "@/src/content/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: business.website,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${business.website}/images/Ambubar55logo.jpeg`],
    },
    {
      url: `${business.website}/contact`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${business.website}/merchandise`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
