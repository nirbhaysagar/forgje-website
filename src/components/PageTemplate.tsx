import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalBackground from "./GlobalBackground";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";

interface PageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
}

const PageTemplate = ({ title, subtitle, description }: PageTemplateProps) => {
  return (
    <SmoothScroll>
      <GlobalBackground />
      <div className="min-h-screen bg-transparent text-foreground overflow-hidden">
        <CustomCursor />
        <Navbar />
        
        <main className="pt-48 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-label mb-8 block text-primary">{subtitle}</span>
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-12 text-white">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-white/40 max-w-2xl leading-relaxed mb-16">
                {description}
              </p>
              
              {/* Placeholder Content Area */}
              <div className="w-full aspect-video rounded-[3rem] border border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
                <div className="text-center z-10">
                  <span className="text-[10px] uppercase tracking-[1em] text-white/20 mb-4 block">System Status</span>
                  <h3 className="text-white text-2xl font-mono">STAGING_ENVIRONMENT_ACTIVE</h3>
                  <div className="mt-8 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default PageTemplate;
