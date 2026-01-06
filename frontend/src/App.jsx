import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Chatbot from './components/Chatbot';
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
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Page transition animation
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main App */}
      <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 origin-left transform scale-x-0 z-50"
          style={{ transform: 'scaleX(var(--scroll))' }} />

        {/* Scroll to Top */}
        <ScrollToTop />

        <div className="relative z-10">
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastClassName="font-medium rounded-xl"
            progressClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
          />

          <Navbar />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
              <Routes location={location}>
                <Route path='/' element={<Home />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctors/:speciality' element={<Doctors />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/appointment/:docId' element={<Appointment />} />
                <Route path='/my-appointments' element={<MyAppointments />} />
                <Route path='/my-profile' element={<MyProfile />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <Footer />
          <Chatbot />
        </div>

      </div>
    </>
  )
}

export default App