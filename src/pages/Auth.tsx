import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-8 pt-20 pb-10 bg-black relative">
       {/* Decorative */}
       <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none" />

       <div className="relative z-10">
         <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="mb-12"
         >
           <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-2">
             {isLogin ? 'WELCOME BACK' : 'JOIN THE ARCHIVE'}
           </h1>
           <p className="text-[10px] text-[#FFD700] font-bold uppercase tracking-[0.4em]">Bodwé Klodynn Authority</p>
         </motion.div>

         {error && (
           <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest">
             {error}
           </div>
         )}

         <div className="space-y-4">
           {!isLogin && (
             <div className="relative">
               <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
               <input
                 type="text"
                 placeholder="Display Name"
                 value={displayName}
                 onChange={(e) => setDisplayName(e.target.value)}
                 className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD700]/30 transition-all font-bold tracking-tight"
               />
             </div>
           )}
           
           <div className="relative">
             <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
             <input
               type="email"
               placeholder="Email Address"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD700]/30 transition-all font-bold tracking-tight"
             />
           </div>

           <div className="relative">
             <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD700]/30 transition-all font-bold tracking-tight"
             />
           </div>

           <button 
             onClick={handleAuth}
             disabled={loading}
             className="w-full h-16 mt-4 bg-white text-black rounded-3xl flex items-center justify-between px-8 font-black uppercase italic tracking-tighter hover:bg-[#FFD700] transition-all transform active:scale-95 disabled:opacity-50"
           >
             {loading ? 'Processing...' : (isLogin ? 'Access Identity' : 'Create Identity')}
             <ArrowRight size={24} />
           </button>
         </div>

         <div className="mt-10">
           <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-white/10 flex-1" />
             <span className="text-[8px] text-white/20 font-bold uppercase tracking-[0.2em]">Authority Provider</span>
             <div className="h-px bg-white/10 flex-1" />
           </div>

           <button 
             onClick={handleGoogleSignIn}
             className="w-full h-16 border border-white/10 rounded-3xl flex items-center justify-center gap-4 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all mb-4"
           >
             <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale invert" alt="Google" />
             Google Access
           </button>
           
           <button className="w-full h-16 border border-white/10 rounded-3xl flex items-center justify-center gap-4 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all opacity-50 cursor-not-allowed">
             <Github size={20} />
             Github Sync
           </button>
         </div>

         <div className="mt-12 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] hover:text-[#FFD700] transition-colors"
            >
              {isLogin ? "Don't Have An Identity? Sign Up" : "Already Identified? Log In"}
            </button>
         </div>
       </div>

       <div className="mt-auto pt-10 text-center">
          <p className="text-[8px] text-white/10 font-bold uppercase tracking-[0.4em]">Bodwé Klodynn Secure Portal</p>
       </div>
    </div>
  );
}
