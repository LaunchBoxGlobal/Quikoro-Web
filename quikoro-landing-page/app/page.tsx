import { Footer } from "@/components/global/Footer";
import BookingJourney from "@/components/home/bookingJourney/BookingJourney";
import BuiltForTrust from "@/components/home/builtForTrust/BuiltForTrust";
import CTA from "@/components/home/cta/CTA";
import FAQSComponent from "@/components/home/faqs/FAQS";
import Hero from "@/components/home/hero/Hero";
import HowItWorks from "@/components/home/howItWorks/HowItWorks";
import Services from "@/components/home/services/Services";

export const metadata = {
  title: "quikoro",
  description: "",
};

export default function Home() {
  return (
    <main className="relative ">
      <Hero />
      <HowItWorks />
      <BuiltForTrust />
      <BookingJourney />
      <Services />
      <CTA />
      <FAQSComponent />
      <Footer />
    </main>
  );
}
