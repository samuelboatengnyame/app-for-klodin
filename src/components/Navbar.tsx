import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: ShoppingBag, path: '/cart', label: 'Cart' },
    { icon: Heart, path: '/wishlist', label: 'Wishlist' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <nav id="bottom-navbar" className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-white/5 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "relative flex flex-col items-center justify-center w-full h-full transition-all duration-300",
                  isActive ? "text-[#FFD700] scale-110" : "text-white/40 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                  <span className={cn(
                    "text-[8px] mt-1 font-black uppercase tracking-widest hidden sm:block italic transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator-glow"
                      className="absolute inset-0 bg-[#FFD700]/5 blur-xl rounded-full z-0"
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator-bar"
                      className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-[#FFD700] shadow-[0_0_10px_#FFD700]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        {/* iPhone Style Home Bar */}
        <div className="w-32 h-1 bg-white/10 mx-auto mb-2 rounded-full" />
      </div>
    </nav>
  );
}
