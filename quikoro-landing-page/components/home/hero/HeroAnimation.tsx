"use client";

import { motion, easeOut, easeInOut } from "motion/react";
import Image from "next/image";
import styles from "./hero.module.css";

const HeroAnimation = () => {
  const floatingAnimation = (delay: number, duration = 3.5) => ({
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
        ease: easeOut,
      },
      y: {
        delay,
        duration,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: easeInOut,
      },
    },
  });

  return (
    <div className="relative mx-auto flex h-[540px] w-full max-w-[560px] items-center justify-center sm:h-[600px] right-10 lg:right-5 lg:mt-10">
      {/* Main Phone */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: easeOut,
        }}
      >
        <Image
          src="/quikoro-home-screen.svg"
          alt="quikoro home screen mockup"
          width={402}
          height={698}
          className={`relative z-10 w-[30vw] object-contain ${styles.centeredImage}`}
        />
      </motion.div>

      {/* Second Phone */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          ease: easeOut,
        }}
        className="absolute right-[-10%] top-[14%] md:right-[0%] lg:right-[-10%] lg:top-[18%] xl:right-[-20%] xl:top-[1%]"
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
        className="absolute bottom-[30%] left-[-23%] z-10 hidden lg:block"
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
