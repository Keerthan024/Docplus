import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`

const SkeletonCard = () => (
  <div className={`relative bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-4 h-[320px] w-full max-w-sm ${shimmer}`}>
    <div className="h-48 bg-gray-200 dark:bg-[#2a2a2a] rounded-xl mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-[#2a2a2a] rounded-full w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-[#2a2a2a] rounded-full w-1/2" />
      <div className="h-3 bg-gray-200 dark:bg-[#2a2a2a] rounded-full w-2/3" />
    </div>
  </div>
)

const DoctorCard = ({ doctor, index, navigate }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="relative group cursor-pointer"
      onClick={() => {
        navigate(`/appointment/${doctor._id}`)
        window.scrollTo(0, 0)
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      <div className="relative overflow-hidden rounded-2xl h-[320px] w-full max-w-sm">
        <motion.img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className="text-sm font-medium">
              {doctor.available ? 'Available today' : 'Not available'}
            </span>
          </div>
          <h3 className="text-xl font-semibold">{doctor.name}</h3>
          <p className="text-sm opacity-90">{doctor.speciality}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      if (doctors.length > 0 && speciality) {
        const filtered = doctors.filter(doc => 
          doc.speciality === speciality && doc._id !== docId
        )
        setRelDoc(filtered.slice(0, 3)) 
        setLoading(false)
      }
    }, 800)
    return () => clearTimeout(timeout)
  }, [doctors, speciality, docId])

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Related Specialists
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore other highly qualified professionals in this field
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <AnimatePresence>
            {loading ? (
              Array(3).fill().map((_, i) => <SkeletonCard key={i} />)
            ) : (
              relDoc.map((doctor, index) => (
                <DoctorCard 
                  key={doctor._id} 
                  doctor={doctor} 
                  index={index} 
                  navigate={navigate} 
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {!loading && relDoc.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--tw-gradient-to)'
              }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/doctors')}
            >
              Browse All Specialists
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default RelatedDoctors