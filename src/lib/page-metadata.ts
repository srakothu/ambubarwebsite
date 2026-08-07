import type { Metadata } from "next";
import { business } from "@/src/content/site-content";

interface PageMetadataOptions {
  title: string;
  socialTitle: string;
  description: string;
  path: `/${string}`;
}

const socialImage = {
  url: "/opengraph-image",
  alt: "Ambu Bar Thirst Responders mobile beverage bar",
};

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
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: path,
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
