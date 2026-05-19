import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  // Mock cart items initially
  const [items, setItems] = useState([
    { ...PRODUCTS[0], quantity: 1, selectedSize: 'L', selectedColor: 'Jet Black' },
    { ...PRODUCTS[1], quantity: 2, selectedSize: 'XL', selectedColor: 'Graphic White' },
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-white/20">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Archive Is Empty</h2>
        <p className="text-white/40 text-sm mb-8 uppercase font-bold tracking-widest">Your bag awaits its identity</p>
        <Link to="/" className="w-full h-16 bg-white text-black rounded-2xl flex items-center justify-center font-black uppercase italic tracking-tighter hover:bg-[#FFD700] transition-all">
          Browse Drop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-40">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">The Bag</h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{items.length} Grails Secured</p>
      </header>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 p-4 rounded-3xl border border-white/5 flex gap-4"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-white uppercase italic line-clamp-1">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">{item.selectedSize}</span>
                    <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">{item.selectedColor}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-black text-[#FFD700] italic">GH₵{item.price}</p>
                  <div className="flex items-center gap-4 bg-black/40 rounded-xl p-1 px-2 border border-white/5">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-white"><Minus size={14} /></button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-white"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <section className="mt-12 space-y-4">
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-white/40 uppercase tracking-widest font-bold">Subtotal</span>
            <span className="text-white">GH₵{subtotal}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-white/40 uppercase tracking-widest font-bold">Shipping</span>
            <span className="text-white">GH₵{shipping}</span>
          </div>
          <div className="h-px bg-white/5 my-4" />
          <div className="flex justify-between items-center font-black">
            <span className="text-sm uppercase tracking-tighter italic">Total Amount</span>
            <span className="text-2xl text-[#FFD700] italic">GH₵{total}</span>
          </div>
        </div>
      </section>

      {/* Checkout Action */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-lg mx-auto flex gap-4">
          <button className="flex-1 bg-white text-black h-16 rounded-[24px] font-black uppercase italic tracking-tighter flex items-center justify-between px-8 hover:bg-[#FFD700] transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            Secure Checkout
            <ArrowRight size={24} strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </div>
  );
}
