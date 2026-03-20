import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Developers", href: "/developers" },
  { label: "Docs", href: "/docs" },
];

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 z-[1000] -translate-x-1/2 w-[90%] max-w-5xl"
    >
      <nav className="nav-capsule flex items-center justify-between px-4 py-2">
        {/* Branding / Logo */}
        <Link to="/" className="flex items-center gap-2 px-4 group">
          <div className="w-5 h-5 border-2 border-white/40 rotate-45 group-hover:rotate-90 group-hover:border-white transition-all duration-700" />
          <span className="text-[12px] font-mono font-bold tracking-[0.4em] uppercase text-white/80 group-hover:text-white transition-colors">
            Forion
          </span>
        </Link>

        {/* Navigation Links */}
        <div
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              className="relative px-6 py-2.5 text-[11px] font-mono font-bold uppercase tracking-[0.25em] transition-colors duration-500 z-10 text-white/40 hover:text-white"
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
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8
                  }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          <Link
            to="/launch"
            className="hidden sm:block px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95"
          >
            Launch Console
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
