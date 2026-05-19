import { motion } from 'motion/react';
import { User as UserIcon, Settings, Package, CreditCard, Bell, LogOut, ChevronRight, Bookmark } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const menuItems = [
    { icon: Package, label: 'Order History', sub: '9 Items Delivered' },
    { icon: CreditCard, label: 'Payment Methods', sub: 'Visa **** 4421' },
    { icon: Bookmark, label: 'Saved Addresses', sub: '2 Locations' },
    { icon: Bell, label: 'Notifications', sub: 'Stay updated on drops' },
    { icon: Settings, label: 'Settings', sub: 'Security & Preferences' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Identity Required</h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-10">Access the archive as an elite member</p>
        <button 
          onClick={() => navigate('/auth')}
          className="w-full h-16 bg-white text-black rounded-3xl font-black uppercase italic tracking-tighter hover:bg-[#FFD700] transition-all"
        >
          Identify Yourself
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header/Profile Info */}
      <section className="px-6 pt-16 pb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#FFD700]/5 blur-[100px] rounded-full" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative inline-block mb-6"
        >
          <div className="w-28 h-28 rounded-[40px] bg-zinc-900 border-2 border-[#FFD700]/30 overflow-hidden mx-auto p-1">
            <div className="w-full h-full rounded-[34px] bg-zinc-800 flex items-center justify-center text-[#FFD700]">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover rounded-[34px]" />
              ) : (
                <UserIcon size={48} strokeWidth={1} />
              )}
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#FFD700] rounded-2xl flex items-center justify-center text-black border-4 border-black">
            <Settings size={14} />
          </div>
        </motion.div>

        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-1">
          {user.displayName || 'SECURED USER'}
        </h1>
        <p className="text-[10px] text-[#FFD700] font-bold uppercase tracking-[0.3em] mb-4">Elite Member Since {new Date(user.metadata.creationTime || '').getFullYear()}</p>
        
        <div className="flex justify-center gap-6">
          <div className="text-center">
             <p className="text-lg font-black text-white italic">12</p>
             <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Saved</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
             <p className="text-lg font-black text-white italic">09</p>
             <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Orders</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
             <p className="text-lg font-black text-white italic">2.4k</p>
             <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Points</p>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="px-6 space-y-3">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full flex items-center justify-between p-5 bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 rounded-[28px] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#FFD700] group-hover:scale-110 transition-transform">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white uppercase italic">{item.label}</h3>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{item.sub}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-white/20 group-hover:translate-x-1 transition-all" />
          </motion.button>
        ))}

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-5 text-red-500 font-bold uppercase text-xs tracking-[0.2em] justify-center mt-10 hover:bg-red-500/5 rounded-2xl transition-colors"
        >
          <LogOut size={16} />
          Sign Out Authority
        </motion.button>
      </section>
      
      <div className="py-12 text-center">
         <p className="text-[8px] text-white/10 font-bold uppercase tracking-[0.4em]">Bodwé Klodynn v1.0.4</p>
      </div>
    </div>
  );
}
