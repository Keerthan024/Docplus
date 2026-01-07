import { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaYoutube,
  FaHeart,
  FaStethoscope,
  FaPhoneAlt,
} from "react-icons/fa";
import { 
  Shield, 
  Award, 
  Clock, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const socialLinks = [
    { icon: <FaFacebook className="text-lg" />, name: "Facebook", color: "hover:text-blue-600" },
    { icon: <FaTwitter className="text-lg" />, name: "Twitter", color: "hover:text-sky-500" },
    { icon: <FaInstagram className="text-lg" />, name: "Instagram", color: "hover:text-pink-600" },
    { icon: <FaLinkedin className="text-lg" />, name: "LinkedIn", color: "hover:text-blue-700" },
    { icon: <FaYoutube className="text-lg" />, name: "YouTube", color: "hover:text-red-600" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Find Doctors", path: "/doctors" },
    { name: "Specialties", path: "/specialties" },
    { name: "Book Appointment", path: "/appointment" },
    { name: "Video Consult", path: "/video-consult" },
    { name: "Health Packages", path: "/packages" }
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Success Stories", path: "/success" },
    { name: "Careers", path: "/careers" },
    { name: "Press", path: "/press" },
    { name: "Blog", path: "/blog" }
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "FAQs", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Contact Support", path: "/contact" }
  ];

  const contactInfo = [
    { icon: <Phone size={16} />, type: "phone", value: "+91 96415582" },
    { icon: <Mail size={16} />, type: "email", value: "keerthancontact@gmail.com" },
    { icon: <MapPin size={16} />, type: "address", value: "K R Nagara, Mysore, Karnataka" }
  ];

  const trustBadges = [
    { icon: <Shield size={20} />, text: "HIPAA Compliant", color: "text-blue-600" },
    { icon: <Award size={20} />, text: "Certified Doctors", color: "text-green-600" },
    { icon: <Clock size={20} />, text: "24/7 Support", color: "text-purple-600" },
  ];

  return (
    <footer 
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 px-5 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className={`p-2 rounded-lg ${badge.color} bg-opacity-10`}>
                  {badge.icon}
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Footer Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16"
          >
            {/* Brand & Social */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <motion.div 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={assets.logo} 
                  alt="DocPlus - Quality Healthcare" 
                  className="h-12 w-auto bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
                />
              </motion.div>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                DocPlus revolutionizes healthcare access with seamless appointment booking, 
                real-time doctor availability, secure telemedicine, and personalized care plans.
                Your health, our priority.
              </p>
              
              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      variants={itemVariants}
                      href="#"
                      aria-label={social.name}
                      className={`p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all ${social.color}`}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h3 
                className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Sparkles size={16} className="text-blue-500" />
                Quick Links
              </motion.h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <a 
                      href={link.path}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h3 
                className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <FaStethoscope className="text-blue-500" />
                Company
              </motion.h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <a 
                      href={link.path}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h3 
                className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <FaPhoneAlt className="text-blue-500" />
                Contact
              </motion.h3>
              
              <ul className="space-y-4 mb-6">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                  >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <div className="text-blue-600 dark:text-blue-400">
                        {info.icon}
                      </div>
                    </div>
                    <span className="pt-1">{info.value}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Stay Updated</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get health tips and exclusive offers
                </p>
                
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="px-4 py-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-sm"
                    >
                      ✓ Thanks for subscribing! Check your email.
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubscribe}
                      className="space-y-3"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </motion.div>
                      <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-md hover:shadow-lg"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Subscribe</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.hr 
            className="border-slate-200 dark:border-slate-800"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} DocPlus. All rights reserved.</span>
              <motion.span 
                className="flex items-center gap-1 text-pink-600"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaHeart size={12} />
              </motion.span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {supportLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.path}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Back to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl z-50"
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowRight size={20} className="rotate-270" />
      </motion.button>
    </footer>
  );
};

export default Footer;