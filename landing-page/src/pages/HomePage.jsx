import { useLocation } from "react-router-dom";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Patent from "../components/Patent";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // small delay ensures DOM is ready
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img
        src="/left-top-circle.png"
        alt="left-top-circle"
        width={150}
        height={190}
        className="absolute top-0 left-0 z-0"
      />

      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Patent />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
