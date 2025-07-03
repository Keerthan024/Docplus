import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiX,
  FiCheck,
  FiLoader,
} from "react-icons/fi";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (aToken) {
      setIsLoading(true);
      getAllAppointments().finally(() => setIsLoading(false));
    }
  }, [aToken]);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.userData.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.docData.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" &&
        !appointment.cancelled &&
        !appointment.isCompleted) ||
      (filterStatus === "completed" && appointment.isCompleted) ||
      (filterStatus === "cancelled" && appointment.cancelled);

    return matchesSearch && matchesStatus;
  });

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await cancelAppointment(id);
    } finally {
      setCancellingId(null);
    }
  };

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
      scale: 1.01,
      backgroundColor: "rgba(249, 250, 251, 0.8)",
      transition: { duration: 0.2 },
    },
  };

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
          All Appointments
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
            {searchTerm
              ? "Try a different search term"
              : "No appointments have been scheduled yet"}
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
            <div className="col-span-1">#</div>
            <div className="col-span-3">Patient</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-3">Date & Time</div>
            <div className="col-span-2">Doctor</div>
            <div className="col-span-1">Fees</div>
            <div className="col-span-1">Status</div>
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
                  <p className="text-gray-800 dark:text-gray-200">
                    {item.userData.name}
                  </p>
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

                <div className="col-span-1 sm:col-span-2 flex items-center gap-3">
                  <img
                    src={item.docData.image}
                    className="w-8 h-8 rounded-full object-cover bg-gray-200 border border-gray-200 dark:border-gray-600"
                    alt="Doctor"
                  />
                  <p className="text-gray-800 dark:text-gray-200">
                    {item.docData.name}
                  </p>
                </div>

                <div className="col-span-1 flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  ₹
                  <span>{item.amount}</span>
                </div>

                <div className="col-span-1">
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
                        <FiLoader className="animate-spin" />
                      ) : (
                        <FiX className="text-lg" />
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AllAppointments;
