import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/product/') || location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD700] selection:text-black overflow-hidden relative">
      {/* Background Typographic Watermark */}
      <div className="fixed -top-10 -left-10 text-[200px] font-black opacity-5 leading-none tracking-tighter pointer-events-none select-none z-0">BODWÉ</div>
      <div className="fixed bottom-10 -right-10 text-[150px] font-black opacity-3 leading-none tracking-tighter pointer-events-none select-none z-0">KLODYNN</div>

      <div className="max-w-lg mx-auto bg-black min-h-screen shadow-2xl shadow-white/5 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        {!hideNavbar && <Navbar />}
      </div>
    </div>
  );
}
