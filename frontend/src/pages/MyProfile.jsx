import React, { useContext, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Edit,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  Camera,
  Shield,
  Users,
  Heart,
  Stethoscope,
  Settings,
  LogOut,
  Bell,
  FileText,
  Award,
  Clock
} from "lucide-react";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);
  const fileInputRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Gender options
  const genderOptions = ["Not Specified", "Male", "Female", "Other"];

  // Stats (simulated data)
  const userStats = [
    { icon: <Heart size={20} />, label: "Appointments", value: "24" },
    { icon: <Stethoscope size={20} />, label: "Doctors", value: "12" },
    { icon: <FileText size={20} />, label: "Prescriptions", value: "8" },
    { icon: <Award size={20} />, label: "Health Score", value: "92%" }
  ];

  // Update user profile
  const updateUserProfileData = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    if (isEdit) {
      fileInputRef.current.click();
    }
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                My Profile
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage your personal information and health preferences
              </p>
            </div>
            
            {!isEdit && (
              <motion.button
                onClick={() => setIsEdit(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit size={20} />
                Edit Profile
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Overview */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Profile Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Profile Image */}
                    <motion.div
                      whileHover={isEdit ? { scale: 1.05 } : {}}
                      whileTap={isEdit ? { scale: 0.95 } : {}}
                      onClick={handleImageClick}
                      className={`relative ${isEdit ? "cursor-pointer" : ""}`}
                    >
                      <img
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt="Profile"
                      />
                      
                      {isEdit && (
                        <>
                          <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Camera size={32} className="text-white" />
                          </div>
                          <input
                            ref={fileInputRef}
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            className="hidden"
                            accept="image/*"
                          />
                        </>
                      )}
                      
                      <div className="absolute -bottom-3 -right-3 p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
                        <Shield size={20} className="text-white" />
                      </div>
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="mb-2">
                        {isEdit ? (
                          <input
                            type="text"
                            value={userData.name}
                            onChange={(e) =>
                              setUserData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="text-2xl font-bold bg-transparent border-b border-white/30 focus:outline-none focus:border-white text-white text-center sm:text-left w-full"
                            placeholder="Your Name"
                          />
                        ) : (
                          <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                        )}
                        <p className="text-blue-100 mt-1">Patient Member Since 2023</p>
                      </div>
                      
                      {/* Verification Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <Shield size={14} className="text-white" />
                        <span className="text-sm text-white font-medium">Verified Patient</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {userStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <div className="text-blue-600 dark:text-blue-400">
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Personal Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                        <User size={20} className="text-blue-500" />
                        Personal Information
                      </h3>
                      
                      {/* Email */}
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Mail size={16} />
                          Email
                        </div>
                        <p className="text-slate-900 dark:text-white font-medium">
                          {userData.email}
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Phone size={16} />
                          Phone
                        </div>
                        {isEdit ? (
                          <input
                            type="text"
                            value={userData.phone}
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
                            placeholder="Enter phone number"
                          />
                        ) : (
                          <p className="text-slate-900 dark:text-white font-medium">
                            {userData.phone || "Not provided"}
                          </p>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <User size={16} />
                          Gender
                        </div>
                        {isEdit ? (
                          <div className="relative">
                            <button
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                            >
                              <span>{userData.gender}</span>
                              <ChevronDown
                                className={`transition-transform ${
                                  dropdownOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {dropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-200 dark:border-slate-600 overflow-hidden"
                                >
                                  {genderOptions.map((option) => (
                                    <div
                                      key={option}
                                      className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer text-slate-700 dark:text-slate-300"
                                      onClick={() => {
                                        setUserData((prev) => ({
                                          ...prev,
                                          gender: option,
                                        }));
                                        setDropdownOpen(false);
                                      }}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <p className="text-slate-900 dark:text-white font-medium">
                            {userData.gender}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Address & DOB */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                        <MapPin size={20} className="text-blue-500" />
                        Address
                      </h3>
                      
                      {isEdit ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">
                              Address Line 1
                            </label>
                            <input
                              type="text"
                              value={userData.address.line1}
                              onChange={(e) =>
                                setUserData((prev) => ({
                                  ...prev,
                                  address: {
                                    ...prev.address,
                                    line1: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
                              placeholder="Street address"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">
                              Address Line 2
                            </label>
                            <input
                              type="text"
                              value={userData.address.line2}
                              onChange={(e) =>
                                setUserData((prev) => ({
                                  ...prev,
                                  address: {
                                    ...prev.address,
                                    line2: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
                              placeholder="Apartment, suite, etc."
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-slate-900 dark:text-white font-medium">
                            {userData.address.line1}
                          </p>
                          {userData.address.line2 && (
                            <p className="text-slate-900 dark:text-white font-medium">
                              {userData.address.line2}
                            </p>
                          )}
                          <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Primary Address
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                        <Calendar size={20} className="text-blue-500" />
                        Date of Birth
                      </h3>
                      
                      {isEdit ? (
                        <input
                          type="date"
                          value={userData.dob}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              dob: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
                        />
                      ) : (
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium">
                            {userData.dob}
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Your date of birth helps us personalize your healthcare
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit Actions */}
                {isEdit && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-slate-100 dark:border-slate-700"
                  >
                    <motion.button
                      onClick={() => {
                        setIsEdit(false);
                        setImage(false);
                      }}
                      className="flex-1 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      onClick={updateUserProfileData}
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Quick Actions & Preferences */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <Bell size={20} />, label: "Notification Settings", color: "text-purple-600" },
                  { icon: <Settings size={20} />, label: "Account Settings", color: "text-blue-600" },
                  { icon: <Stethoscope size={20} />, label: "Health Records", color: "text-green-600" },
                  { icon: <Users size={20} />, label: "Family Members", color: "text-amber-600" },
                  { icon: <FileText size={20} />, label: "Medical History", color: "text-red-600" }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                      {action.icon}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Health Preferences */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 shadow-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Health Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Email Notifications</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">SMS Reminders</span>
                  <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Share Health Data</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Shield size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Account Verified</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Your identity is verified</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Last Login</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Today, 10:30 AM</div>
                  </div>
                </div>

                <motion.button
                  className="w-full mt-4 px-4 py-3 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={18} />
                  Sign Out
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;