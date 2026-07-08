"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function CTA() {
  return (
    <main className="min-h-screen pb-12 pt-20 px-4 lg:px-8 flex items-center justify-center overflow-hidden">
      <div
        className="w-full max-w-7xl mx-auto rounded-[2.5rem] px-6 py-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
        style={{
          background: "url('/cta-background.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Left Content */}
        <div className="relative z-30 w-full lg:w-[45%] flex flex-col items-start xl:pl-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 mb-6 backdrop-blur-md"
          >
            <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
              ✦ DOWNLOAD QUIKORO
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl leading-[1] lg:text-[48px] font-bold text-white tracking-tight mb-6"
          >
            Ready to Get <br className="hidden md:block" /> Things Done Faster?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-white/90 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-normal"
          >
            Download Quikoro, find a verified provider near you, and book in
            minutes. Chat opens once your booking is confirmed, and you pay in
            cash only after the job&apos;s done.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex items-center gap-3 sm:gap-4 w-full flex-wrap"
          >
            {/* Google Play Button */}
            <button className="shrink-0 w-[140px] sm:w-[160px] md:w-[187px]">
              <Image
                src="/google-play-button.svg"
                alt="google play button to download quikoro mobile app from google play store"
                width={187}
                height={55}
                className="w-full h-auto object-contain"
              />
            </button>

            {/* App Store Button */}
            <button className="shrink-0 w-[130px] sm:w-[150px] md:w-[175px]">
              <Image
                src="/app-store-button.svg"
                alt="app store button to download quikoro mobile app from app store"
                width={175}
                height={55}
                className="w-full h-auto object-contain"
              />
            </button>
          </motion.div>
        </div>

        {/* Right Visuals — one fluid "stage", everything inside scales together */}
        <div className="relative z-10 w-full lg:w-[55%] flex justify-center items-center mt-8 lg:mt-0">
          <div
            className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[460px] xl:max-w-[500px]"
            style={{ aspectRatio: "9 / 10" }}
          >
            {/* Phone 2 (Back - Service Details) */}
            <motion.div
              initial={{ opacity: 0, x: "8%", y: "4%" }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -right-10 lg:right-0 top-[6%] lg:top-[12%] w-[78%] lg:w-[68%] z-10"
            >
              <Image
                src="/service-details-screen.svg"
                alt="service-details-screen"
                width={377}
                height={512}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 45vw, 380px"
              />
            </motion.div>

            {/* Phone 1 (Front - Role Selector) */}
            <motion.div
              initial={{ opacity: 0, y: "6%", x: "-6%" }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute left-10 top-0 lg:top-10 w-[52%] lg:w-[45%] z-20"
            >
              <Image
                src="/quikoro-role-selector-screen.svg"
                alt="quikoro-role-selector-screen"
                width={347}
                height={512}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 36vw, 290px"
              />
            </motion.div>

            {/* User with items — now nested in the same stage, so it scales with it */}
            <motion.div
              initial={{ opacity: 0, x: "8%", y: "4%" }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-[-15%] md:-bottom-[12%] -left-10 md:-left-[30%] lg:left-[-30%] w-[60%] md:w-[58%] z-30"
            >
              <Image
                src="/user-with-items.svg"
                alt="user-with-items"
                width={377}
                height={512}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 34vw, 280px"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
