import { useRef } from "react";
import { useScroll, motion } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      className="relative h-svh bg-transparent text-white"
    >
      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center h-full pt-20 relative z-10 text-center">
          <div className="max-w-4xl flex flex-col items-center">
            {/* Main Heading - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center"
            >
              <h1 className="text-[18vw] font-bold leading-[0.8] tracking-tighter md:text-[14vw] lg:text-[180px] uppercase glow-text-strong">
                Forgje<span className="text-primary">*</span>
              </h1>
            </motion.div>

            {/* Description - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex max-w-sm flex-col gap-8 text-center mt-12"
            >
              <p className="text-base md:text-lg leading-relaxed text-white/50">
                Forgje is a next-generation platform for digital builders.
                Search code, build applications, and ship faster with
                infrastructure-grade AI workflows.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
