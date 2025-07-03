import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'
import { FiUser, FiCalendar, FiClock, FiDollarSign, FiCheck, FiX, FiLoader, FiCreditCard } from 'react-icons/fi'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (dToken) {
      setIsLoading(true)
      getAppointments().finally(() => setIsLoading(false))
    }
  }, [dToken])

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slotDateFormat(appointment.slotDate).toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && !appointment.cancelled && !appointment.isCompleted) ||
      (filterStatus === 'completed' && appointment.isCompleted) ||
      (filterStatus === 'cancelled' && appointment.cancelled)
    
    return matchesSearch && matchesStatus
  })

  const handleAction = async (id, action) => {
    setProcessingId(id)
    try {
      if (action === 'complete') {
        await completeAppointment(id)
      } else {
        await cancelAppointment(id)
      }
    } finally {
      setProcessingId(null)
    }
  }

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
      backgroundColor: "rgba(249, 250, 251, 0.5)",
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto p-6"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          My Appointments
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm ? 'Try a different search term' : 'No appointments scheduled yet'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {/* Table Header */}
          <motion.div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm">
            <div className="col-span-1">S.No</div>
            <div className="col-span-3">Patient</div>
            <div className="col-span-1">Payment</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-3">Date & Time</div>
            <div className="col-span-1">Fees</div>
            <div className="col-span-2">Status</div>
          </motion.div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAppointments.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover="hover"
                className="grid grid-cols-2 sm:grid-cols-12 gap-2 sm:gap-4 p-4 items-center text-sm"
              >
                <div className="hidden sm:block col-span-1 text-gray-500 dark:text-gray-400">
                  {index + 1}
                </div>

                <div className="col-span-1 sm:col-span-3 flex items-center gap-3">
                  <img 
                    src={item.userData.image} 
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-600" 
                    alt="Patient" 
                  />
                  <p className="text-gray-800 dark:text-gray-200">{item.userData.name}</p>
                </div>

                <div className="col-span-1 flex items-center gap-1">
                  {item.payment ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      <FiCreditCard className="mr-1" /> Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      Cash
                    </span>
                  )}
                </div>

                <div className="hidden sm:block col-span-1 text-gray-500 dark:text-gray-400">
                  {calculateAge(item.userData.dob)}
                </div>

                <div className="col-span-1 sm:col-span-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FiCalendar className="text-primary" />
                  <span>{slotDateFormat(item.slotDate)}</span>
                  <FiClock className="text-primary ml-2" />
                  <span>{item.slotTime}</span>
                </div>

                <div className="col-span-1 flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  ₹
                  <span>{item.amount}</span>
                </div>

                <div className="col-span-1 sm:col-span-2">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      <FiX className="mr-1" /> Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <FiCheck className="mr-1" /> Completed
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAction(item._id, 'complete')}
                        disabled={processingId === item._id}
                        className="text-green-500 hover:text-green-700 dark:hover:text-green-400"
                      >
                        {processingId === item._id ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiCheck className="text-lg" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAction(item._id, 'cancel')}
                        disabled={processingId === item._id}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        {processingId === item._id ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiX className="text-lg" />
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DoctorAppointments