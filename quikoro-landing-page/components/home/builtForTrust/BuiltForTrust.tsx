"use client";

import { motion } from "motion/react";
import { features } from "@/constants/builtForTrust";
import Image from "next/image";

export default function BuiltForTrust() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#0084AA] font-extrabold tracking-[0.15em] text-base uppercase mb-4"
          >
            Built for Trust
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-[52px] leading-tight font-extrabold text-[#003544] mb-6 tracking-tight"
          >
            Safe. Secure. Verified.
          </motion.h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={`relative overflow-hidden group trust-card rounded-[2rem] p-8 md:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(13,123,138,0.15)] transition-all duration-500 ease-out flex flex-col items-start min-h-[300px] w-full ${
                index === 0
                  ? "col-span-12 lg:col-span-7"
                  : index === 1
                    ? "col-span-12 lg:col-span-5"
                    : index === 2
                      ? "col-span-12 lg:col-span-5"
                      : index === 3
                        ? "col-span-12 lg:col-span-7"
                        : index === 4
                          ? "col-span-12 lg:col-span-7"
                          : "col-span-12 lg:col-span-5"
              }`}
            >
              <Image
                src={"/trust-card-boxes.svg"}
                alt="trust-card-boxes"
                width={212}
                height={185}
                className="w-full h-full absolute top-0 right-[-30%] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 z-0 object-contain"
              />
              {/* Content Container */}
              <div className="relative z-10 w-full flex flex-col h-full">
                {/* Icon */}
                <div className="w-14 h-14 bg-[#E6F3F5] rounded-[1.25rem] flex items-center justify-center mb-6 text-[#0D7B8A] group-hover:bg-white group-hover:text-[#0D7B8A] transition-all duration-500">
                  <Image
                    src={feature.icon}
                    width={24}
                    height={24}
                    alt={feature.title}
                  />
                </div>

                {/* Badge */}
                <div className="bg-[#E6F3F5] px-3 py-1 rounded-full mb-5 w-fit group-hover:bg-[#0084AA33] transition-colors duration-500">
                  <span className="text-[#0D7B8A] group-hover:text-white text-xs font-extrabold tracking-wider uppercase transition-colors duration-500">
                    {feature.badge}
                  </span>
                </div>

                {/* Text Content */}
                <h4 className="text-[20px] font-extrabold text-[#0D2636] group-hover:text-white mb-3 transition-colors duration-500">
                  {feature.title}
                </h4>
                <p className="text-gray-500 group-hover:text-white/90 leading-relaxed text-[0.95rem] font-medium transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
