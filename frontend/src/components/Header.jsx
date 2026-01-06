// Header.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, CheckCircle } from 'lucide-react';
import { assets } from '../assets/assets.js';

const specialties = [
  'Cardiologists',
  'Dermatologists',
  'Pediatricians',
  'Neurologists',
  'Orthopedists',
];

const stats = [
  { value: '500+', label: 'Patients Daily' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Availability' },
];

const Header = () => {
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const headerRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Specialty rotation interval
  useEffect(() => {
    if (isReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isReducedMotion]);

  // Intersection observer for lazy animations
  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle manual specialty navigation for accessibility
  const handleSpecialtyClick = () => {
    setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
  };

  return (
    <>
      {/* Skip navigation for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 hover:bg-blue-700"
      >
        Skip to main content
      </a>

      <header 
        ref={headerRef}
        id="main-header"
        className="relative min-h-[85vh] md:min-h-[90vh] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        aria-label="Main header with hero section"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px),
                                linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
            {/* Left - Content */}
            <div className="space-y-8 lg:space-y-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 
                }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white"
              >
                Quality Care{' '}
                <span className="text-blue-400">Just</span>
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  a Click Away
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-500/40 to-transparent -z-10 rounded-sm" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-2xl leading-relaxed"
              >
                Book appointments with top-rated specialists and get the care you deserve — fast, simple, and trusted.
              </motion.p>

              {/* Specialty rotation with accessibility */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="relative pt-2"
              >
                <span 
                  className="sr-only"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  Currently showing: {specialties[currentSpecialty]}
                </span>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-lg sm:text-xl lg:text-2xl text-slate-200">
                    Find the best
                  </span>
                  
                  <div className="relative min-h-[48px] flex items-center">
                    <button
                      onClick={handleSpecialtyClick}
                      aria-label={`Cycle through specialties. Current: ${specialties[currentSpecialty]}. Click to show next.`}
                      className="text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg px-4 py-2 -ml-4 transition-all duration-200 hover:bg-slate-800/30"
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentSpecialty}
                          initial={{ y: 20, opacity: 0, scale: 0.95 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -20, opacity: 0, scale: 0.95 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: [0.22, 1, 0.36, 1],
                            scale: { type: "spring", stiffness: 300 }
                          }}
                          className="inline-block font-semibold text-blue-400 bg-blue-400/10 px-4 py-2 rounded-lg border border-blue-400/20"
                        >
                          {specialties[currentSpecialty]}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                    
                    {/* Specialty indicators */}
                    <div className="hidden sm:flex items-center gap-2 ml-4">
                      {specialties.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSpecialty(index)}
                          aria-label={`Show ${specialties[index]}`}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentSpecialty === index 
                              ? 'bg-blue-400 w-6' 
                              : 'bg-slate-600 hover:bg-slate-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <motion.a
                  href="/doctors"
                  aria-label="Find your doctor and book appointment"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-blue-700/25 hover:shadow-blue-600/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <span>Find Your Doctor</span>
                  <ArrowRight 
                    className="group-hover:translate-x-1.5 transition-transform duration-300" 
                    size={20} 
                    aria-hidden="true"
                  />
                  {/* Hover effect */}
                  <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>

                <motion.a
                  href="/specialties"
                  aria-label="Browse all medical specialties"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 hover:border-slate-400 text-white font-semibold text-lg rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <span>Browse Specialties</span>
                  <ChevronRight 
                    size={20} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                </motion.a>
              </motion.div>

              {/* Trust stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="flex flex-wrap gap-x-8 gap-y-6 pt-10 border-t border-slate-800/50"
                aria-label="Trust statistics"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + index * 0.15,
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="flex flex-col gap-2"
                  >
                    <div 
                      className="text-3xl sm:text-4xl font-bold text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                      aria-label={stat.value}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-sm sm:text-base text-slate-400 leading-tight"
                      aria-label={stat.label}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right - Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.95 }}
              transition={{ 
                duration: 0.9, 
                delay: 0.5, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Mobile Optimized Image */}
              <div className="block lg:hidden relative mx-auto max-w-md">
                <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                  {/* Image loading skeleton */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse" />
                  )}
                  
                  <img
                    src={assets.header_img}
                    alt="Professional doctor consulting with patient in modern clinic environment"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Desktop Image */}
              <div className="hidden lg:block relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                {/* Image loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse" />
                )}
                
                <img
                  src={assets.header_img}
                  alt="Professional doctor consulting with patient in modern clinic environment"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/10 to-slate-900/30" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="absolute -bottom-4 lg:-bottom-6 -right-4 lg:-right-6 bg-white/95 backdrop-blur-sm p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-2xl border border-slate-200 max-w-[260px] lg:max-w-none z-20"
                aria-label="Doctor availability status"
              >
                <div className="flex items-center gap-3 lg:gap-4">
                  <div 
                    className="bg-emerald-100 p-2 lg:p-3 rounded-full"
                    aria-hidden="true"
                  >
                    <CheckCircle 
                      className="text-emerald-600" 
                      size={24} 
                      lg:size={28}
                    />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-slate-700">
                      Doctor available now
                    </p>
                    <p 
                      className="text-sm lg:text-base font-semibold text-slate-900"
                      aria-label="Doctor Keerthan"
                    >
                      Dr. Keerthan
                    </p>
                    <p className="text-xs lg:text-sm text-slate-500 mt-1">
                      Cardiologist • 15 min response
                    </p>
                  </div>
                </div>
                
                {/* Availability indicator */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-slate-600">Available for consultation</span>
                </div>
              </motion.div>

              {/* Additional decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.2,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.5,
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-slate-400">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main content anchor */}
      <div id="main-content" className="sr-only" />
    </>
  );
};

export default Header;