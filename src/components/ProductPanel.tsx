import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import OrbitDemo from "./OrbitDemo";
import IDEDemo from "./IDEDemo";

interface ProductPanelProps {
  title: string;
  description: string;
  cta: string;
  index: number;
  progress: any;
  total: number;
  mainImage: string;
}

const ProductPanel = ({
  title,
  description,
  cta,
  index,
  mainImage,
}: Omit<ProductPanelProps, "progress" | "total">) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full flex items-center justify-center p-0"
    >
      {/* Product Card / Panel */}
      <div className="relative w-full glass-card-strong border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center gap-12 p-8 md:p-20 shadow-[0_0_100px_rgba(0,0,0,0.4)]">

        {/* Cinematic Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-white/[0.015] to-transparent pointer-events-none" />

        {/* Content Layout */}
        <div className="flex-1 flex flex-col gap-8 relative z-20">
          <div className="flex flex-col gap-2">
            <span className="text-[20px] md:text-[30px] uppercase tracking-[0.2em] text-white/30 font-mono">Module // 0{index + 1}</span>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] uppercase">
              {title}
            </h2>
          </div>

          <p className="text-lg md:text-xl text-white/40 max-w-md leading-relaxed">
            {description}
          </p>

          <button className="group relative w-fit mt-4">
            <div className="absolute inset-0 bg-white blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative px-10 py-4 rounded-full bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-neutral-100 transition-all">
              {cta}
            </div>
          </button>
        </div>

        {/* Visual / Demo Area */}
        <div className={`flex-[1.2] w-full relative group h-[400px] md:h-auto md:aspect-video
                        ${title === "Forion IDE" ? "md:scale-110" : ""}`}>
          <div className={`w-full h-full rounded-[2rem] border overflow-hidden shadow-2xl transition-all duration-700 
                          ${title === "Orbit Builder"
              ? "bg-black/80 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              : title === "Forion IDE"
                ? "bg-black border-blue-500/30 shadow-[0_0_80px_rgba(59,130,246,0.15)]"
                : "bg-neutral-900/50 border-white/10 hover:border-white/20"}`}>

            {title === "Orbit Builder" ? (
              <OrbitDemo />
            ) : title === "Forion IDE" ? (
              <IDEDemo />
            ) : (
              <img
                src={mainImage}
                alt={title}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Internal trick to get count if not passed, though we'll pass it usually.
const productsCount = 3;

export default ProductPanel;
