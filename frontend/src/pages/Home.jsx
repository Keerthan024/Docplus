import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import SpecialityMenu from '../components/SpecialityMenu'
import Reviews from '../components/Reviews'
import { 
  Sparkles, 
  Clock, 
  Shield, 
  Users, 
  ArrowUp,
  HeartPulse,
  MessageSquare
} from 'lucide-react'

// Additional components you might want to add
// import Statistics from '../components/Statistics'
// import HowItWorks from '../components/HowItWorks'
// import MobileApp from '../components/MobileApp'

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Quick appointment booking stats (optional feature)
  const [quickStats, setQuickStats] = useState({
    appointmentsToday: 156,
    doctorsOnline: 42,
    averageWaitTime: '15 min'
  })

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Floating Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-6 bottom-32 z-40 flex flex-col gap-3"
      >
        {/* Quick Chat */}
        <motion.button
          className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Quick Chat Support"
        >
          <MessageSquare size={20} />
        </motion.button>

        {/* Emergency Contact */}
        <motion.button
          className="p-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Emergency Contact"
        >
          <HeartPulse size={20} />
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="relative">
        <Header />

        <SpecialityMenu />
        <TopDoctors />
        
        {/* How It Works Section (optional - you can add this component) */}
        {/* <HowItWorks /> */}
        
        <Reviews />
        
        {/* Statistics Section (optional - you can add this component) */}
        {/* <Statistics /> */}
        
        <Banner />
        
        {/* Mobile App CTA (optional - you can add this component) */}
        {/* <MobileApp /> */}

        {/* Quick Appointment CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 mb-6">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                Start Your Health Journey
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Take Control of Your Health?
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who found their perfect doctor through DocPlus. 
              Your first consultation is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Your First Appointment
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:border-blue-300 dark:hover:border-blue-500"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Talk to Health Advisor
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

// Don't forget to import AnimatePresence
import { AnimatePresence } from 'framer-motion'

export default Home