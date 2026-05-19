import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-black">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center text-black mb-8"
        >
          <CheckCircle2 size={48} strokeWidth={3} />
        </motion.div>
        
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
          GRAIL<br />SECURED
        </h1>
        <p className="text-[10px] text-[#FFD700] font-bold uppercase tracking-[0.4em] mb-12">Order #BK-882910</p>
        
        <p className="text-white/40 text-sm mb-12 uppercase font-bold tracking-widest leading-relaxed">
          Your identity has been verified.<br />Processing for shipment.
        </p>

        <button 
          onClick={() => navigate('/')}
          className="w-full h-16 bg-white text-black rounded-2xl font-black uppercase italic tracking-tighter hover:bg-[#FFD700] transition-all"
        >
          Return To Archive
        </button>
      </div>
    );
  }

  return (
    <div className="pb-40 px-6 pt-10">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-3 bg-zinc-900 rounded-2xl text-white border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">Checkout</h1>
          <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest leading-none">Secure Authority Portal</p>
        </div>
      </header>

      <div className="space-y-6">
        {/* Shipping */}
        <section className="bg-zinc-900 p-6 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#FFD700]">
              <MapPin size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest italic">Shipping Authority</h3>
          </div>
          
          <div className="space-y-4">
            <input 
              placeholder="Full Name"
              className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm font-bold placeholder:text-white/10 focus:outline-none focus:border-[#FFD700]/30"
            />
            <input 
              placeholder="Shipping Address"
              className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm font-bold placeholder:text-white/10 focus:outline-none focus:border-[#FFD700]/30"
            />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="City" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm font-bold placeholder:text-white/10" />
              <input placeholder="Phone" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm font-bold placeholder:text-white/10" />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="bg-zinc-900 p-6 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#FFD700]">
              <CreditCard size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest italic">Payment Method</h3>
          </div>
          
          <div className="space-y-4">
             <div className="p-4 bg-white/5 border border-[#FFD700]/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-5 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                   <span className="text-xs font-mono">**** 4421</span>
                </div>
                <div className="w-4 h-4 rounded-full border-4 border-[#FFD700] bg-black" />
             </div>
             <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/5 rounded-2xl border-dashed">
                Add New Authority
             </button>
          </div>
        </section>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-white/20">
          <ShieldCheck size={14} />
          <p className="text-[8px] font-black uppercase tracking-[0.2em]">End-To-End Encrypted Secure Checkout</p>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full h-16 bg-white text-black rounded-[24px] font-black uppercase italic tracking-tighter flex items-center justify-between px-8 hover:bg-[#FFD700] transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Confirm & Place Order'}
            {!loading && <ArrowRight size={24} strokeWidth={2.5} />}
          </button>
          <div className="w-32 h-1 bg-white/10 mx-auto mt-4 rounded-full" />
        </div>
      </footer>
    </div>
  );
}
