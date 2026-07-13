import type { Metadata } from "next";
import { MotionProvider } from "@/src/components/motion-provider";
import { StructuredData } from "@/src/components/seo/structured-data";
import { business } from "@/src/content/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  applicationName: business.name,
  title: {
    default: "Ambu Bar | Pennsylvania Mobile Beverage Bar",
    template: "%s | Ambu Bar",
  },
  description:
    "Ambu Bar is a retired ambulance turned mobile beverage bar for weddings, festivals, corporate events, fundraisers, and private parties across Pennsylvania.",
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
    canonical: "/",
  },
  openGraph: {
    title: "Ambu Bar | Pennsylvania Mobile Beverage Bar",
    description:
      "For all of your beverage emergencies, call on us, your Thirst Responders.",
    type: "website",
    url: "/",
    siteName: business.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ambu Bar | Pennsylvania Mobile Beverage Bar",
    description:
      "For all your beverage emergencies, call on us, your Thirst Responders.",
    images: [{ url: "/opengraph-image", alt: "Ambu Bar Thirst Responders mobile beverage bar" }],
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
