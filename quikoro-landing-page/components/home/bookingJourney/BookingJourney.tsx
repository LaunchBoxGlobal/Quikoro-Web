"use client";
import { BOOKING_JOURNEY } from "@/constants/bookingJourney";
import Image from "next/image";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export default function BookingJourney() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <main className="min-h-screen bg-[#F9FBFC] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div
        className="max-w-7xl w-full rounded-[2.5rem] p-8 md:p-14 lg:p-20 relative overflow-hidden shadow-[0_20px_60px_rgb(4,47,55,0.2)]"
        style={{
          backgroundImage: "url('/booking-journey-background-image.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div ref={sectionRef} className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white font-extrabold tracking-[0.2em] text-base uppercase mb-4"
            >
              The Booking Journey
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-[52px] leading-tight font-extrabold text-[#fff] mb-6 tracking-tight"
            >
              Five steps to sorted.
            </motion.h2>
          </div>

          {/* Timeline Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            className="flex flex-col gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            {BOOKING_JOURNEY.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      delayChildren: index * 0.8,
                    },
                  },
                }}
                className="flex gap-5 md:gap-8 group items-stretch"
              >
                {/* Left Column: Icon & Connecting Line */}
                <div className="relative flex flex-col items-center w-12 md:w-14 shrink-0 mt-10">
                  <div className="relative flex justify-center z-10">
                    {/* Green icon */}
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={94}
                      height={94}
                      className="object-contain"
                    />

                    {/* White icon */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{
                        delay: index * 1.05,
                        duration: 1.5,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={step.whiteIcon}
                        alt={step.title}
                        width={94}
                        height={94}
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  {/* Connecting Line Segment (hidden on last item) */}
                  {index < BOOKING_JOURNEY.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[44px] md:top-[46px] bottom-[-68px] md:bottom-[-86px] w-[2px] overflow-hidden z-0">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={
                          isInView
                            ? {
                                scaleY: 1,
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.8,
                          delay: index * 0.8,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-[#1597ad] origin-top"
                      />
                    </div>
                  )}
                </div>

                {/* Right Column: Content Card */}
                <motion.div
                  initial={{
                    opacity: 0,
                    // x: -20,
                    borderColor: "#0084AA",
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          // x: 0,
                          borderColor: "#00C6FF",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.8,
                    ease: "easeInOut",
                  }}
                  className="flex-1 border-2 rounded-2xl p-5 md:p-6 bg-transparent backdrop-blur-sm hover:border-[#0084AA] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <span className="text-white/80 tracking-[0.15em] text-[0.65rem] md:text-xs font-bold uppercase mb-1.5 block">
                    {step.badge}
                  </span>
                  <h4 className="text-white text-[1.1rem] md:text-xl font-bold mb-2">
                    {step.title}
                  </h4>
                  <p className="text-white/70 text-sm md:text-[0.95rem] leading-relaxed font-medium">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
