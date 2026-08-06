import type { Metadata } from "next";
import { MotionProvider } from "@/src/components/motion-provider";
import { StructuredData } from "@/src/components/seo/structured-data";
import { business } from "@/src/content/site-content";
import { absoluteUrl, siteUrl } from "@/src/lib/site-url";
import "./globals.css";

const defaultTitle = "Ambu Bar | Mobile Bartending and Beverage Services";
const defaultDescription =
  "Ambu Bar is a retired ambulance turned mobile beverage bar for weddings, festivals, corporate events, fundraisers, and private parties across Pennsylvania.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: business.name,
  title: {
    default: defaultTitle,
    template: "%s | Ambu Bar",
  },
  description: defaultDescription,
  keywords: [
    "mobile bar Pennsylvania",
    "wedding bartender Pennsylvania",
    "mobile bartending Berks County",
    "beer and wine service Pennsylvania",
    "ambulance bar",
    "event bar Reading PA",
    "mobile mocktail bar Pennsylvania",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    url: absoluteUrl("/"),
    siteName: business.name,
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Ambu Bar Thirst Responders mobile beverage bar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: absoluteUrl("/twitter-image"),
        width: 1200,
        height: 630,
        alt: "Ambu Bar Thirst Responders mobile beverage bar",
      },
    ],
  },
  category: "Mobile beverage service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-brand-black focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <StructuredData />
      </body>
    </html>
  );
}
