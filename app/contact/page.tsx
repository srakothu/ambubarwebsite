import type { Metadata } from "next";
import { ContactPage } from "@/src/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ambu Bar LLC for mobile bar service from a converted ambulance for weddings, festivals, and community events in Pennsylvania.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ambu Bar LLC",
    description: "Reach out to book Ambu Bar for your next wedding, festival, fundraiser, or private celebration.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
