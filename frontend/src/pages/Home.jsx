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
        <Reviews />
        <Banner />
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