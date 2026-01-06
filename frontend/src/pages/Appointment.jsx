import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
  FiStar,
  FiMapPin,
  FiUser,
  FiShield,
  FiVideo
} from "react-icons/fi";
import {
  Star,
  Shield,
  Clock,
  Calendar,
  MapPin,
  Users,
  Award,
  Stethoscope,
  ChevronRight,
  CheckCircle,
  Video,
  Phone,
  MessageCircle
} from "lucide-react";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  
  const shortDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [consultationType, setConsultationType] = useState("video"); // video, phone, in-person
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setIsLoading(true);
    setDocSlots([]);

    let today = new Date();
    let slotsArray = [];

    // Generate slots for next 7 days
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Doctor working hours: 10:00 AM to 9:00 PM
      let startTime = new Date(currentDate);
      startTime.setHours(10, 0, 0, 0);
      
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // If it's today, start from current time + 1 hour
      if (i === 0) {
        startTime = new Date();
        startTime.setHours(startTime.getHours() + 1);
        startTime.setMinutes(Math.ceil(startTime.getMinutes() / 30) * 30);
      }

      let timeSlots = [];

      let slotTime = new Date(startTime);
      while (slotTime < endTime) {
        let formattedTime = slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = slotTime.getDate();
        let month = slotTime.getMonth() + 1;
        let year = slotTime.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        // Check if slot is already booked
        const isSlotAvailable = docInfo.slots_booked[slotDate]?.includes(formattedTime) 
          ? false 
          : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(slotTime),
            time: formattedTime,
            dateString: slotDate,
            isPopular: slotTime.getHours() >= 17 && slotTime.getHours() <= 19 // Mark evening slots as popular
          });
        }

        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
    setIsLoading(false);
  };

  const handleBooking = () => {
    if (!token) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warning("Please select a time slot");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmBooking = async () => {
    setBookingStatus("processing");

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = day + "_" + month + "_" + year;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { 
          docId, 
          slotDate, 
          slotTime,
          consultationType 
        },
        { headers: { token } }
      );

      if (data.success) {
        setBookingStatus("success");
        toast.success(data.message);
        setTimeout(() => {
          getDoctorsData();
          setShowConfirmModal(false);
          navigate("/my-appointments");
        }, 1500);
      } else {
        setBookingStatus(null);
        toast.error(data.message);
      }
    } catch (error) {
      setBookingStatus(null);
      console.error(error);
      toast.error(error.response?.data?.message || "Booking failed");
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope size={20} />
              <span className="font-semibold">Booking Appointment</span>
            </div>
            <div className="text-sm">
              {docInfo.name} • {docInfo.speciality}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button & Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiArrowLeft className="text-lg" />
              <span>Back to Doctors</span>
            </motion.button>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>Doctors</span>
              <ChevronRight size={14} />
              <span>{docInfo.speciality}</span>
              <ChevronRight size={14} />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Book Appointment</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Doctor Profile */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Doctor Card */}
              <motion.div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Doctor Image */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-xl"
                      >
                        <img
                          src={docInfo.image}
                          alt={docInfo.name}
                          className="w-40 h-40 object-cover rounded-xl border-4 border-white dark:border-slate-800 shadow-lg"
                        />
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          VERIFIED
                        </div>
                      </motion.div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            {docInfo.name}
                            <Shield size={20} className="text-blue-500" />
                          </h1>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                              {docInfo.speciality}
                            </span>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                              {docInfo.experience}+ years exp
                            </span>
                          </div>

                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[1,2,3,4,5].map((i) => (
                                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="font-bold text-slate-900 dark:text-white">4.8</span>
                              <span className="text-sm text-slate-500 dark:text-slate-400">(420 reviews)</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                              <Users size={16} />
                              <span className="text-sm">1000+ consults</span>
                            </div>
                          </div>
                        </div>

                        {/* Consultation Fee */}
                        <motion.div
                          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-5 py-3 rounded-xl border border-blue-100 dark:border-blue-800/30"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-center">
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Consultation Fee</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                              {currencySymbol}{docInfo.fees}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">30 min session</div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Doctor Details */}
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <Award size={20} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Degree</div>
                            <div className="font-medium text-slate-900 dark:text-white">{docInfo.degree}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Location</div>
                            <div className="font-medium text-slate-900 dark:text-white">{docInfo.location || "Online Consultation"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Doctor */}
                  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4">
                      <Stethoscope size={20} className="text-blue-500" />
                      About Doctor
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {docInfo.about || "Specialized in providing comprehensive care with a patient-centered approach. Committed to delivering the highest quality medical treatment with years of experience in the field."}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Consultation Type Selection */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
              >
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-6">
                  <FiVideo className="text-blue-500" />
                  Consultation Type
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { type: "video", icon: Video, label: "Video Consult", desc: "Secure video call", price: docInfo.fees, recommended: true },
                    { type: "phone", icon: Phone, label: "Phone Consult", desc: "Audio call only", price: docInfo.fees - 200 },
                    { type: "in-person", icon: MapPin, label: "Clinic Visit", desc: "In-person appointment", price: docInfo.fees + 300 }
                  ].map((item) => (
                    <motion.div
                      key={item.type}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConsultationType(item.type)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        consultationType === item.type
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            consultationType === item.type
                              ? "bg-blue-500 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                          }`}>
                            <item.icon size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{item.label}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</div>
                          </div>
                        </div>
                        {item.recommended && (
                          <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {currencySymbol}{item.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Time Slot Selection */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
              >
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-6">
                  <Calendar size={20} className="text-blue-500" />
                  Select Date & Time
                </h3>

                {/* Date Selection */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">
                    Choose a Date
                  </h4>
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {docSlots.length > 0 && docSlots.map((item, index) => {
                      const date = item[0]?.datetime;
                      if (!date) return null;
                      
                      const isToday = date.getDate() === new Date().getDate();
                      
                      return (
                        <motion.button
                          key={index}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSlotIndex(index);
                            setSlotTime(""); // Reset time selection when date changes
                          }}
                          className={`flex flex-col items-center justify-center min-w-[100px] p-4 rounded-xl cursor-pointer transition-all ${
                            slotIndex === index
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                              : "bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {shortDays[date.getDay()]}
                          </span>
                          <span className="text-xl font-bold my-1">
                            {date.getDate()}
                          </span>
                          <span className="text-xs opacity-80">
                            {isToday ? "Today" : `${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                      Available Time Slots
                    </h4>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {docSlots[slotIndex]?.length || 0} slots available
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {Array(10).fill().map((_, i) => (
                        <div key={i} className="h-14 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  ) : docSlots[slotIndex]?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {docSlots[slotIndex].map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSlotTime(item.time)}
                          className={`relative p-3 rounded-lg text-center cursor-pointer transition-all ${
                            item.time === slotTime
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                              : item.isPopular
                              ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                              : "bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600"
                          }`}
                        >
                          {item.isPopular && (
                            <div className="absolute -top-2 -right-2 w-2 h-2 bg-amber-500 rounded-full"></div>
                          )}
                          <div className="text-lg font-medium">
                            {item.time.toLowerCase()}
                          </div>
                          {item.isPopular && (
                            <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                              Popular
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
                      <Calendar size={32} className="mx-auto text-amber-500 mb-3" />
                      <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                        No Available Slots
                      </h4>
                      <p className="text-amber-700 dark:text-amber-400 mb-4">
                        This doctor has no available slots for the selected date.
                      </p>
                      <button 
                        onClick={() => setSlotIndex(slotIndex === docSlots.length - 1 ? 0 : slotIndex + 1)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                      >
                        Check Next Date
                      </button>
                    </div>
                  )}
                </div>

                {/* Selected Slot Summary */}
                <AnimatePresence>
                  {slotTime && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700"
                    >
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                              Appointment Summary
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-green-600 dark:text-green-400" />
                                <span className="text-slate-700 dark:text-slate-300">
                                  {fullDays[docSlots[slotIndex][0].datetime.getDay()]}, 
                                  {docSlots[slotIndex][0].datetime.toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={16} className="text-green-600 dark:text-green-400" />
                                <span className="text-slate-700 dark:text-slate-300">
                                  {slotTime.toLowerCase()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Video size={16} className="text-green-600 dark:text-green-400" />
                                <span className="text-slate-700 dark:text-slate-300">
                                  {consultationType === "video" ? "Video Consultation" : 
                                   consultationType === "phone" ? "Phone Consultation" : "Clinic Visit"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <motion.button
                            onClick={handleBooking}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/30 transition-all"
                          >
                            Confirm Booking
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Right Column - Booking Summary & Info */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Booking Summary Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sticky top-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Booking Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Consultation Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currencySymbol}{consultationType === "video" ? docInfo.fees : 
                       consultationType === "phone" ? docInfo.fees - 200 : docInfo.fees + 300}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Platform Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currencySymbol}99
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Tax (18%)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currencySymbol}{(docInfo.fees * 0.18).toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {currencySymbol}
                        {Math.round(
                          (consultationType === "video" ? docInfo.fees : 
                           consultationType === "phone" ? docInfo.fees - 200 : docInfo.fees + 300) 
                          + 99 + (docInfo.fees * 0.18)
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    What's Included
                  </h4>
                  <div className="space-y-3">
                    {[
                      "30-minute consultation",
                      "Digital prescription",
                      "Follow-up recommendations",
                      "Health record access",
                      "24/7 chat support"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Need Help */}
                <div className="mt-8">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center">
                    <MessageCircle size={24} className="mx-auto text-blue-500 mb-2" />
                    <div className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Need Help Booking?
                    </div>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Chat with our support team
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Doctors */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
          </motion.div>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !bookingStatus && setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {bookingStatus === "processing" ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Processing Booking
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Please wait while we confirm your appointment...
                  </p>
                </div>
              ) : bookingStatus === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Booking Successful!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Your appointment has been confirmed. Redirecting to your appointments...
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Confirm Booking
                  </h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Doctor</span>
                        <span className="font-semibold">{docInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Date & Time</span>
                        <span className="font-semibold">
                          {fullDays[docSlots[slotIndex][0].datetime.getDay()]}, {slotTime.toLowerCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Type</span>
                        <span className="font-semibold">
                          {consultationType === "video" ? "Video Consult" : 
                           consultationType === "phone" ? "Phone Consult" : "Clinic Visit"}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-900 dark:text-white font-bold">Total</span>
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {currencySymbol}
                            {Math.round(
                              (consultationType === "video" ? docInfo.fees : 
                               consultationType === "phone" ? docInfo.fees - 200 : docInfo.fees + 300) 
                              + 99 + (docInfo.fees * 0.18)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      Confirm & Pay
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Appointment;