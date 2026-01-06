import { useState, useEffect, useRef } from 'react';
import { reviews } from '../assets/assets';
import PropTypes from "prop-types";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaQuoteLeft, 
  FaStar, 
  FaRegStar
} from 'react-icons/fa';
import { 
  // eslint-disable-next-line no-unused-vars
  Star, 
  Award, 
  Heart, 
  Shield, 
  Clock, 
  Calendar,
  Sparkles,
  ThumbsUp
} from 'lucide-react';

const ReviewCard = ({ review, isActive, direction, index, totalReviews }) => {
  const [showFullReview, setShowFullReview] = useState(false);
  const truncatedReview = review.review.length > 250 ? 
    `${review.review.substring(0, 250)}...` : review.review;

    ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    rating: PropTypes.number,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    verified: PropTypes.bool,
    service: PropTypes.string,
    doctorName: PropTypes.string,
    speciality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,

  isActive: PropTypes.bool.isRequired,
  direction: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
        >
          {i <= rating ? (
            <FaStar className="w-5 h-5 text-yellow-400 fill-current" />
          ) : (
            <FaRegStar className="w-5 h-5 text-gray-300" />
          )}
        </motion.div>
      );
    }
    return stars;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <motion.div
      key={review.id}
      custom={direction}
      variants={{
        enter: (direction) => ({
          x: direction > 0 ? 1000 : -1000,
          opacity: 0,
          scale: 0.8,
          rotateY: direction > 0 ? -20 : 20
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
          }
        },
        exit: (direction) => ({
          x: direction < 0 ? 1000 : -1000,
          opacity: 0,
          scale: 0.8,
          rotateY: direction < 0 ? 20 : -20,
          transition: {
            duration: 0.3
          }
        })
      }}
      initial="enter"
      animate="center"
      exit="exit"
      className={`absolute inset-0 flex items-center justify-center p-4 ${
        isActive ? 'z-10' : 'z-0'
      }`}
    >
      <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                />
                {review.verified && (
                  <div className="absolute -top-2 -right-2 p-1 bg-blue-500 rounded-full">
                    <Shield size={12} className="text-white" />
                  </div>
                )}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {review.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating || 5)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.rating || 5}.0
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={12} />
                  <span>{getTimeAgo(review.date || new Date())}</span>
                  {review.service && (
                    <>
                      <span>•</span>
                      <span>{review.service}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Review ID */}
            <div className="text-sm text-gray-400 dark:text-gray-500">
              #{String(index + 1).padStart(2, '0')}/{totalReviews}
            </div>
          </div>

          {/* Review Content */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 text-blue-400/20 dark:text-blue-400/10">
              <FaQuoteLeft size={60} />
            </div>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {showFullReview ? review.review : truncatedReview}
            </motion.p>
            {review.review.length > 250 && (
              <button
                onClick={() => setShowFullReview(!showFullReview)}
                className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm"
              >
                {showFullReview ? 'Read Less' : 'Read Full Review'}
              </button>
            )}
          </div>

          {/* Doctor Info & Stats */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {review.doctorName || 'Dr. Sarah Johnson'}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  {review.speciality || 'Cardiologist'}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <ThumbsUp size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      100% Helpful
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Patient satisfaction
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Award size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      15+ Years
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {review.tags && review.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {review.tags.map((tag, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const controls = useAnimation();
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  const prevReview = () => {
    setDirection(-1);
    setIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const nextReview = () => {
    setDirection(1);
    setIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 8000);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Calculate overall stats
  const overallStats = {
    averageRating: (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1),
    totalReviews: reviews.length,
    verifiedPatients: reviews.filter(r => r.verified).length
  };

  return (
    <motion.section
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
          >
            <Sparkles size={16} className="text-blue-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              Patient Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Trusted by{' '}
            <span className="relative inline-block">
              <span className="text-slate-900 dark:text-white">Thousands</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              />
            </span>{' '}
            of Patients
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Read authentic stories from our community of patients who found healing and hope
          </motion.p>
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700">
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {overallStats.averageRating}
              <span className="text-yellow-500 ml-1">★</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Average Rating</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700">
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {overallStats.totalReviews}+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Reviews</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700 col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {overallStats.verifiedPatients}+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Verified Patients</div>
          </div>
        </motion.div>

        {/* Main Carousel */}
        <div 
          className="relative h-[600px] mb-12"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence custom={direction}>
            <ReviewCard 
              key={reviews[index].id} 
              review={reviews[index]}
              isActive={true}
              direction={direction}
              index={index}
              totalReviews={reviews.length}
            />
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <FaChevronLeft size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </motion.button>
          
          <motion.button
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <FaChevronRight size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </motion.button>

          {/* Auto-play Toggle */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute bottom-8 right-4 z-20 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? 'Pause Auto-play' : 'Start Auto-play'}
          </motion.button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {reviews.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                  resetAutoPlay();
                }}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.1 * i + 0.6, type: "spring" }}
              >
                <div className={`w-3 h-3 rounded-full transition-all ${
                  i === index 
                    ? 'bg-blue-600 dark:bg-blue-500 scale-125' 
                    : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
                }`} />
                {i === index && (
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-600 dark:border-blue-500 rounded-full"
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Shield size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Verified Reviews</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">All reviews authenticated</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Heart size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Real Stories</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Genuine patient experiences</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Award size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Top Doctors</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Highly rated specialists</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
              <Calendar size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Recent Updates</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Fresh reviews daily</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Reviews;