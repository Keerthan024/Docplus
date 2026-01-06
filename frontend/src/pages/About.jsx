import React, { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'
import { 
  Sparkles, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Heart,
  Target,
  BarChart,
  Globe,
  ChevronRight,
  Star,
  CheckCircle,
  Zap
} from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 1
      }
    }
  }

  const coreValues = [
    {
      icon: <Heart size={24} />,
      title: "Patient-Centric Care",
      description: "Every decision we make revolves around improving patient outcomes and experience.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Shield size={24} />,
      title: "Trust & Security",
      description: "Military-grade encryption and HIPAA compliance for your peace of mind.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap size={24} />,
      title: "Innovation",
      description: "Constantly evolving our platform with cutting-edge healthcare technology.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Users size={24} />,
      title: "Collaboration",
      description: "Building partnerships between patients, doctors, and healthcare systems.",
      color: "from-emerald-500 to-green-500"
    }
  ]

  const milestones = [
    { year: "2022", title: "Founded", description: "DocPlus was born with a vision to revolutionize healthcare access." },
    { year: "2023", title: "10K Patients", description: "Reached our first 10,000 satisfied patients across India." },
    { year: "2024", title: "500+ Doctors", description: "Onboarded 500+ verified specialists across 50+ specialties." },
    { year: "2025", title: "National Presence", description: "Expanded to 50+ cities across India." },
    { year: "2026", title: "AI Integration", description: "Launched AI-powered symptom checker and doctor matching." }
  ]

  const teamMembers = [
    { name: "Dr. Keerthan", role: "Medical Director", specialty: "Cardiology", experience: "15 years" },
    { name: " Ifwan", role: "Tech Lead", specialty: "Health Tech", experience: "10 years" },
    { name: "Varun", role: "Patient Success", specialty: "Healthcare Ops", experience: "8 years" },
    { name: "Dr. Ayush", role: "Advisor", specialty: "Neurology", experience: "20 years" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50 dark:to-slate-950/50" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
          >
            <Sparkles size={16} className="text-blue-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              Our Story & Mission
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Redefining{' '}
            <span className="relative inline-block">
              <span className="text-slate-900 dark:text-white">Healthcare</span>
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            At DocPlus, we're on a mission to make quality healthcare accessible, affordable, 
            and personalized for everyone. Your health journey starts here.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-28"
        >
          {/* Image */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2"
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={assets.about_image}
                alt="Doctor and patient consultation at DocPlus"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Patients Helped</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">50,000+</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 space-y-8"
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">DocPlus</span>, where we're transforming healthcare delivery through technology and compassion. Born from the vision of making quality healthcare accessible to all, we've created a platform that bridges the gap between patients and trusted medical professionals.
              </p>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Our journey began with a simple observation: quality healthcare shouldn't be complicated. Today, we're proud to serve thousands of patients and work with hundreds of verified specialists across India, delivering seamless healthcare experiences that put you first.
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    To democratize access to quality healthcare through technology, making it more 
                    accessible, affordable, and personalized for every individual, everywhere.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Verified Doctors</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">98%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Satisfaction Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-28"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-blue-600 dark:text-blue-400">Core Values</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              These principles guide every decision we make and every feature we build.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
                
                <div className={`p-3 rounded-xl bg-gradient-to-br ${value.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline / Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              Our <span className="text-blue-600 dark:text-blue-400">Journey</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              From a simple idea to transforming healthcare across India
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-cyan-400"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"></div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              Meet Our <span className="text-blue-600 dark:text-blue-400">Leaders</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              The passionate individuals driving healthcare innovation forward
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {member.specialty}
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  {member.experience} experience
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-12 border border-blue-200/50 dark:border-blue-800/30">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered a better way to manage their health with DocPlus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Free
              </motion.button>
              <motion.button
                className="px-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-blue-300 dark:hover:border-blue-500 transition-all"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Our Team
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About