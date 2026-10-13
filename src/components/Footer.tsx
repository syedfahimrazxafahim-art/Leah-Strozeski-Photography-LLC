import React from 'react';
import { Facebook, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/photography';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#000000] text-neutral-400 border-t border-white/10 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 pb-14 border-b border-white/10">
          {/* Brand lockup */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 text-white mb-3">
              <img
                src={BUSINESS_INFO.logo}
                alt="Leah Strozeski Photography LLC"
                className="h-7 w-auto invert brightness-200"
              />
              <span className="font-serif text-lg tracking-[0.16em] uppercase">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-xs font-light text-neutral-400 leading-relaxed">
              Monochrome and cinematic photography studio based in {BUSINESS_INFO.location}.
              Dedicated to honest emotion, negative space, and timeless frames.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-8 text-xs uppercase tracking-widest text-neutral-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Direct Channels */}
          <div className="flex flex-col gap-2 text-xs">
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="text-white hover:text-neutral-300 font-mono transition-colors"
              data-cursor="pointer"
            >
              {BUSINESS_INFO.email}
            </a>
            <a
              href={BUSINESS_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors pt-1"
              data-cursor="pointer"
            >
              <Facebook className="h-3.5 w-3.5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            data-cursor="pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
