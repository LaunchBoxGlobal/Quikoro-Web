"use client";
import { Footer } from "@/components/global/Footer";
import BookingJourney from "@/components/home/bookingJourney/BookingJourney";
import BuiltForTrust from "@/components/home/builtForTrust/BuiltForTrust";
import CTA from "@/components/home/cta/CTA";
import FAQSComponent from "@/components/home/faqs/FAQS";
import Hero from "@/components/home/hero/Hero";
import HowItWorks from "@/components/home/howItWorks/HowItWorks";
import Services from "@/components/home/services/Services";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const target = sessionStorage.getItem("scrollTarget");
      if (!target) return;

      sessionStorage.removeItem("scrollTarget");

      // Wait for the page to fully render before scrolling
      const attemptScroll = (retries = 10) => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (retries > 0) {
          setTimeout(() => attemptScroll(retries - 1), 100);
        }
      };

      // Small initial delay to let Next.js hydrate the page
      setTimeout(() => attemptScroll(), 300);
    }
  }, [pathname]);
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
