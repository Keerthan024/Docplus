import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { assets } from '../assets/assets'
import { FiMapPin, FiPhone, FiMail, FiArrowRight, FiMessageSquare, FiClock, FiSend, FiUser, FiMessageCircle } from 'react-icons/fi'
import { TbBrandWhatsapp } from 'react-icons/tb'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  }

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 300 }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setFormData({ name: '', email: '', phone: '', message: '', service: '' })
      alert('Thank you for your message! We\'ll get back to you soon.')
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactMethods = [
    {
      icon: <FiPhone />,
      title: "Phone Support",
      details: "+91 96784 51230",
      subtitle: "Mon-Fri, 9AM-6PM",
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      action: "tel:+919678451230"
    },
    {
      icon: <FiMail />,
      title: "Email",
      details: "support@docplus.com",
      subtitle: "Response within 24 hours",
      color: "bg-gradient-to-br from-purple-500 to-pink-400",
      action: "mailto:support@docplus.com"
    },
    {
      icon: <TbBrandWhatsapp />,
      title: "WhatsApp",
      details: "Chat with us",
      subtitle: "Instant response",
      color: "bg-gradient-to-br from-green-500 to-emerald-400",
      action: "https://wa.me/919678451230"
    }
  ]

  const services = [
    "General Inquiry",
    "Technical Support",
    "Partnership",
    "Careers",
    "Feedback"
  ]

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-[#151515]"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 mix-blend-multiply filter blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-teal-400 to-emerald-300 mix-blend-multiply filter blur-[140px]"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay filter blur-[80px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
            <FiMessageCircle className="text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Connect</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-cyan-500 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about Doc+? We're here to help. Reach out to our team for inquiries, support, or partnership opportunities.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Contact Methods Cards */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                variants={cardHoverVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="block group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`${method.color} p-3 rounded-xl text-white shadow-lg`}>
                      <div className="text-xl">{method.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-gray-900 dark:text-gray-100 font-medium text-base mb-1">
                        {method.details}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FiClock className="mr-1" /> {method.subtitle}
                      </p>
                    </div>
                    <FiArrowRight className="text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
                    <p className="text-gray-600 dark:text-gray-300">We'll respond as soon as possible</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white">
                    <FiMessageSquare className="text-xl" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiUser className="inline mr-2" /> Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all group-hover:border-primary/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiMail className="inline mr-2" /> Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all group-hover:border-primary/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiPhone className="inline mr-2" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all group-hover:border-primary/50"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all group-hover:border-primary/50"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all group-hover:border-primary/50 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="text-lg" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Office Location & Additional Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FiMapPin className="text-primary mr-3" />
                Visit Our Office
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-lg font-medium">2nd Ward, K R Nagara</p>
                <p className="text-lg">Mysore, Karnataka</p>
                <p className="text-lg">INDIA - 570024</p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact