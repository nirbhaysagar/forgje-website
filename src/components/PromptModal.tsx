import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal = ({ isOpen, onClose }: PromptModalProps) => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl pointer-events-auto"
            >
            <div className="glass-card-strong p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-[0_0_120px_rgba(255,255,255,0.03)] relative overflow-hidden group">
              {/* Decorative Corner Glows */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-8 opacity-40">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white">Orbit / Command / Prompter</span>
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl font-light">×</span>
                </button>
              </div>

              {/* Input Area */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision... 'A neural research portal for deep-space visualization'"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-xl md:text-2xl font-mono text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all resize-none h-[280px] leading-relaxed tracking-tight"
                />
                
                {/* Floating Status */}
                <div className="absolute bottom-6 right-8 flex items-center gap-4 pointer-events-none">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    {prompt.length} chars
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">ESC</kbd> to close
                  </span>
                </div>

                <button 
                  className={`group relative px-12 py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.4em] overflow-hidden transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)] ${
                    prompt.trim() 
                      ? "bg-white text-black hover:scale-105" 
                      : "bg-white/10 text-white/20 cursor-not-allowed"
                  }`}
                  disabled={!prompt.trim()}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Future
                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 translate-y-[-1px] group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
  );
};

export default PromptModal;
