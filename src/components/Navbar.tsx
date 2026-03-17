import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Developers", href: "#developer" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 z-[1000] -translate-x-1/2 w-auto"
    >
      <nav className="nav-capsule flex items-center">
        <div 
          className="flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              className="relative px-6 py-2.5 text-[14px] font-medium transition-colors duration-500 z-10 text-white/50 hover:text-white"
            >
              {hoveredLink === link.label && (
                <motion.div
                  layoutId="nav-liquid-bubble"
                  className="nav-liquid-bubble absolute inset-0 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                    mass: 0.8
                  }}
                />
              )}
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
