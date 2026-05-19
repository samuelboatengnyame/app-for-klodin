import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const wishlistItems = [PRODUCTS[0], PRODUCTS[2]]; // Mock wishlist

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-[#FFD700]/20">
          <Heart size={48} />
        </div>
        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Vault Is Empty</h2>
        <p className="text-white/40 text-sm mb-8 uppercase font-bold tracking-widest">Mark your favorites for the next drop</p>
        <Link to="/" className="w-full h-16 bg-white text-black rounded-2xl flex items-center justify-center font-black uppercase italic tracking-tighter hover:bg-[#FFD700] transition-all">
          Explore Drop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-24">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">The Vault</h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{wishlistItems.length} Grails Bookmarked</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-12 bg-[#FFD700] text-black p-6 rounded-[32px] flex items-center justify-between group"
      >
        <div className="text-left">
          <h3 className="font-black text-lg leading-tight uppercase italic">Add All To Bag</h3>
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60">Ready for secure checkout</p>
        </div>
        <div className="bg-black/10 p-3 rounded-2xl group-hover:translate-x-2 transition-transform">
          <ArrowRight size={24} />
        </div>
      </motion.button>
    </div>
  );
}
