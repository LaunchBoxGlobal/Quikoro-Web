import { motion } from "motion/react";
import { Heart, MessageCircle, Apple, Play } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative"
    >
      <img
        src="/circle.png"
        alt="circle"
        width={124}
        height={150}
        className="absolute right-0 top-40 z-0"
      />
      <div className="max-w-7xl mx-auto padding-x relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
              Find people who match your vibe and{" "}
              <span className="gradient-text">your looks.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover meaningful connections through shared interests and
              facial similarity. quikoro blends smart matchmaking with advanced
              facial recognition to help you connect with compatible matches and
              visually similar people around you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 gradient-bg text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors">
                <Apple className="w-5 h-5" />
                <span>App Store</span>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white custom-shadow text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors">
                <Play className="w-5 h-5" />
                <span>Google Play</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Phone Mockup */}
            <div className="relative mx-auto w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
              <img
                src="/person.png"
                alt="App Interface"
                className="w-full h-full object-cover opacity-100"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -left-4 sm:-left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">New Message</p>
                <p className="text-sm font-bold text-gray-900">
                  "Hey! I want this service"
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-40 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                {/* <Heart className="w-5 h-5 text-pink-600 fill-current" /> */}
                <MessageCircle className="w-5 h-5 text-pink-600 fill-current" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Replied</p>
                <p className="text-sm font-bold text-gray-900">
                  You and Alex started a job
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
