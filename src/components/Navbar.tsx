import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/photography';
import { GenerateButton } from './GenerateButton';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
          {/* Zone 1: Brand Wordmark & Client Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-3 whitespace-nowrap shrink-0 text-white transition-opacity hover:opacity-90"
            data-cursor="pointer"
          >
            <img
              src={BUSINESS_INFO.logo}
              alt="Leah Strozeski Photography"
              className="h-8 w-auto invert object-contain brightness-200 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-lg font-light tracking-[0.18em] uppercase sm:text-xl text-neutral-100">
              Leah Strozeski
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative py-1 transition-colors hover:text-white whitespace-nowrap shrink-0"
                data-cursor="pointer"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:block">
              <GenerateButton
                variant="outline"
                size="sm"
                href="#contact"
                onClick={(e) => handleLinkClick(e as any, '#contact')}
                showIcon={true}
              >
                Inquire
              </GenerateButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-white md:hidden hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              data-cursor="pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#050505]/95 px-8 pt-28 pb-12 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">Navigation</p>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="font-serif text-3xl font-light tracking-wide text-neutral-200 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="space-y-6 border-t border-white/10 pt-8">
              <GenerateButton
                variant="primary"
                size="md"
                href="#contact"
                onClick={(e) => handleLinkClick(e as any, '#contact')}
                className="w-full text-center"
              >
                Book a Session
              </GenerateButton>
              <div className="flex justify-between text-xs tracking-wider text-neutral-400">
                <span>New York, USA</span>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-white transition-colors underline"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
