import { motion } from "motion/react";
import { Shield, Sliders, UserPlus, Star, Lock, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Smart quikoroing",
      description:
        "Our facial recognition engine analyzes your photos and suggests visually similar users with a percentage match score.",
    },
    {
      icon: <Lock className="w-6 h-6 text-white" />,
      title: "Privacy Control",
      description:
        "Live photo verification ensures that every user is real, reducing fake accounts and improving trust.",
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Secure Chat",
      description:
        "Only matched users can chat. Conversations remain private and protected with secure messaging.",
    },
    {
      icon: <Sliders className="w-6 h-6 text-white" />,
      title: "Detailed Profile Personalization",
      description:
        "Showcase your personality through prompts, interests, lifestyle preferences, and curated profile details.",
    },
    {
      icon: <UserPlus className="w-6 h-6 text-white" />,
      title: "Guided Onboarding",
      description:
        "Multi-step onboarding collects meaningful data to improve compatibility and lookalike detection.",
    },
    {
      icon: <Star className="w-6 h-6 text-white" />,
      title: "Premium quikoro Insights",
      description:
        "Unlock advanced similarity results, unlimited swipes, and full chat access with premium features.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto padding-x">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to discover{" "}
            <span className="gradient-text">your quikoro</span>
          </h2>
          <p className="text-lg text-gray-600 lg:max-w-[620px] text-center mx-auto">
            Built with intelligent matching, facial recognition, and secure
            verification to create authentic and meaningful connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-md bg-white/80 p-8 rounded-2xl border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-[1.3]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
