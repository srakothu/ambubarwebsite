import type { Metadata } from "next";
import { business } from "@/src/content/site-content";
import { absoluteUrl } from "@/src/lib/site-url";

interface PageMetadataOptions {
  title: string;
  socialTitle: string;
  description: string;
  path: `/${string}`;
}

export const socialImage = {
  url: absoluteUrl("/opengraph-image"),
  alt: "Ambu Bar Thirst Responders mobile beverage bar for Pennsylvania events",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

export function createPageMetadata({
  title,
  socialTitle,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: absoluteUrl(path),
      siteName: business.name,
      locale: "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
