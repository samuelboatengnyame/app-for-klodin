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
    <nav id="bottom-navbar" className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "relative flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive ? "text-[#FFD700]" : "text-white/50 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium hidden sm:block">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-px left-1/4 right-1/4 h-0.5 bg-[#FFD700]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
