import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion, AnimatePresence } from 'framer-motion'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  }

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* App Wrapper */}
      <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">

        {/* Background blobs */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
        </div>

        {/* Scroll To Top */}
        <ScrollToTop />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          toastClassName="font-medium rounded-xl"
          progressClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
        />

        <Navbar />

        {/* 🔥 ROUTES (NO max-width wrapper) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Routes location={location}>
              {/* FULL WIDTH HOME */}
              <Route path="/" element={<Home />} />

              {/* NORMAL PAGES */}
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:speciality" element={<Doctors />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment/:docId" element={<Appointment />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <Footer />
        <Chatbot />
      </div>
    </>
  )
}

export default App
