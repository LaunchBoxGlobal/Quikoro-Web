import { motion } from "motion/react";
import { Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description:
        "Upload 3–6 photos, add your bio, interests, and personal details to build your identity.",
    },
    {
      number: "02",
      title: "Verify your identity",
      description:
        "Take a live photo. Our system confirms authenticity and improves facial similarity accuracy.",
    },
    {
      number: "03",
      title: "Discover services",
      description:
        "Browse profiles based on compatibility, location, and facial similarity percentage.",
    },
    {
      number: "04",
      title: "Send a booking request & start the service",
      description:
        "Mutual likes create a match. Connect instantly and begin meaningful conversations.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto padding-x">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase text-[#5E51C9] mb-2">
              How It Works
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your quikoro journey starts here
            </h3>
            <p className="text-lg text-gray-600 mb-10">
              Getting started is simple. Follow these steps to find compatible
              matches and discover people who look like you.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full backdrop-blur-md gradient-bg flex items-center justify-center">
                    <span className="text-[#fff] font-bold">{step.number}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <div className="w-full">
              <img
                src="/girl-standing-for-photoshoot.png"
                alt="girl-standing-for-photoshoot"
                className="w-full max-w-[90%] mx-auto h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-gray-900">5.0</span>
              </div>
              <p className="text-sm text-gray-600 italic">
                "Met my fiancé on quikoro within a week of downloading. Best
                decision ever!"
              </p>
              <p className="text-xs font-bold text-gray-900 mt-2">
                — Jessica M.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
