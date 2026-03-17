import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrbitDemo = () => {
  const [step, setStep] = useState(0); // 0: Idle, 1: Typing, 2: Architecting, 3: Assembling, 4: Revealed
  const [text, setText] = useState("");
  const fullText = "Create a high-fidelity research portal for deep space nebulae exploration with real-time telemetry...";

  useEffect(() => {
    const runCycle = async () => {
      // Phase 0: Idle
      setStep(0);
      setText("");
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 1: Typing
      setStep(1);
      for (let i = 0; i <= fullText.length; i++) {
        setText(fullText.slice(0, i));
        await new Promise(r => setTimeout(r, 25));
      }
      await new Promise(r => setTimeout(r, 800));
      
      // Phase 2: Architecting (Wireframe Grid)
      setStep(2);
      await new Promise(r => setTimeout(r, 1500));
      
      // Phase 3: Assembling (Components snapping in)
      setStep(3);
      await new Promise(r => setTimeout(r, 2500));
      
      // Phase 4: Revealed (High-Fi)
      setStep(4);
      await new Promise(r => setTimeout(r, 6000));
      
      runCycle();
    };

    runCycle();
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050505] rounded-[2rem] overflow-hidden flex flex-col items-center justify-center p-8 group">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-at-c from-white/[0.03] to-transparent pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {step <= 1 && (
          <motion.div
            key="prompt-area"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg glass-card-strong p-8 border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Orbit / Generator / v2.1</span>
            </div>
            <p className="text-xl font-mono text-white/80 leading-relaxed min-h-[100px] tracking-tight">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-2.5 h-6 bg-white inline-block ml-1 align-middle"
              />
            </p>
          </motion.div>
        )}

        {(step >= 2 && step <= 3) && (
          <motion.div
            key="assembly-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* The Wireframe Construction */}
            <div className="w-full aspect-video max-w-2xl bg-white/[0.02] border border-white/10 rounded-xl relative overflow-hidden p-4 grid grid-cols-12 grid-rows-6 gap-3">
              {/* Navbar Wireframe */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-12 h-6 bg-white/10 rounded flex items-center px-4 gap-4"
              >
                <div className="w-12 h-2.5 bg-white/20 rounded-full" />
                <div className="flex-1" />
                <div className="w-8 h-2.5 bg-white/10 rounded-full" />
                <div className="w-8 h-2.5 bg-white/10 rounded-full" />
              </motion.div>

              {/* Sidebar Wireframe */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: step >= 3 ? 1 : 0.3, x: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-3 row-span-5 bg-white/[0.05] rounded-lg border border-white/5 p-4 flex flex-col gap-4"
              >
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-full h-2 bg-white/10 rounded-full" />
                ))}
              </motion.div>

              {/* Hero Block */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: step >= 3 ? 1 : 0.2 }}
                transition={{ delay: 0.4 }}
                className="col-span-9 row-span-3 bg-white/[0.08] rounded-xl border border-white/5 flex flex-col items-center justify-center gap-4"
              >
                <div className="w-3/4 h-6 bg-white/10 rounded-full" />
                <div className="w-1/2 h-3 bg-white/5 rounded-full" />
              </motion.div>

              {/* Feature Cards */}
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: step >= 3 ? 1 : 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="col-span-3 row-span-2 bg-white/[0.03] rounded-lg border border-white/5"
                />
              ))}

              {/* Status Indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">
                  {step === 2 ? "Architecting layout..." : "Assembling components..."}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>

              {/* Scanning Line */}
              <motion.div 
                animate={{ y: ["0%", "500%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-px bg-white/20 blur-sm pointer-events-none"
              />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="result-area"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
            {/* Generated Website Mockup */}
            <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.05)]">
              <img 
                src="/orbit_generated.png" 
                alt="Generated Site" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[8000ms]"
              />
              
              {/* Overlay Label */}
              <div className="absolute top-6 left-6 glass-card-strong px-5 py-2.5 border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/90 uppercase tracking-[0.3em]">Deployment Success: nebulae_research_h5</span>
                </div>
              </div>
              
              {/* Shine Effect */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
              />
            </div>
            
            {/* Ambient Atmosphere */}
            <div className="absolute -inset-20 bg-white/[0.02] blur-3xl rounded-full pointer-events-none -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrbitDemo;
