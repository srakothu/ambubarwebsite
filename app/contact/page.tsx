import { ContactPage } from "@/src/components/contact/contact-page";
import { createPageMetadata } from "@/src/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  socialTitle: "Contact Ambu Bar LLC",
  description:
    "Contact Ambu Bar LLC for mobile bar service from a converted ambulance for weddings, festivals, and community events in Pennsylvania.",
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
