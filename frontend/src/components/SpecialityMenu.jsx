import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const SpecialityMenu = () => {
  const controls = useAnimation();

  // Animate the background gradient
  React.useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%'],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <motion.section 
      className="relative py-20 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={controls}
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 mb-4 border border-gray-200 shadow-xs"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Medical Specialties
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Find by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Specialty</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Connect with specialized healthcare professionals for your specific needs
          </motion.p>
        </motion.div>

        {/* Specialties grid */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-6">
            {specialityData.map((item, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
              >
                <Link
                  to={`/doctors/${item.speciality}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group"
                >
                  <motion.div
                    className="w-48 h-56 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center cursor-pointer"
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.speciality} 
                        className="w-12 h-12 object-contain"
                      />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.speciality}
                    </h3>
                    <motion.div
                      className="w-8 h-0.5 bg-blue-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SpecialityMenu;