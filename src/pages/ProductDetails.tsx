import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ArrowLeft, Heart, ShoppingBag, ChevronRight, Star, Sparkles } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '../lib/utils';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return <div className="p-20 text-center uppercase font-black italic">Item Lost In The Void</div>;

  const handleAddToBag = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and colorway');
      return;
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

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
            <Drawer 
              title="Sizing Guide" 
              content={
                <div className="space-y-6">
                  <p className="text-zinc-400 text-sm italic">Our pieces are designed with a deliberate oversized "modular" fit. For a true streetwear silhouette, stay with your normal size.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black uppercase text-[#FFD700] mb-1">Chest</p>
                      <p className="text-xl font-black italic">62-68CM</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black uppercase text-[#FFD700] mb-1">Length</p>
                      <p className="text-xl font-black italic">70-74CM</p>
                    </div>
                  </div>
                </div>
              } 
            />
            <Drawer 
              title="Materials & Tech" 
              content={
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFD700]/10 rounded-xl flex items-center justify-center text-[#FFD700]">100%</div>
                    <p className="text-sm font-bold uppercase italic">Heavyweight French Terry Cotton</p>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Utilizing a unique 480GSM weave, our "Bodwé-Tech" fabric provides structural integrity while maintaining a soft, breathable interior. Reinforced seams with gold-bonded thread for durability.
                  </p>
                </div>
              } 
            />
          </div>
        </motion.div>
      </section>

      {/* Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={handleAddToBag}
            className={cn(
              "w-full h-16 rounded-[24px] font-black uppercase italic tracking-tighter flex items-center justify-center gap-3 transition-all transform active:scale-95",
              isAdded ? "bg-[#FFD700] text-black" : "bg-white text-black hover:bg-[#FFD700]"
            )}
          >
            {isAdded ? (
              <>
                <Sparkles size={24} fill="currentColor" />
                Added To Bag
              </>
            ) : (
              <>
                <ShoppingBag size={24} strokeWidth={2.5} />
                Add To Bag
              </>
            )}
          </button>
        </div>
        {/* iPhone Style Home Bar */}
        <div className="w-32 h-1 bg-white/10 mx-auto mt-4 rounded-full" />
      </footer>
    </div>
  );
}

function Drawer({ title, content }: { title: string, content: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors group"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{title}</span>
        <ChevronRight size={18} className={cn("text-white/20 transition-transform duration-300", isOpen && "rotate-90 text-[#FFD700]")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-white/5">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
