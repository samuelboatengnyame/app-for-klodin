import { motion } from 'motion/react';
import { Search as SearchIcon, Filter, TrendingUp, History } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const searchResults = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const trending = ['Limited Drops', 'Golden Collection', 'Utility Vests', 'Oversized Tees'];

  return (
    <div className="px-6 pt-10 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-6">Archive Search</h1>
        
        <div className="relative">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
          <input
            type="text"
            placeholder="Search collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD700]/30 transition-all font-bold tracking-tight"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/5 rounded-xl text-white/60">
            <Filter size={18} />
          </button>
        </div>
      </header>

      {!query ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-[#FFD700]" />
              <h3 className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Trending Now</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trending.map((item) => (
                <button 
                  key={item}
                  className="px-5 py-3 bg-zinc-900 border border-white/5 rounded-2xl text-xs font-bold hover:border-white/20 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
             <div className="flex items-center gap-2 mb-6">
              <History size={16} className="text-[#FFD700]" />
              <h3 className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Recent Search</h3>
            </div>
            <div className="space-y-3">
              {['Signature Hoodie', 'Custom Wear'].map((item) => (
                <button key={item} className="w-full flex items-center justify-between p-5 bg-zinc-900/50 rounded-2xl border border-white/5 group">
                  <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{item}</span>
                  <History size={14} className="opacity-20" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.section
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
           <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Search Results</h2>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{searchResults.length} Match</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <div className="py-20 text-center opacity-30 italic font-black uppercase text-2xl">No Grails Found</div>
          )}
        </motion.section>
      )}
    </div>
  );
}
