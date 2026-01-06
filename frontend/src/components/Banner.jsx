import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, Clock, Sparkles, ChevronRight, Star} from 'lucide-react'
import { assets } from '../assets/assets.js'
import { useState, useEffect } from 'react'

const Banner = () => {
    const navigate = useNavigate()
    const [currentStatIndex, setCurrentStatIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    
    // Magnetic Button Effect Logic
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

    // Stats rotation
    const stats = [
        { value: "500+", label: "Verified Doctors", icon: "👨‍⚕️" },
        { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
        { value: "15 min", label: "Avg. Wait Time", icon: "⏱️" },
        { value: "24/7", label: "Available Support", icon: "🔄" }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatIndex((prev) => (prev + 1) % stats.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = (mouseX / width - 0.5) * 25 // Increased effect
        const yPct = (mouseY / height - 0.5) * 25
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section className="relative px-4 md:px-6 lg:px-8 py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-cyan-50/30"></div>
                
                {/* Floating Orbs */}
                <motion.div 
                    animate={{
                        x: ["0%", "20%", "0%"],
                        y: ["0%", "-20%", "0%"],
                    }}
                    transition={{ 
                        duration: 25, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatType: "mirror"
                    }}
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-cyan-100/30 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{
                        x: ["0%", "-15%", "0%"],
                        y: ["0%", "15%", "0%"],
                    }}
                    transition={{ 
                        duration: 30, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatType: "mirror"
                    }}
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-teal-100/30 to-emerald-100/20 rounded-full blur-3xl"
                />
                
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                                        linear-gradient(to bottom, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-7xl mx-auto"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
                        {/* Trust Badge */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-blue-100 shadow-sm mb-8 group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles size={16} className="text-blue-500" />
                            </motion.div>
                            <span className="text-sm font-semibold text-blue-700">
                                #1 Rated Healthcare Platform
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1 
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-slate-900">Healthcare</span>
                            <br />
                            <span className="relative">
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Reimagined
                                </span>
                                <motion.div 
                                    className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                />
                            </span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p 
                            className="text-xl text-slate-600 mb-10 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Connect instantly with top specialists, manage your health digitally, and receive 
                            <span className="font-semibold text-slate-900"> personalized care </span>
                            that fits your lifestyle.
                        </motion.p>

                        {/* Animated Stats */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-8 mb-10 justify-center lg:justify-start"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStatIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="text-4xl">{stats[currentStatIndex].icon}</div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">
                                            {stats[currentStatIndex].value}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {stats[currentStatIndex].label}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            
                            <div className="hidden sm:flex items-center gap-2">
                                {stats.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentStatIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            currentStatIndex === index 
                                                ? 'bg-blue-600 w-4' 
                                                : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                            {/* Primary CTA with Magnetic Effect */}
                            <motion.div
                                style={{ x: mouseXSpring, y: mouseYSpring }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeaveCapture={() => setIsHovered(false)}
                                className="relative inline-block"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                <motion.button
                                    onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                                    className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="relative z-10">Get Started Free</span>
                                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                                    
                                    {/* Shine effect */}
                                    {isHovered && (
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            </motion.div>

                            {/* Secondary CTA */}
                            <motion.button
                                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:border-blue-300 hover:bg-white transition-all"
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <span>Browse Doctors</span>
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </motion.button>
                        </div>

                        {/* Trust Indicators */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex flex-wrap items-center gap-8 justify-center lg:justify-start"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1,2,3,4,5].map((i) => (
                                        <motion.div 
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-cyan-100 shadow-sm"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        />
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-900">10,000+</div>
                                    <div className="text-sm text-slate-500">Happy Patients</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    {[1,2,3,4,5].map((i) => (
                                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-900">4.9/5</div>
                                    <div className="text-sm text-slate-500">Trustpilot Rating</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Section */}
                    <motion.div 
                        className="flex-1 relative w-full max-w-2xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <motion.div
                                className="relative rounded-3xl overflow-hidden shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={assets.appointment_img}
                                    alt="Doctor and patient having a consultation"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                            </motion.div>

                            {/* Floating Cards */}
                            <motion.div 
                                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -left-4 lg:-left-8 top-12 bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-xl z-20 hidden md:block max-w-[220px]"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Clock size={18} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Next Available</p>
                                        <p className="text-sm font-bold text-slate-900">Today, 10:30 AM</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-600 font-medium">Available Now</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                className="absolute -right-4 lg:-right-8 bottom-12 bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-xl z-20 hidden md:block max-w-[220px]"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Users size={18} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Active Now</p>
                                        <p className="text-sm font-bold text-slate-900">42 Doctors</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="flex -space-x-2">
                                                {[1,2,3,4].map((i) => (
                                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-blue-200"></div>
                                                ))}
                                            </div>
                                            <span className="text-xs text-blue-600 font-medium">Online</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Animated Decorative Elements */}
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity,
                                    ease: "easeInOut" 
                                }}
                                className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl pointer-events-none"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default Banner