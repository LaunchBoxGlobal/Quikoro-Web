import { FileCheck } from "lucide-react";
import React from "react";

const Patent = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f7ff] to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F61F2]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5F61F2]/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-[16px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-8">
          <FileCheck className="text-[#0084AA]" size={32} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Patent Pending Technology
        </h2>

        <p className="text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
          LookALike incorporates proprietary facial similarity matching
          technology that is the subject of a pending patent application. This
          technology helps deliver accurate lookalike comparisons while
          supporting the unique matching experience provided through the
          platform.
        </p>
      </div>
    </section>
  );
};

export default Patent;
