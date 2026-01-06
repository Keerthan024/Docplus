import { useState } from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Search, ArrowRight, Stethoscope, Filter, Heart, Clock } from 'lucide-react';

const SpecialityMenu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Filter specialties based on search
  const filteredSpecialties = specialityData.filter(item =>
    item.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Display either all or limited specialties
  const displayedSpecialties = showAll ? filteredSpecialties : filteredSpecialties.slice(0, 12);

  const popularSpecialties = [
    'Cardiology',
    'Dermatology', 
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Dentistry'
  ];

  // Mock data for specialist counts
  const getSpecialistCount = (specialty) => {
    const counts = {
      'Cardiology': 45,
      'Dermatology': 32,
      'Pediatrics': 28,
      'Orthopedics': 36,
      'Neurology': 24,
      'Dentistry': 40,
      'Gynecology': 30,
      'Psychiatry': 22,
      'Ophthalmology': 26,
      'ENT': 18
    };
    return counts[specialty] || Math.floor(Math.random() * 40) + 15;
  };

  return (
    <section 
      id="specialty"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mb-6"
          >
            <Sparkles size={16} className="text-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
              Expert Medical Care
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Find Your{' '}
            <span className="relative inline-block">
              <span className="text-slate-900">Specialist</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Connect with board-certified specialists across 50+ medical fields. 
            <span className="block text-sm text-slate-500 mt-2 font-medium">
              Average wait time: <span className="text-green-600 font-bold">15 minutes</span> • Satisfaction rate: <span className="text-green-600 font-bold">98%</span>
            </span>
          </motion.p>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialties, symptoms, or conditions..."
                className="w-full pl-14 pr-24 py-4 text-lg bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <span className="text-sm text-slate-500 hidden sm:block">
                  {filteredSpecialties.length} specialties found
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <Search size={16} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Popular Filters */}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <span className="text-sm text-slate-600 font-medium flex items-center gap-2">
                <Filter size={14} /> Popular:
              </span>
              {popularSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSearchQuery(specialty)}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    searchQuery === specialty
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specialties Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
            {displayedSpecialties.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: Math.min(index, 12) * 0.05, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                onHoverStart={() => setSelectedSpecialty(item.speciality)}
                onHoverEnd={() => setSelectedSpecialty(null)}
              >
                <Link
                  to={`/doctors/${item.speciality.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block"
                >
                  <motion.div
                    className="relative overflow-hidden bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer"
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Badge for popular specialties */}
                    {popularSpecialties.includes(item.speciality) && (
                      <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-orange-500 to-orange-400 text-[10px] text-white font-bold rounded-full shadow-sm">
                        POPULAR
                      </div>
                    )}

                    {/* Icon Container */}
                    <div className="relative mb-5">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={selectedSpecialty === item.speciality ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="relative z-10 p-4 bg-gradient-to-br from-black to-blue-600 rounded-2xl shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow duration-300">
                        <img 
                          src={item.image} 
                          alt={item.speciality} 
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>

                    {/* Specialty Info */}
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {item.speciality}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Stethoscope size={12} />
                          <span className="font-semibold text-slate-700">
                            {getSpecialistCount(item.speciality)}+
                          </span>
                          <span className="text-slate-500">specialists</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={10} />
                        <span>24/7 availability</span>
                      </div>
                    </div>

                    {/* Hover Action */}
                    <motion.div 
                      className="mt-4 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                      animate={selectedSpecialty === item.speciality ? {
                        x: [0, 2, 0]
                      } : {}}
                    >
                      <span className="text-xs font-semibold">Book Now</span>
                      <ArrowRight size={12} />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* View More/Less Button */}
        {filteredSpecialties.length > 12 && (
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all group"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{showAll ? 'Show Less Specialties' : `View All ${filteredSpecialties.length} Specialties`}</span>
              <motion.div
                animate={{ rotate: showAll ? -180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl">
                <Heart size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900">Need help choosing?</h3>
                <p className="text-slate-600 text-sm">Our medical team can guide you to the right specialist</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-slate-900 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">
              Talk to Medical Advisor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialityMenu;