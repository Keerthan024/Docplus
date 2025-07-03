import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../../context/AppContext'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { FiUsers, FiCalendar, FiUser, FiClock, FiX, FiCheck } from 'react-icons/fi'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)

  useEffect(() => {
    if (aToken) {
      setIsLoading(true)
      getDashData().finally(() => setIsLoading(false))
    }
  }, [aToken])

  const handleCancel = async (id) => {
    setCancellingId(id)
    try {
      await cancelAppointment(id)
      await getDashData()
    } finally {
      setCancellingId(null)
    }
  }

  const statCards = [
    {
      icon: <FiUser className="text-2xl text-blue-500" />,
      value: dashData?.doctors || 0,
      label: 'Doctors',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <FiCalendar className="text-2xl text-green-500" />,
      value: dashData?.appointments || 0,
      label: 'Appointments',
      color: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <FiUsers className="text-2xl text-purple-500" />,
      value: dashData?.patients || 0,
      label: 'Patients',
      color: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className={`${card.color} p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{card.value}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
              </div>
              <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Latest Bookings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <FiCalendar className="text-primary" />
            Latest Bookings
          </h2>
        </div>

        {dashData?.latestAppointments?.slice(0, 5).length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No recent bookings found
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-100 dark:divide-gray-700"
          >
            {dashData?.latestAppointments?.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                className="flex items-center p-4 gap-4"
              >
                <img 
                  src={item.docData.image} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" 
                  alt="Doctor" 
                />
                
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">{item.docData.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <FiClock className="text-primary" />
                    <span>Booking on {slotDateFormat(item.slotDate)}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      <FiX className="mr-1" /> Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <FiCheck className="mr-1" /> Completed
                    </span>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCancel(item._id)}
                      disabled={cancellingId === item._id}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      {cancellingId === item._id ? (
                        <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FiX className="text-lg" />
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Dashboard