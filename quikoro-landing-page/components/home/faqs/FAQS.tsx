"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "@/constants/faqs";

export default function FAQSComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFCFD]">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#0084AA] font-extrabold tracking-[0.2em] text-base uppercase mb-4"
          >
            FAQ
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-[52px] leading-tight font-extrabold text-[#000] mb-6 tracking-tight"
          >
            Questions & Answers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5A7A89] max-w-2xl mx-auto text-[1.05rem] md:text-lg font-normal leading-relaxed"
          >
            Everything you need to know before your first booking.
          </motion.p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {FAQS?.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#FAFCFD] border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "border-[#0D7B8A]/20 shadow-[0_8px_30px_rgb(13,123,138,0.06)]"
                  : "border-[#0035441A] hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 md:px-7 py-5 flex items-center justify-between text-left transition-colors"
              >
                <span
                  className={`font-bold text-lg transition-colors duration-300 ${openIndex === index ? "text-[#0D2636]" : "text-[#0D2636]/80"}`}
                >
                  {faq.question}
                </span>
                <span className="text-[#0D7B8A] ml-4 shrink-0 transition-transform duration-300 ease-out">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 opacity-70" />
                  </motion.div>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 md:px-7 pb-6 pt-0 text-[#4A5568] text-16 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
