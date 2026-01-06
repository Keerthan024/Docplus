import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Heart,
  Stethoscope,
  Smartphone,
  Globe,
  CheckCircle
} from "lucide-react";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formVariant, setFormVariant] = useState("login");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Form validation
  const validateForm = () => {
    if (!isLogin) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return false;
      }
      if (!agreedToTerms) {
        toast.error("Please agree to the terms and conditions");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(`Welcome ${isLogin ? "back" : "to DocPlus"}! 🎉`, {
          icon: "👋"
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const toggleForm = () => {
    setFormVariant(isLogin ? "signup" : "login");
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAgreedToTerms(false);
  };

  const handleForgotPassword = () => {
    toast.info("Password reset feature coming soon!");
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login integration coming soon!`);
  };

  const benefits = [
    { icon: <Stethoscope size={20} />, text: "500+ Verified Doctors" },
    { icon: <Shield size={20} />, text: "HIPAA Secure & Encrypted" },
    { icon: <Heart size={20} />, text: "Personalized Care Plans" },
    { icon: <Smartphone size={20} />, text: "24/7 Mobile Access" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 p-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            x: ["0%", "10%", "0%"],
            y: ["0%", "-10%", "0%"],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            x: ["0%", "-8%", "0%"],
            y: ["0%", "12%", "0%"],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Column - Benefits */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex flex-col justify-center p-8"
        >
          <div className="max-w-lg">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                <Stethoscope size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">DocPlus</h1>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Healthcare Simplified</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Your Health Journey Starts Here
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Join thousands of patients who trust DocPlus for their healthcare needs. 
              Access top specialists, manage appointments, and take control of your health.
            </p>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl">
                    <div className="text-blue-600 dark:text-blue-400">
                      {benefit.icon}
                    </div>
                  </div>
                  <span className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white dark:border-slate-800"></div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">10,000+</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Happy Patients</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">98%</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            {/* Form Container */}
            <motion.div
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
              layout
            >
              {/* Form Header */}
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                  <Sparkles size={16} className="text-white" />
                  <span className="text-sm font-semibold text-white uppercase tracking-widest">
                    {isLogin ? "Welcome Back" : "Get Started"}
                  </span>
                </div>
                
                <motion.h2
                  className="text-3xl font-bold text-white"
                  key={formVariant}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLogin ? "Sign In to Continue" : "Create Your Account"}
                </motion.h2>
                <p className="text-blue-100 mt-2">
                  {isLogin ? "Access your personalized healthcare dashboard" : "Join our community of health-conscious individuals"}
                </p>
              </motion.div>

              {/* Form Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.form
                    key={formVariant}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                          Full Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
                          </div>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                          placeholder="••••••••"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {!isLogin && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                          Must be at least 8 characters
                        </p>
                      )}
                    </div>

                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                          Confirm Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Terms & Conditions */}
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3"
                      >
                        <button
                          type="button"
                          onClick={() => setAgreedToTerms(!agreedToTerms)}
                          className="flex-shrink-0 mt-1"
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            agreedToTerms
                              ? "bg-blue-500 border-blue-500"
                              : "border-slate-300 dark:border-slate-600 hover:border-blue-500"
                          }`}>
                            {agreedToTerms && (
                              <CheckCircle size={14} className="text-white" />
                            )}
                          </div>
                        </button>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          I agree to the{" "}
                          <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Privacy Policy
                          </button>
                        </p>
                      </motion.div>
                    )}

                    {/* Forgot Password */}
                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          Forgot your password?
                        </button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className={`w-full flex justify-center items-center py-4 px-6 rounded-xl font-semibold focus:outline-none transition-all ${
                        isLoading
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-xl"
                      }`}
                      whileHover={!isLoading ? { y: -2, scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          {isLogin ? "Signing In..." : "Creating Account..."}
                        </>
                      ) : (
                        <>
                          {isLogin ? "Sign In to Your Account" : "Create Free Account"}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                </AnimatePresence>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { provider: "Google", color: "bg-red-500 hover:bg-red-600" },
                    { provider: "Apple", color: "bg-slate-800 hover:bg-slate-900" }
                  ].map((social) => (
                    <motion.button
                      key={social.provider}
                      type="button"
                      onClick={() => handleSocialLogin(social.provider)}
                      className={`${social.color} text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Globe size={20} />
                      {social.provider}
                    </motion.button>
                  ))}
                </div>

                {/* Toggle Form */}
                <div className="text-center">
                  <p className="text-slate-600 dark:text-slate-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <motion.button
                    type="button"
                    onClick={toggleForm}
                    className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center justify-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLogin ? "Sign up for free" : "Sign in instead"}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Security Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Shield size={14} />
                <span>Your data is protected with 256-bit encryption</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;