import React, { useState, useEffect, useRef } from 'react';
import { reviews } from '../assets/assets';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReviewCard = ({ image, name, review }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      className="bg-white shadow-lg rounded-2xl p-6 max-w-sm text-center border border-gray-200"
    >
      <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300" />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 mt-3 text-sm leading-relaxed">{review}</p>
    </motion.div>
  );
};

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [index, setIndex] = useState(0);

  const prevReview = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const nextReview = () => {
    setIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: { 
          opacity: 1,
          transition: { staggerChildren: 0.3 }
        }
      }}
      className="relative z-10 flex flex-col items-center p-10 bg-gray-50 rounded-lg shadow-md w-full max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">What People Are Saying</h1>
      <div className="flex items-center gap-6">
        <button 
          onClick={prevReview} 
          className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
        >
          <FaChevronLeft size={24} className="text-gray-700" />
        </button>
        <ReviewCard {...reviews[index]} />
        <button 
          onClick={nextReview} 
          className="p-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
        >
          <FaChevronRight size={24} className="text-gray-700" />
        </button>
      </div>
    </motion.div>
  );
};

export default Reviews;