import React, { useState, useEffect, useRef } from 'react';
import { reviews } from '../assets/assets';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ image, name, review, isActive, direction }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    })
  };

  return (
    <motion.div
      key={name}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${
        isActive ? 'z-10' : 'z-0'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md w-full border border-gray-100">
        <div className="flex justify-center mb-6 text-blue-500">
          <FaQuoteLeft size={24} />
        </div>
        <p className="text-gray-600 text-center text-lg leading-relaxed mb-8">
          {review}
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.img 
            src={image} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-yellow-400 rounded-full"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 500
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef(null);

  const prevReview = () => {
    setDirection(-1);
    setIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setDirection(1);
    setIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate the background
  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <motion.section
      className="relative py-20 px-4 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={controls}
        style={{
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 mb-4 border border-gray-200 shadow-xs"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Clients Say</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hear from people who have experienced our services
          </motion.p>
        </motion.div>

        {/* Reviews carousel */}
        <div className="relative h-96">
          <AnimatePresence custom={direction}>
            <ReviewCard 
              key={reviews[index].name} 
              {...reviews[index]} 
              isActive={true}
              direction={direction}
            />
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.button
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <FaChevronLeft size={20} className="text-gray-700" />
          </motion.button>
          <motion.button
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <FaChevronRight size={20} className="text-gray-700" />
          </motion.button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {reviews.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-3 h-3 rounded-full ${
                  i === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.1 * i + 0.6, type: "spring" }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Reviews;