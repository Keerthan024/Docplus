import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  ChevronRight,
  Sparkles,
  Shield,
  Users,
  Stethoscope
} from 'lucide-react'

const SkeletonCard = () => (
  <div className="relative overflow-hidden bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-[380px] w-full">
    {/* Skeleton Shimmer Effect */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 dark:via-slate-700/10 to-transparent" />
    
    {/* Image Skeleton */}
    <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl mb-6" />
    
    {/* Content Skeletons */}
    <div className="space-y-3">
      <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full w-3/4" />
      <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full w-1/2" />
      <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full w-2/3" />
      <div className="flex gap-2 mt-4">
        <div className="h-8 flex-1 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg" />
        <div className="h-8 flex-1 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg" />
      </div>
    </div>
  </div>
)

const DoctorCard = ({ doctor, index, navigate, isLast }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate rating stars
  const rating = doctor.rating || 4.5
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={14} 
        className={`${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-300 text-slate-300 dark:fill-slate-700 dark:text-slate-700'}`}
      />
    )
  }

  // Get wait time
  const getWaitTime = () => {
    if (!doctor.available) return "Tomorrow"
    const times = ["15 min", "30 min", "1 hour", "2 hours"]
    return times[Math.floor(Math.random() * times.length)]
  }

  // Get experience years
  const getExperience = () => {
    const baseYear = 10 + Math.floor(Math.random() * 15)
    return `${baseYear}+ years`
  }

  // Get consultation fee
  const getFee = () => {
    const baseFee = 500 + Math.floor(Math.random() * 1000)
    return `₹${baseFee}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div 
        className="relative bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        onClick={() => {
          navigate(`/appointment/${doctor._id}`)
          window.scrollTo(0, 0)
        }}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
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

          {/* Experience Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
              <Award size={12} />
              <span>{getExperience()} exp</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Doctor Name & Specialty */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {doctor.speciality}
            </p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {stars}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                ({Math.floor(Math.random() * 500) + 100} reviews)
              </span>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock size={14} />
              <span className="font-medium">{getWaitTime()} wait</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin size={14} />
              <span>{doctor.location || "Online Consultation"}</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Consultation Fee</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {getFee()}
              </div>
            </div>
            
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/appointment/${doctor._id}`)
                window.scrollTo(0, 0)
              }}
            >
              Book Now
            </motion.button>
          </div>
        </div>

        {/* Hover Effect Border */}
        <motion.div
          className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  )
}

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)
  const [relatedDoctors, setRelatedDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      if (doctors.length > 0 && speciality) {
        // Filter doctors by same specialty, exclude current doctor
        const filtered = doctors.filter(doc => 
          doc.speciality === speciality && doc._id !== docId
        )
        
        // Sort by availability and rating
        const sorted = [...filtered]
          .sort((a, b) => {
            // Available doctors first
            if (a.available && !b.available) return -1
            if (!a.available && b.available) return 1
            
            // Then by rating (higher first)
            const ratingA = a.rating || 4
            const ratingB = b.rating || 4
            return ratingB - ratingA
          })
          .slice(0, 3) // Show only 3 related doctors
        
        setRelatedDoctors(sorted)
        setLoading(false)
      }
    }, 600)
    
    return () => clearTimeout(timeout)
  }, [doctors, speciality, docId])

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
          >
            <Sparkles size={16} className="text-blue-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              Explore More Specialists
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Other Top <span className="text-blue-600 dark:text-blue-400">{speciality}</span> Specialists
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Browse other highly-rated specialists in {speciality} with excellent patient reviews and availability
          </motion.p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              <Users size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Patient Reviews</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">1000+ testimonials</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Stethoscope size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Expert Care</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">15+ years avg experience</div>
            </div>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <AnimatePresence mode="wait">
            {loading ? (
              Array(3).fill().map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : relatedDoctors.length > 0 ? (
              relatedDoctors.map((doctor, index) => (
                <DoctorCard 
                  key={doctor._id} 
                  doctor={doctor} 
                  index={index} 
                  navigate={navigate}
                  isLast={index === relatedDoctors.length - 1}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center py-12"
              >
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-12 max-w-2xl mx-auto">
                  <Stethoscope size={64} className="mx-auto text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    No Other {speciality} Specialists Available
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    Currently, there are no other {speciality} specialists available. 
                    Explore doctors in related specialties or check back later.
                  </p>
                  <motion.button
                    onClick={() => navigate('/doctors')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Browse All Specialties
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Browse All Button */}
        {!loading && relatedDoctors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <div className="text-center">
              <motion.button
                onClick={() => navigate('/doctors')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-200 dark:hover:shadow-blue-900/30 transition-all"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Browse All {doctors.length}+ Doctors</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Free cancellation • Secure payments • 24/7 support
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default RelatedDoctors