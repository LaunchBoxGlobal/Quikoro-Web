"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { customerSteps, providerSteps } from "@/constants/how-it-works";
import Image from "next/image";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"customers" | "providers">(
    "customers",
  );

  const steps = activeTab === "customers" ? customerSteps : providerSteps;

  return (
    <main className="min-h-screen flex items-center justify-center pb-10 pt-20 lg:py-20 lg:pt-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-10" id="How It Works">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#0084AA] font-extrabold tracking-[0.15em] text-base uppercase mb-4"
          >
            How it works
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-[52px] leading-tight font-extrabold text-[#003544] mb-6 tracking-tight"
          >
            Simple for everyone.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-[#5A7A89] max-w-2xl mx-auto text-lg font-normal leading-relaxed"
          >
            Whether you need help at home or want to grow a service business{" "}
            <br className="hidden lg:block" />
            quikoro makes it effortless.
          </motion.p>
        </div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="bg-[#E4EEF2] p-[6px] rounded-[16px] flex items-center">
            {(["customers", "providers"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3.5 rounded-[16px] text-sm font-semibold transition-colors duration-300 outline-none ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 gradient-bg rounded-[14px] shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Steps Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => (
                <motion.div
                  key={`${activeTab}-${step.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-[#00354414] transition-shadow duration-300 relative group flex flex-col items-start"
                >
                  <div className="w-[56px] h-[56px] bg-[#E6F3F5] rounded-2xl flex items-center justify-center mb-8 text-[#0D7B8A] group-hover:scale-110 group-hover:bg-gradient-to-r from-[#003544] to-[#0085aa] group-hover:text-white transition-all duration-300 ease-out">
                    <Image
                      src={step?.icon}
                      width={24}
                      height={14}
                      alt={step.title}
                      className="object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </div>
                  <h4 className="text-[20px] font-extrabold text-[#0D2636] mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed text-[0.95rem] font-medium">
                    {step.description}
                  </p>

                  {/* Desktop Arrow Connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 right-0.5 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8 gradient-bg border-[3px] border-white rounded-full items-center justify-center shadow-md z-20 translate-x-1/2">
                      <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
