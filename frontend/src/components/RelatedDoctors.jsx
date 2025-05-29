import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow max-w-xs w-full h-[250px]" />
)

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      if (doctors.length > 0 && speciality) {
        const filtered = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
        setRelDoc(filtered)
        setLoading(false)
      }
    }, 800)
    return () => clearTimeout(timeout)
  }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 my-14 text-[#262626] dark:text-white'>
      <h1 className='text-2xl font-semibold'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-500 dark:text-gray-300'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 px-3 sm:px-0 place-items-center'>
        {loading
          ? Array(3).fill().map((_, i) => <SkeletonCard key={i} />)
          : relDoc.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => {
                  navigate(`/appointment/${item._id}`)
                  scrollTo(0, 0)
                }}
                className='group border border-[#C9D8FF] dark:border-gray-700 rounded-xl overflow-hidden cursor-pointer bg-white dark:bg-[#1f1f1f] shadow-sm transition-all max-w-xs w-full'
              >
                <img
                  className="w-full aspect-[4/3] object-cover rounded-t-xl bg-[#EAEFFF]"
                  src={item.image}
                  alt={item.name}
                />
                <div className='p-3 space-y-1'>
                  <div className={`flex items-center gap-2 text-xs ${item.available ? 'text-green-500' : "text-gray-400"}`}>
                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-400"}`}></span>
                    <span>{item.available ? 'Available' : "Not Available"}</span>
                  </div>
                  <p className='text-base font-medium truncate'>{item.name}</p>
                  <p className='text-xs text-gray-600 dark:text-gray-400 truncate'>{item.speciality}</p>
                </div>
              </motion.div>
            ))}
      </div>

      {!loading && relDoc.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className='bg-[#EAEFFF] dark:bg-gray-800 dark:text-gray-200 text-gray-600 px-10 py-2.5 rounded-full mt-10 shadow hover:shadow-md transition'
          onClick={() => navigate('/doctors')}
        >
          View More Doctors
        </motion.button>
      )}
    </div>
  )
}

export default RelatedDoctors
