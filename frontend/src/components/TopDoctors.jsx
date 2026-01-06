import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  ChevronRight, 
  Filter,
  Sparkles,
  ThumbsUp,
  Zap,
  Shield,
  Video,
} from "lucide-react";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  // Filters for doctor categories
  const filters = [
    { id: "all", label: "All Specialists" },
    { id: "available", label: "Available Now" },
    { id: "top_rated", label: "Top Rated" },
    { id: "video", label: "Video Consult" },
    { id: "popular", label: "Most Popular" }
  ];

  // Filter doctors based on selection
  const filteredDoctors = doctors.filter(doctor => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "available") return doctor.available;
    if (selectedFilter === "top_rated") return doctor.rating >= 4.7;
    if (selectedFilter === "video") return doctor.videoConsult;
    if (selectedFilter === "popular") return doctor.consultations > 1000;
    return true;
  });

  // Duplicate doctors for seamless infinite scroll
  const displayedDoctors = [...filteredDoctors.slice(0, 8), ...filteredDoctors.slice(0, 8)];

  // Calculate experience years
  // eslint-disable-next-line no-unused-vars
  const getExperienceYears = (doctor) => {
    const baseYear = 10 + Math.floor(Math.random() * 15);
    return `${baseYear}+ years`;
  };

  // Calculate consultation fee
  // eslint-disable-next-line no-unused-vars
  const getConsultationFee = (doctor) => {
    const baseFee = 500 + Math.floor(Math.random() * 1000);
    return `₹${baseFee}`;
  };

  // Get wait time
  const getWaitTime = (doctor) => {
    if (!doctor.available) return "Tomorrow";
    const times = ["15 min", "30 min", "1 hour", "2 hours"];
    return times[Math.floor(Math.random() * times.length)];
  };

  // Animation control
  useEffect(() => {
    if (!carouselRef.current || isPaused) return;

    // eslint-disable-next-line no-unused-vars
    const animation = animationRef.current = carouselRef.current.animate(
      [
        { transform: 'translateX(0%)' },
        { transform: 'translateX(-50%)' }
      ],
      {
        duration: 40000,
        iterations: Infinity,
        easing: 'linear'
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [isPaused, selectedFilter]);

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
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
              Trusted Medical Experts
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Meet Our{" "}
            <span className="relative inline-block">
              <span className="text-slate-900 dark:text-white">Top-Rated</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              />
            </span>{" "}
            Doctors
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Handpicked specialists with exceptional expertise and patient satisfaction rates
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <Filter size={16} />
            <span>Filter by:</span>
          </div>
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden py-8 mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Side fade gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8"
          >
            {displayedDoctors.map((doctor, index) => (
              <motion.div
                key={`${doctor._id}-${index}`}
                className="flex-shrink-0 w-[300px] sm:w-[340px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredDoctor(doctor._id)}
                onHoverEnd={() => setHoveredDoctor(null)}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ y: -12, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(`/appointment/${doctor._id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {/* Doctor Card */}
                  <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Image & Badges */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Availability Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          doctor.available
                            ? "bg-green-500/90 text-white"
                            : "bg-amber-500/90 text-white"
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${doctor.available ? 'animate-pulse bg-white' : 'bg-white'}`} />
                          <span>{doctor.available ? "Available" : "Booked"}</span>
                        </div>
                      </div>

                      {/* Video Consult Badge */}
                      {doctor.videoConsult && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-blue-500/90 text-white rounded-full text-xs font-semibold">
                          <Video size={12} />
                          <span>Video Consult</span>
                        </div>
                      )}

                      {/* Experience Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
                          <Award size={12} />
                          <span>{getExperienceYears(doctor)} exp</span>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                            {doctor.name}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                            {doctor.speciality}
                          </p>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-full">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-slate-900 dark:text-white">4.8</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">(420)</span>
                        </div>
                      </div>

                      {/* Location & Consultation Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <MapPin size={14} />
                          <span>{doctor.location || "Online Consultation"}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span className="font-medium">{getWaitTime(doctor)} wait</span>
                          </div>
                          <div className="text-slate-900 dark:text-white font-bold">
                            {getConsultationFee(doctor)}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <AnimatePresence>
                        {hoveredDoctor === doctor._id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700"
                          >
                            <div className="flex gap-3">
                              <motion.button
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Book Appointment
                              </motion.button>
                              <motion.button
                                className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                View Profile
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Shield size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Verified Credentials</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">All doctors verified</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ThumbsUp size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Patient Reviews</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">1000+ testimonials</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Zap size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Quick Appointments</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Same-day slots</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() => {
              navigate("/doctors");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-200 transition-all"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Browse All {doctors.length}+ Specialists</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Free cancellation • Secure payments • 24/7 support
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TopDoctors;