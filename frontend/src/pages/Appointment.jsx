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
} from "react-icons/fi";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);

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

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
    setIsLoading(false);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warning("Please select a time slot");
      return;
    }

    setBookingStatus("processing");

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = day + "_" + month + "_" + year;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        setBookingStatus("success");
        toast.success(data.message);
        setTimeout(() => {
          getDoctorsData();
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

  if (!docInfo)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Back button */}
      <motion.button
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-6"
      >
        <FiArrowLeft className="text-lg" />
        <span>Back</span>
      </motion.button>

      {/* Doctor Profile Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8"
      >
        {/* Doctor Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full lg:w-1/3 xl:w-1/4"
        >
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-square border-4 border-white dark:border-gray-800"
          />
        </motion.div>

        {/* Doctor Info */}
        <motion.div
          className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                {docInfo.name}
                <img
                  src={assets.verified_icon}
                  alt="Verified"
                  className="w-5 h-5"
                />
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-600 dark:text-gray-300">
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {docInfo.experience} years exp
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-cyan-50 dark:bg-cyan-900/30 px-4 py-2 rounded-lg">
              <span className="font-medium text-cyan-600 dark:text-cyan-400">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
              <FiClock className="text-primary" />
              About Doctor
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
              {docInfo.about}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Booking Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <FiCalendar className="text-primary" />
          Book Appointment
        </h2>

        {/* Date Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Select Date
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSlotIndex(index)}
                  className={`flex flex-col items-center justify-center min-w-[90px] p-4 rounded-xl cursor-pointer transition-colors ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="font-medium">
                    {shortDays[item[0]?.datetime.getDay()]}
                  </span>
                  <span className="text-sm">{item[0]?.datetime.getDate()}</span>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Available Time Slots
          </h3>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array(10)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"
                  ></div>
                ))}
            </div>
          ) : docSlots[slotIndex]?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {docSlots[slotIndex].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSlotTime(item.time)}
                  className={`p-3 rounded-lg text-center cursor-pointer transition-all ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {item.time.toLowerCase()}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-yellow-800 dark:text-yellow-200">
              No available slots for this day
            </div>
          )}
        </div>

        {/* Book Button */}
        <AnimatePresence>
          {slotTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <motion.button
                onClick={bookAppointment}
                disabled={bookingStatus === "processing"}
                whileHover={bookingStatus ? {} : { scale: 1.03 }}
                whileTap={bookingStatus ? {} : { scale: 0.97 }}
                className={`w-full sm:w-auto px-8 py-3 rounded-full font-medium text-white ${
                  bookingStatus === "processing"
                    ? "bg-primary/80"
                    : "bg-primary"
                } shadow-md hover:shadow-lg transition-all`}
              >
                {bookingStatus === "processing" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : bookingStatus === "success" ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiCheckCircle className="text-lg" />
                    Booked Successfully!
                  </span>
                ) : (
                  `Book Appointment for ${slotTime.toLowerCase()}`
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Related Doctors */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-20"
      >
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </motion.div>
    </motion.div>
  );
};

export default Appointment;
