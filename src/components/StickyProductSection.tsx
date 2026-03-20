import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductPanel from "./ProductPanel";

const products = [
  {
    title: "Orbit",
    description: "Turn ideas into real software.",
    cta: "Explore Orbit",
    mainImage: "/orbit_mockup.png",
    features: ["Prompt → full app", "Instant preview", "Editable code"],
  },
  {
    title: "Spark",
    description: "Autonomous agents for your codebase.",
    cta: "Explore Spark",
    mainImage: "/soon_mockup.png",
    features: ["GitHub integration", "Multi-agent workflows", "Async execution"],
  },
];

const StickyProductSection = () => {
  return (
    <section id="products" className="py-16 md:py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 px-6 md:px-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-white/20" />
              <span className="section-label mb-0">
                WE SHIP THE FUTURE OF AI WORKSPACE.
              </span>
            </div>
            <h2 className="section-heading">
              Core <span className="section-heading-muted">Infrastructure</span>
            </h2>
          </div>
        </div>

        {/* Product Panels - Normal Vertical Flow */}
        <div className="flex flex-col gap-24">
          {products.map((product, i) => (
            <ProductPanel
              key={i}
              title={product.title}
              description={product.description}
              features={product.features}
              cta={product.cta}
              index={i}
              mainImage={product.mainImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyProductSection;
