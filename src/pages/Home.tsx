import { motion } from 'motion/react';
import { CATEGORIES, PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import AIRecommendations from '../components/AIRecommendations';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="pb-24 pt-6">
      <AIRecommendations isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
      {/* Hero Section */}
      <section className="px-6 mb-12">
        <div className="text-[#FFD700] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase italic font-bold">Bodwé / Fall Winter 24</div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[480px] rounded-[48px] overflow-hidden bg-zinc-900 group border border-white/5 shadow-2xl shadow-yellow-500/5"
        >
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1200" 
            alt="Hero"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-4 inline-block bg-white text-black text-[8px] font-black px-2 py-0.5 tracking-[0.3em] uppercase italic">Limited Drop</div>
              <h2 className="text-7xl font-black text-white leading-[0.85] mb-6 italic uppercase tracking-tighter shadow-black drop-shadow-2xl">
                BEYOND<br />THE<br />STREETS
              </h2>
              <div className="flex gap-4">
                <button className="flex items-center gap-3 bg-white text-black px-6 h-14 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#FFD700] transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                  Shop Drop <ArrowRight size={18} />
                </button>
                <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 transition-all">
                  <Sparkles size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AI Recommendation Banner */}
      <section className="px-6 mb-10 text-center">
        <motion.button
          onClick={() => setIsAIModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-white/5 p-6 rounded-[32px] flex items-center justify-between"
        >
          <div className="text-left">
            <div className="flex items-center gap-2 text-[#FFD700] mb-1">
              <Sparkles size={16} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">AI Stylist</span>
            </div>
            <h3 className="text-white font-bold text-lg leading-tight uppercase italic">Curate My Look</h3>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <ArrowRight size={24} className="text-[#FFD700]" />
          </div>
        </motion.button>
      </section>

      {/* Categories */}
      <section className="mb-12 px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['All Drop', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All Drop' ? 'All' : cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] italic whitespace-nowrap transition-all border",
                (selectedCategory === 'All' && cat === 'All Drop') || selectedCategory === cat 
                  ? "bg-[#FFD700] text-black border-[#FFD700]" 
                  : "bg-zinc-900 text-white/50 border-white/5 hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">The Archive</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">{filteredProducts.length} Grails</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
