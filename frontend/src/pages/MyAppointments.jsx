import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  CheckCircle,
  DollarSign,
  Loader2,
  Stethoscope,
  Video,
  Phone,
  MessageCircle,
  FileText,
  Download,
  ChevronRight,
  Sparkles,
  Shield,
  Users,
  AlertCircle
} from "lucide-react";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all"); // all, upcoming, completed, cancelled
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  // Format date
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Format time to AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Get days until appointment
  const getDaysUntil = (slotDate) => {
    const dateArray = slotDate.split("_");
    const appointmentDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    const today = new Date();
    const diffTime = appointmentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 0) return `In ${diffDays} days`;
    return "Past";
  };

  // Fetch appointments
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
        setShowCancelModal(null);
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

  // Razorpay payment
  const appointmentRazorpay = async (appointment) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId: appointment._id },
        { headers: { token } }
      );
      
      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "DocPlus Healthcare",
          description: `Appointment with Dr. ${appointment.docData.name}`,
          order_id: data.order.id,
          theme: {
            color: "#2563eb"
          },
          handler: async (response) => {
            try {
              const verifyRes = await axios.post(
                backendUrl + "/api/user/verifyRazorpay",
                response,
                { headers: { token } }
              );
              if (verifyRes.data.success) {
                getUserAppointments();
                toast.success("Payment successful! Appointment confirmed.");
              }
            } catch (error) {
              console.error(error);
              toast.error("Payment verification failed");
            }
          },
          modal: {
            ondismiss: () => {
              toast.info("Payment cancelled");
            }
          }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(item => {
    if (filter === "all") return true;
    if (filter === "upcoming") return !item.cancelled && !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    if (filter === "cancelled") return item.cancelled;
    return true;
  });

  // Empty state message based on filter
  const getEmptyStateMessage = () => {
    switch (filter) {
      case "upcoming":
        return { 
          title: "No upcoming appointments",
          message: "You don't have any upcoming appointments scheduled"
        };
      case "completed":
        return { 
          title: "No completed appointments",
          message: "Your completed appointments will appear here"
        };
      case "cancelled":
        return { 
          title: "No cancelled appointments",
          message: "You haven't cancelled any appointments"
        };
      default:
        return { 
          title: "No appointments found",
          message: "You haven't booked any appointments yet"
        };
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-lg"
    >
      <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6">
        <Calendar size={48} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
        {getEmptyStateMessage().title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
        {getEmptyStateMessage().message}
      </p>
      <motion.button
        onClick={() => navigate("/doctors")}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Find a Doctor
      </motion.button>
    </motion.div>
  );

  const AppointmentCard = ({ appointment, index }) => {
    const daysUntil = getDaysUntil(appointment.slotDate);
    const isUpcoming = !appointment.cancelled && !appointment.isCompleted;
    const isToday = daysUntil === "Today";
    
    return (
      <motion.div
        key={appointment._id}
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all overflow-hidden"
      >
        {/* Appointment Header */}
        <div className={`p-6 border-b border-slate-100 dark:border-slate-700 ${
          appointment.cancelled ? 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10' :
          appointment.isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10' :
          isToday ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10' :
          'bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-900/10'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                appointment.cancelled ? 'bg-red-100 dark:bg-red-900/30' :
                appointment.isCompleted ? 'bg-green-100 dark:bg-green-900/30' :
                'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                <Calendar className={
                  appointment.cancelled ? 'text-red-600 dark:text-red-400' :
                  appointment.isCompleted ? 'text-green-600 dark:text-green-400' :
                  'text-blue-600 dark:text-blue-400'
                } />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Appointment with Dr. {appointment.docData.name.split(' ')[0]}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appointment.cancelled ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    appointment.isCompleted ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    isToday ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
                  }`}>
                    {appointment.cancelled ? 'Cancelled' :
                     appointment.isCompleted ? 'Completed' :
                     daysUntil}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {appointment.docData.speciality} • {appointment.consultationType || 'Video Consultation'}
                </p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              {appointment.payment ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">Paid</span>
                </div>
              ) : isUpcoming && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                  <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Payment Pending</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appointment Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Doctor Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={appointment.docData.image}
                    alt={appointment.docData.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-white dark:border-slate-800 shadow-md"
                  />
                  <div className="absolute -top-2 -right-2 p-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                    <Shield size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Dr. {appointment.docData.name}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {appointment.docData.speciality}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      <span className="text-sm font-bold text-slate-900 dark:text-white ml-1">4.8</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Users size={14} />
                      <span>1000+ consults</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Date</div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {slotDateFormat(appointment.slotDate)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Time</div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {formatTime(appointment.slotTime)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Payment */}
            <div className="space-y-6">
              {/* Payment Info */}
              {appointment.payment ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-700 dark:text-green-400">Payment Confirmed</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {currencySymbol}{appointment.docData.fees}
                    </div>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Paid on {new Date(appointment.paymentDate).toLocaleDateString()}
                  </div>
                </div>
              ) : isUpcoming && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={20} className="text-amber-600 dark:text-amber-400" />
                      <span className="font-semibold text-amber-700 dark:text-amber-400">Payment Required</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {currencySymbol}{appointment.docData.fees}
                    </div>
                  </div>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
                    Confirm your appointment by completing the payment
                  </p>
                  <motion.button
                    onClick={() => appointmentRazorpay(appointment)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Complete Payment
                  </motion.button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {isUpcoming && (
                  <>
                    <motion.button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowCancelModal(appointment._id);
                      }}
                      disabled={cancellingId === appointment._id}
                      className="flex-1 px-4 py-2.5 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {cancellingId === appointment._id ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X size={16} />
                          Cancel
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => navigate(`/appointment/${appointment.docData._id}`)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </>
                )}
                
                {appointment.isCompleted && (
                  <>
                    <motion.button
                      onClick={() => navigate(`/appointment/${appointment.docData._id}`)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Again
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {}}
                      className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText size={16} />
                      Receipt
                    </motion.button>
                  </>
                )}
              </div>

              {/* Join Consultation (if upcoming video consult) */}
              {isUpcoming && appointment.consultationType === 'video' && isToday && (
                <div className="mt-4">
                  <motion.button
                    onClick={() => window.open('https://meet.google.com', '_blank')}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Video size={20} />
                    Join Video Consultation
                  </motion.button>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
                    Available 10 minutes before appointment
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                <Sparkles size={16} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                  Your Health Journey
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                My Appointments
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage and track all your medical appointments in one place
              </p>
            </div>
            
            <motion.button
              onClick={() => navigate("/doctors")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Book New Appointment
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total", value: appointments.length, color: "from-blue-500 to-blue-600" },
              { label: "Upcoming", value: appointments.filter(a => !a.cancelled && !a.isCompleted).length, color: "from-amber-500 to-orange-500" },
              { label: "Completed", value: appointments.filter(a => a.isCompleted).length, color: "from-green-500 to-emerald-500" },
              { label: "Cancelled", value: appointments.filter(a => a.cancelled).length, color: "from-red-500 to-rose-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 text-white shadow-lg`}
              >
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "all", label: "All Appointments" },
              { id: "upcoming", label: "Upcoming" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" }
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Stethoscope className="text-blue-500" size={24} />
              </div>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading your appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {filteredAppointments.map((appointment, index) => (
              <AppointmentCard 
                key={appointment._id} 
                appointment={appointment} 
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCancelModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                  <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Cancel Appointment
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Are you sure you want to cancel your appointment with Dr. {selectedAppointment?.docData.name}?
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Date</span>
                    <span className="font-semibold">{slotDateFormat(selectedAppointment?.slotDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Time</span>
                    <span className="font-semibold">{formatTime(selectedAppointment?.slotTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Doctor</span>
                    <span className="font-semibold">Dr. {selectedAppointment?.docData.name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => cancelAppointment(showCancelModal)}
                  disabled={cancellingId === showCancelModal}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {cancellingId === showCancelModal ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyAppointments;