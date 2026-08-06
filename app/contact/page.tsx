import type { Metadata } from "next";
import { ContactPage } from "@/src/components/contact/contact-page";
import { createPageMetadata } from "@/src/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Booking",
  description:
    "Contact Ambu Bar LLC about mobile beverage service for weddings, festivals, fundraisers, corporate events, and private parties in Pennsylvania.",
  path: "/contact",
  socialTitle: "Contact & Book Ambu Bar",
});

export default function ContactRoute() {
  return <ContactPage />;
}
