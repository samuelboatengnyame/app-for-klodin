import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ArrowLeft, Heart, ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) return <div className="p-20 text-center uppercase font-black italic">Item Lost In The Void</div>;

  return (
    <div className="pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white border border-white/10 pointer-events-auto hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <button className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white border border-white/10 pointer-events-auto hover:bg-[#FFD700] hover:text-black transition-all">
          <Heart size={20} />
        </button>
      </header>

      {/* Image Gallery */}
      <section className="relative h-[60vh] bg-zinc-900 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </section>

      {/* Content */}
      <section className="px-6 -mt-20 relative z-10">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-[#FFD700]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">(128 Reviews)</span>
          </div>
          
          <h1 className="text-4xl font-black text-white leading-none mb-2 uppercase italic tracking-tighter">
            {product.name}
          </h1>
          <p className="text-3xl font-black text-[#FFD700] italic mb-6">GH₵{product.price}</p>
          
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mb-8">
            <h3 className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-4">Choose Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition-all border",
                    selectedSize === size 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-white border-white/10 hover:border-white/40"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-4">Colorway</h3>
            <div className="flex flex-wrap gap-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "group flex flex-col items-center gap-2",
                    selectedColor === color ? "opacity-100" : "opacity-40 hover:opacity-70"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2",
                    selectedColor === color ? "border-[#FFD700]" : "border-transparent"
                  )} style={{ backgroundColor: color.toLowerCase().includes('black') ? '#1a1a1a' : color.toLowerCase().includes('white') ? '#f5f5f5' : '#8B8000' }} />
                  <span className="text-[8px] font-bold uppercase">{color}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Guide/Detail Links */}
          <div className="space-y-2 mb-10">
            <button className="w-full flex items-center justify-between p-4 bg-zinc-900 rounded-2xl group">
              <span className="text-[10px] font-bold uppercase tracking-widest">Sizing Guide</span>
              <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-zinc-900 rounded-2xl group">
              <span className="text-[10px] font-bold uppercase tracking-widest">Materials & Tech</span>
              <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-lg mx-auto flex gap-4">
          <button className="flex-1 bg-white text-black h-16 rounded-[24px] font-black uppercase italic tracking-tighter flex items-center justify-center gap-3 hover:bg-[#FFD700] transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            <ShoppingBag size={24} strokeWidth={2.5} />
            Add To Bag
          </button>
        </div>
      </footer>
    </div>
  );
}
