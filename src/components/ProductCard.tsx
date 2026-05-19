import { motion } from 'motion/react';
import { Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#121212] rounded-[32px] overflow-hidden border border-white/5"
    >
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#FFD700] text-black text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest z-20 italic">
            New Drop
          </div>
        )}
      </Link>
      
      <div className="absolute top-4 right-4 z-20">
        <button className="p-2 bg-black/40 backdrop-blur-md rounded-xl text-white hover:bg-[#FFD700] hover:text-black transition-colors">
          <Heart size={16} />
        </button>
      </div>

      <div className="p-5 absolute bottom-0 left-0 right-0 z-20">
        <div className="flex justify-between items-end">
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-[9px] text-[#FFD700] font-black uppercase tracking-[0.2em] mb-1 italic">{product.category}</p>
            <h3 className="text-xl font-black text-white tracking-tighter truncate uppercase italic leading-none">
              {product.name}
            </h3>
            <p className="text-sm text-zinc-400 font-mono mt-1">GH₵{product.price}.00</p>
          </div>
          <button className="p-3 bg-white text-black rounded-full hover:bg-[#FFD700] transition-all transform hover:scale-110 shadow-lg shadow-black/20">
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
