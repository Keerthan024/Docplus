import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiX,
  FiCheck,
  FiDollarSign,
  FiLoader,
} from "react-icons/fi";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Function to format the date
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Getting User Appointments Data
  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    setCancellingId(appointmentId);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setCancellingId(null);
    }
  };

  // Razorpay payment initialization
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Doc+ Appointment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            toast.success("Payment successful!");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
      theme: {
        color: "#4f46e5",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Make payment
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Appointments
          </h1>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't booked any appointments yet
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/doctors")}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium"
            >
              Book an Appointment
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {appointments.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Doctor Image */}
                  <div className="md:w-1/4 lg:w-1/5 relative">
                    <motion.img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-full h-48 md:h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {item.cancelled && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-red-500 text-sm font-medium shadow">
                          Cancelled
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                          {item.docData.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {item.docData.speciality}
                        </p>

                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-4">
                          <div className="flex items-center gap-1">
                            <FiCalendar className="text-primary" />
                            <span>{slotDateFormat(item.slotDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiClock className="text-primary" />
                            <span>{item.slotTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <FiMapPin className="text-primary" />
                          <span>
                            {item.docData.address.line1},{" "}
                            {item.docData.address.line2}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        {item.isCompleted ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <FiCheck className="mr-1" /> Completed
                          </span>
                        ) : item.cancelled ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            <FiX className="mr-1" /> Cancelled
                          </span>
                        ) : item.payment ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            <FiCheck className="mr-1" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Pending Payment
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {!item.cancelled &&
                        !item.payment &&
                        !item.isCompleted &&
                        payment !== item._id && (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setPayment(item._id)}
                            className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm"
                          >
                            Pay Online
                          </motion.button>
                        )}

                      {!item.cancelled &&
                        !item.payment &&
                        !item.isCompleted &&
                        payment === item._id && (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => appointmentRazorpay(item._id)}
                            className="px-4 py-2 bg-white border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-sm flex items-center gap-2"
                          >
                            <img
                              src={assets.razorpay_logo}
                              alt="Razorpay"
                              className="h-5 object-contain"
                            />
                            Pay Now
                          </motion.button>
                        )}

                      {!item.cancelled && !item.isCompleted && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => cancelAppointment(item._id)}
                          disabled={cancellingId === item._id}
                          className={`px-4 py-2 border rounded-lg font-medium text-sm ${
                            cancellingId === item._id
                              ? "border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-600"
                              : "border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          } flex items-center gap-2`}
                        >
                          {cancellingId === item._id ? (
                            <>
                              <FiLoader className="animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <FiX />
                              Cancel
                            </>
                          )}
                        </motion.button>
                      )}

                      {item.payment && !item.isCompleted && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>Paid: ₹{item.docData.fees}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyAppointments;
