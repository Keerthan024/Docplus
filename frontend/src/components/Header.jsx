import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Header = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  const specialties = ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist'];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const specialtyVariants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-br from-[#002d39] via-[#004052] to-[#005066] rounded-2xl px-6 md:px-10 lg:px-20 py-10 md:py-16"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#006680] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#00a3cc] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 w-96 h-96 bg-[#0088aa] rounded-full opacity-5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center">
        {/* Header Left */}
        <motion.div
          variants={containerVariants}
          className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[5vw]"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight"
          >
            Find & Book Appointment <br />
            With{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Trusted</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#00c2ff] opacity-30 z-0"></span>
            </span>{" "}
            Doctors
          </motion.h1>

          <motion.div
  variants={itemVariants}
  className="relative h-12 flex items-center"
>
  <span className="text-white/80 text-lg inline-flex items-baseline">
    Expert{" "}
    <AnimatePresence mode="wait">
      <motion.span
        key={currentSpecialty}
        initial="enter"
        animate="center"
        exit="exit"
        variants={specialtyVariants}
        transition={{ duration: 0.5 }}
        className="inline-block font-semibold text-[#00c2ff] min-w-[120px] mx-1"
      >
        {specialties[currentSpecialty]}
      </motion.span>
    </AnimatePresence>
    available now
  </span>
</motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-white/80 text-base"
          >
            <div className="relative">
              <img
                className="w-32"
                src={assets.group_profiles}
                alt="Trusted patients"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#00c2ff] text-white text-xs font-bold px-2 py-1 rounded-full">
                500+
              </div>
            </div>
            <p className="max-w-xs">
              Browse our network of trusted specialists and schedule your
              appointment in just a few clicks.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0, 194, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              href="#speciality"
              className="flex items-center gap-2 bg-[#00c2ff] px-8 py-3 rounded-full text-white text-sm font-medium hover:bg-[#00a8e0] transition-all duration-300"
            >
              Book appointment
              <motion.img
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-3"
                src={assets.arrow_icon}
                alt=""
              />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#doctors"
              className="flex items-center gap-2 bg-transparent border border-white/30 px-6 py-3 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              Browse Doctors
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Header Right */}
        <motion.div
          variants={imageVariants}
          whileHover="hover"
          className="md:w-1/2 relative mt-10 md:mt-0"
        >
          <img
            className="w-full h-auto rounded-xl shadow-2xl object-contain"
            src={assets.header_img}
            alt="Doctor with patient"
            style={{ maxHeight: "70vh" }}
          />

          {/* Floating badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -top-5 -right-5 bg-white p-3 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Available now</p>
                <p className="text-sm font-semibold">Dr. Sarah Johnson</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
      >
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-xs text-white/70">Patients Daily</p>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-xs text-white/70">Satisfaction</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;