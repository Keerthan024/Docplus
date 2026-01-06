import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500"
    >
      {/* Animated Logo */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <div className="relative">
          <Heart size={64} className="text-white" />
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">DocPlus Healthcare</h2>
        <p className="text-blue-100">Loading your medical experience...</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-8 w-48 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-white to-blue-100"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;