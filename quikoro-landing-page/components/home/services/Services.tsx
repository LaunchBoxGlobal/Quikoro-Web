"use client";

import { SERVICES } from "@/constants/services";
import { motion } from "motion/react";
import Image from "next/image";

export default function Services() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#0084AA] font-extrabold tracking-[0.2em] text-base uppercase mb-4"
          >
            Services
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-[52px] leading-tight font-extrabold text-[#000] mb-6 tracking-tight"
          >
            Every Service You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-[#5A7A89] max-w-2xl mx-auto text-[1.05rem] md:text-lg font-normal leading-relaxed"
          >
            From urgent repairs to regular maintenance browse
            <br className="hidden md:block" /> hundreds of verified
            professionals.
          </motion.p>
        </div>

        {/* Grid Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {SERVICES?.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-[0_2px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-gray-100 transition-all duration-300 ease-out flex flex-col items-start cursor-pointer group h-full"
            >
              {/* Icon */}
              <Image
                src={service?.icon}
                width={64}
                height={64}
                alt={service?.title}
                className="mb-5"
              />

              {/* Text Content */}
              <h4 className="text-[20px] font-extrabold text-[#0D2636] mb-2 transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-base leading-relaxed text-[#5A7A88] font-medium mb-8">
                {service.description}
              </p>

              {/* Badge */}
              <div className="mt-auto bg-[#00354409] px-3 py-1 rounded-full transition-colors duration-300">
                <span className="text-gray-600 text-[0.7rem] font-bold tracking-wide">
                  {service.jobs}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-[#0D2636] font-semibold text-lg md:text-[24px]">
            Looking for something else? We cover more than what's listed here
          </p>
        </motion.div>
      </div>
    </main>
  );
}
