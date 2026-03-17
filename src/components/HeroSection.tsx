import { useRef, Suspense } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";
import HeroScene from "./HeroScene";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      className="relative h-svh bg-black text-white"
    >
      {/* Background 3D Scene */}
      <div className="absolute inset-0 overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene scrollProgress={scrollYProgress} />
        </Suspense>
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        <div className="flex flex-1 flex-col justify-end p-12 md:p-20 pointer-events-auto">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            {/* Main Heading - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <h1 className="text-[18vw] font-bold leading-[0.8] tracking-tighter md:text-[14vw] lg:text-[240px] uppercase">
                Forgje<span className="text-primary">*</span>
              </h1>
            </motion.div>

            {/* Description & CTA - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex max-w-sm flex-col gap-8 md:text-left"
            >
              <p className="text-base md:text-lg leading-relaxed text-white/50">
                Forgje is a next-generation platform for digital builders.
                Search code, build applications, and ship faster with
                infrastructure-grade AI workflows.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <a href="#cta" className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-primary hover:text-white">
                  Get started
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
