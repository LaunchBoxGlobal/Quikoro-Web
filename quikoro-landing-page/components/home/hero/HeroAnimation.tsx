"use client";

import { motion } from "motion/react";
import styles from "./hero.module.css";
import Image from "next/image";

const HeroAnimation = () => {
  const phoneVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const secondPhoneVariants = {
    hidden: {
      opacity: 0,
      x: -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = (delay: number, duration: number = 3.5) => ({
    initial: {
      opacity: 0,
      y: 15,
    },
    animate: {
      opacity: 1,
      y: [-15, 15],
    },
    transition: {
      opacity: {
        delay,
        duration: 0.5,
        ease: "easeOut",
      },
      y: {
        delay,
        duration,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    },
  });

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[560px] sm:h-[600px] flex items-center justify-center lg:mt-10 lg:right-5">
      {/* Main Phone */}
      <motion.div variants={phoneVariants} initial="hidden" animate="visible">
        <Image
          src="/quikoro-home-screen.svg"
          alt="quikoro home screen mockup"
          width={402}
          height={698}
          className={`object-contain relative z-10 w-[30vw] ${styles.centeredImage}`}
        />
      </motion.div>

      {/* Second Phone */}
      <motion.div
        variants={secondPhoneVariants}
        initial="hidden"
        animate="visible"
        className="absolute right-[-5%] md:right-[0%] lg:right-[-10%] xl:right-[-20%] top-[14%] lg:top-[18%] xl:top-[1%]"
      >
        <Image
          src="/quikoro-service-details-screen.svg"
          alt="quikoro-service-details-screen"
          width={363}
          height={593}
          className={`object-contain ${styles.rightImage}`}
        />
      </motion.div>

      {/* Plumbing */}
      <motion.div
        {...floatingAnimation(1.6, 3.2)}
        whileHover={{ scale: 1.05 }}
        className="absolute right-[-12%] top-[-10%] z-10 hidden lg:block"
      >
        <Image
          src="/plumbing-pill.svg"
          alt="plumbing-pill"
          width={227}
          height={139}
          className="object-contain"
        />
      </motion.div>

      {/* Electrical */}
      <motion.div
        {...floatingAnimation(1.8, 3.8)}
        whileHover={{ scale: 1.05 }}
        className="absolute left-[-4%] top-[30%] z-10 hidden lg:block"
      >
        <Image
          src="/electrical-service-pill.svg"
          alt="electrical-service-pill"
          width={242}
          height={139}
          className="object-contain"
        />
      </motion.div>

      {/* Rating */}
      <motion.div
        {...floatingAnimation(2.0, 3.4)}
        whileHover={{ scale: 1.05 }}
        className="absolute left-[-23%] bottom-[30%] z-10 hidden lg:block"
      >
        <Image
          src="/rating-card.svg"
          alt="rating-card"
          width={271}
          height={163}
          className="object-contain"
        />
      </motion.div>

      {/* Booking */}
      <motion.div
        {...floatingAnimation(2.2, 4.0)}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-[14%] left-[-17%] z-10 hidden lg:block"
      >
        <Image
          src="/booking-confirmed-pill.svg"
          alt="booking-confirmed-pill"
          width={300}
          height={162}
          className="object-contain"
        />
      </motion.div>

      {/* Cleaning */}
      <motion.div
        {...floatingAnimation(2.4, 3.6)}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-[-15%] right-[-8%] z-10 hidden lg:block"
      >
        <Image
          src="/cleaning-service-pill.svg"
          alt="cleaning-service-pill"
          width={226}
          height={139}
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default HeroAnimation;
