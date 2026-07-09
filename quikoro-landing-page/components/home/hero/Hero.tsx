import { ArrowRight, Home as HomeIcon } from "lucide-react";
import Header from "../../global/Header";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  return (
    <section className="w-full p-4 lg:p-10 xl:px-20 relative">
      <section
        id="Home"
        className={`relative w-full overflow-hidden pb-0 lg:pb-24 rounded-[32px]`}
        style={{
          background: "url('/hero-background-image.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="w-full max-w-7xl relative mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center px-5 pt-40">
          {/* ============ LEFT: COPY ============ */}
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white bg-transparent px-4 py-2 text-sm font-semibold text-white">
              <span className="h-[8px] w-[8px] rounded-full bg-white" />
              Home Services, Reimagined
            </div>

            <h1 className="hero-heading font-extrabold leading-[1] text-white tracking-tight">
              Your Home
              <br />
              <span className="gradient-text">Services,</span>
              <br />
              Sorted.
            </h1>

            <p className="mt-6 text-base md:text-lg leading-[1.6] text-white">
              Find verified plumbers, electricians, tutors, and more{" "}
              <br className="hidden lg:block" /> near you. Book directly, chat
              once confirmed, pay after <br className="hidden lg:block" /> the
              job's done.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#" className="white-btn">
                Download App
              </a>
              <a href="#" className="white-outlined-btn">
                Become a Provider
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ============ RIGHT: PHONE MOCKUPS ============ */}
          <HeroAnimation />
        </div>
      </section>
    </section>
  );
}
