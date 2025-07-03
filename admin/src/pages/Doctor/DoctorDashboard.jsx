import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";
import {
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiCheck,
  FiX,
  FiLoader,
} from "react-icons/fi";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (dToken) {
      setIsLoading(true);
      getDashData().finally(() => setIsLoading(false));
    }
  }, [dToken]);

  const handleAction = async (id, action) => {
    setProcessingId(id);
    try {
      if (action === "complete") {
        await completeAppointment(id);
      } else {
        await cancelAppointment(id);
      }
      await getDashData(); // Refresh data after action
    } finally {
      setProcessingId(null);
    }
  };

  const statCards = [
    {
      icon: "₹",
      value: dashData?.earnings || 0,
      label: "Earnings",
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <FiCalendar className="text-2xl text-blue-500" />,
      value: dashData?.appointments || 0,
      label: "Appointments",
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <FiUser className="text-2xl text-purple-500" />,
      value: dashData?.patients || 0,
      label: "Patients",
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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
        Doctor Dashboard
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
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {card.label === "Earnings" ? currency : ""}
                  {card.value}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {card.label}
                </p>
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
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                className="flex items-center p-4 gap-4"
              >
                <img
                  src={item.userData.image}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                  alt="Patient"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {item.userData.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <FiCalendar className="text-primary" />
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
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAction(item._id, "complete")}
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
                        onClick={() => handleAction(item._id, "cancel")}
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
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DoctorDashboard;
