import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/src/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/images/Ambubar55logo.jpeg")],
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/merchandise"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
