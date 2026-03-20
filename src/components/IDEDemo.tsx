import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeStream = [
  "import { useOrbit } from '@forion/core';",
  "import { physics } from '@forion/physics';",
  "",
  "export const GalaxyRenderer = () => {",
  "  const { system } = useOrbit();",
  "  ",
  "  // Initializing high-precision gravity web",
  "  const gravity = physics.createGravityWeb({",
  "    focalPoint: system.center,",
  "    intensity: 0.98,",
  "    decay: 'orbital'",
  "  });",
  "",
  "  // Autonomous Refactoring Triggered",
  "  const optimizeLensing = () => {",
  "    return gravity.map(node => ({",
  "      ...node,",
  "      lensing: Math.sin(node.distance) * 2.5",
  "    }));",
  "  };",
  "",
  "  return (",
  "    <QuantumVisualizer",
  "      data={optimizeLensing()}",
  "      mode='cinematic'",
  "    />",
  "  );",
  "};",
  "",
  "// System Diagnostics: Optimized",
  "// Build Success: 1.2s",
];

const IDEDemo = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const streamInterval = setInterval(() => {
      setLineIndex((prev) => {
        const next = prev + 1;
        if (next > codeStream.length) return 0; // Restart stream
        return next;
      });
    }, 150);

    return () => clearInterval(streamInterval);
  }, []);

  useEffect(() => {
    setVisibleLines(codeStream.slice(0, lineIndex));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lineIndex]);

  return (
    <div className="relative w-full h-full bg-[#0a0a0c] rounded-[1.5rem] overflow-hidden flex flex-col border border-white/5 group">
      {/* IDE Header */}
      <div className="h-10 bg-[#16161a] flex items-center px-6 border-b border-white/5 justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
        <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
          forion_studio / src / components / GalaxyRenderer.tsx
        </div>
        <div className="flex items-center gap-4">
          <div className="h-1 w-8 bg-blue-500/40 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Main UI Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Mini */}
        <div className="w-16 bg-[#111114] border-r border-white/5 flex flex-col items-center py-6 gap-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-6 h-6 rounded bg-white/${i === 0 ? '10' : '5'} flex items-center justify-center`}>
              <div className="w-2.5 h-2.5 bg-white/20 rounded-sm" />
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div
          ref={scrollRef}
          className="flex-1 p-8 font-mono text-xs md:text-sm leading-relaxed overflow-y-auto scrollbar-hide bg-[#0a0a0c]"
        >
          <AnimatePresence initial={false}>
            {visibleLines.map((line, i) => (
              <motion.div
                key={`${i}-${line}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-6 mb-1 whitespace-pre"
              >
                <span className="w-8 text-right text-white/10 select-none">{i + 1}</span>
                <span className={`
                  ${line.includes('import') ? 'text-blue-400/80' : ''}
                  ${line.includes('export') || line.includes('const') || line.includes('return') ? 'text-purple-400/80' : ''}
                  ${line.includes('//') ? 'text-white/20 italic' : 'text-white/80'}
                  ${line.includes('<') ? 'text-blue-300/60' : ''}
                `}>
                  {line}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Cursor */}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="w-1.5 h-4 bg-blue-500 ml-14 mt-1"
          />
        </div>

        {/* Floating AI Status */}
        <div className="absolute top-16 right-8 glass-card border-blue-500/20 p-4 min-w-[180px] shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest">Agent Active</span>
          </div>
          <div className="text-[10px] text-white/40 font-mono">
            Running physics pass...
          </div>
          <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-100, 150] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-blue-500/60"
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="h-6 bg-[#16161a] border-t border-white/5 px-4 flex items-center justify-between opacity-40">
        <div className="flex items-center gap-4 text-[8px] font-mono text-white/60">
          <span>Branch: main-physics</span>
          <span>UTF-8</span>
          <span>Typescript 5.2</span>
        </div>
        <div className="flex items-center gap-2 text-[8px] font-mono text-white/60">
          <span>Ln: {lineIndex}</span>
          <span>Col: 12</span>
        </div>
      </div>
    </div>
  );
};

export default IDEDemo;
