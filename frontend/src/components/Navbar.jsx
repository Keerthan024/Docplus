import { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Sun, Moon, ChevronDown, ChevronRight, X, Menu, User, Calendar, LogOut, Settings, Bell, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)
  const [isDark, setIsDark] = useState(() =>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  // Dark mode toggle effect
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    setIsDropdownOpen(false)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const DarkModeToggle = () => (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div 
        className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border border-gray-200 dark:border-gray-700"
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-gray-600" />
        )}
      </motion.div>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </motion.button>
  )

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Find Doctors' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  const userMenuItems = [
    { icon: <User size={16} />, label: 'My Profile', path: '/my-profile' },
    { icon: <Calendar size={16} />, label: 'Appointments', path: '/my-appointments' },
    { icon: <LogOut size={16} />, label: 'Logout', action: logout }
  ]

  return (
    <>
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-800/50' 
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              <img 
                className="h-9 w-auto transition-all duration-300 hover:h-10" 
                src={isDark ? assets.logo_dark : assets.logo} 
                alt="DocPlus - Quality Healthcare" 
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      isActive 
                        ? 'text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20' 
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg"
                          layoutId="navActive"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search doctors and services"
              >
                <Search size={18} className="text-gray-600 dark:text-gray-300" />
              </motion.button>

              {/* Notification Bell (for logged in users) */}
              {token && (
                <motion.button
                  className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Notifications"
                >
                  <Bell size={18} className="text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </motion.button>
              )}

              {/* User Account or Login */}
              {token && userData ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    className="flex items-center gap-2 group px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="relative">
                      <img 
                        className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                        src={userData.image} 
                        alt={userData.name || "User profile"} 
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {userData.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userData.role || 'Patient'}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-2">
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="font-medium text-gray-900 dark:text-white">{userData.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</p>
                          </div>
                          {userMenuItems.map((item, index) => (
                            <motion.button
                              key={item.label}
                              onClick={() => {
                                if (item.action) {
                                  item.action()
                                } else {
                                  navigate(item.path)
                                }
                                setIsDropdownOpen(false)
                              }}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              whileHover={{ x: 4 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="text-gray-500 dark:text-gray-400">
                                {item.icon}
                              </div>
                              <span>{item.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-medium shadow-md hover:shadow-lg transition-all"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up Free
                  </motion.button>
                </div>
              )}

              <DarkModeToggle />

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowMenu(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4"
              initial={{ y: -20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              ref={searchRef}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, specialties, symptoms..."
                  className="w-full px-6 py-4 pl-14 text-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                  autoFocus
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <motion.button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {token && userData && (
                    <img 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
                      src={userData.image} 
                      alt="User" 
                    />
                  )}
                  <div>
                    <img 
                      className="h-7 w-auto" 
                      src={isDark ? assets.logo_dark : assets.logo} 
                      alt="Logo" 
                    />
                  </div>
                </div>
                <motion.button
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setShowMenu(false)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Mobile menu content */}
              <div className="h-[calc(100%-80px)] overflow-y-auto px-4 py-6">
                {/* Search in mobile menu */}
                <div className="mb-6">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-4 py-3 pl-12 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </form>
                </div>

                {/* Navigation links */}
                <div className="space-y-2 mb-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                            isActive
                              ? 'bg-primary/10 text-primary dark:text-primary-light'
                              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          }`
                        }
                        onClick={() => setShowMenu(false)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <ChevronRight size={16} className="opacity-50" />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* User section for logged in */}
                {token && userData && (
                  <div className="mb-8">
                    <h3 className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      Account
                    </h3>
                    <div className="space-y-2">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            if (item.action) {
                              item.action()
                            } else {
                              navigate(item.path)
                            }
                            setShowMenu(false)
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                          <div className="text-gray-500 dark:text-gray-400">
                            {item.icon}
                          </div>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Auth buttons for non-logged in */}
                {!token && (
                  <div className="space-y-3">
                    <motion.button
                      onClick={() => {
                        navigate('/login')
                        setShowMenu(false)
                      }}
                      className="w-full px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:border-primary dark:hover:border-primary-light"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        navigate('/signup')
                        setShowMenu(false)
                      }}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-medium shadow-md"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up Free
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar