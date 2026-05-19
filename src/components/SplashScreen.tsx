import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-2">BODWÉ</h1>
          <p className="text-[10px] text-[#FFD700] font-bold uppercase tracking-[0.6em]">KLODYNN</p>
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          className="absolute -bottom-4 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16"
      >
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-1 h-1 bg-[#FFD700] rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
