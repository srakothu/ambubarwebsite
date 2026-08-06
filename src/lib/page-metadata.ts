import type { Metadata } from "next";
import { absoluteUrl } from "@/src/lib/site-url";

const socialImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: "Ambu Bar Thirst Responders mobile beverage bar",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: `/${string}` | "/";
  socialTitle?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = title,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "Ambu Bar LLC",
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
