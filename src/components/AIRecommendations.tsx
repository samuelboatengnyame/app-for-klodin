import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Loader2, ArrowRight } from 'lucide-react';

interface AIRecommendationsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Outfit {
  name: string;
  items: string[];
  vibe: string;
}

export default function AIRecommendations({ isOpen, onClose }: AIRecommendationsProps) {
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('');
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const getRecommendations = async () => {
    if (!style) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style, preferences: 'Modern urban streetwear, high-end' }),
      });
      const data = await response.json();
      setOutfits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-zinc-950 rounded-t-[40px] border-t border-white/10 max-w-lg mx-auto overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFD700] p-2 rounded-xl">
                  <Sparkles size={20} className="text-black" />
                </div>
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">AI Stylist</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-0 overflow-y-auto no-scrollbar flex-1">
              {outfits.length === 0 ? (
                <div className="py-10">
                  <p className="text-white/40 text-sm mb-6 uppercase font-bold tracking-widest text-center leading-relaxed">
                    Describe your mood or the event,<br />and let Bodwé curate your look.
                  </p>
                  <div className="relative mb-6">
                    <textarea
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      placeholder='e.g., "Late night gallery opening in Berlin"'
                      className="w-full bg-zinc-900 border border-white/5 rounded-3xl p-6 text-white text-lg font-bold placeholder:text-white/10 focus:outline-none focus:border-[#FFD700]/30 transition-all min-h-[150px] resize-none"
                    />
                    <button 
                      onClick={getRecommendations}
                      disabled={loading || !style}
                      className="absolute bottom-4 right-4 bg-[#FFD700] text-black w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50 transition-all hover:scale-110 active:scale-95"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Tokyo Night', 'Industrial', 'Minimalist', 'Vibrant'].map(mood => (
                      <button 
                        key={mood}
                        onClick={() => setStyle(mood)}
                        className="px-4 py-2 bg-zinc-900 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/5 hover:border-white/20 transition-all"
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-6">
                  {outfits.map((outfit, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-zinc-900 p-6 rounded-3xl border border-white/5"
                    >
                      <h4 className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Look {i + 1}</h4>
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">{outfit.name}</h3>
                      <p className="text-white/50 text-xs mb-4 leading-relaxed">{outfit.vibe}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {outfit.items.map(item => (
                          <span key={item} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold uppercase text-white/70 italic border border-white/10">{item}</span>
                        ))}
                      </div>
                      <button className="w-full h-12 bg-white text-black rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-[#FFD700] transition-colors">
                        View Outfit <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  ))}
                  <button 
                    onClick={() => setOutfits([])}
                    className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-[#FFD700] border border-[#FFD700]/20 rounded-2xl"
                  >
                    Refresh Stylist
                  </button>
                </div>
              )}
            </div>
            <div className="p-8 pt-0 pb-10">
              <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em] text-center">Bodwé Klodynn Powered By Gemini AI</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
