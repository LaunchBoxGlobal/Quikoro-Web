import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - quikoro",
  description: "",
};

export default function ContactPage() {
  return <ContactForm />;
}
