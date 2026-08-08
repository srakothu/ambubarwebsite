import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/src/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/images/Ambubar55logo.jpeg")],
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/merchandise"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
