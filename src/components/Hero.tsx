import React from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/photography';
import { LightLines } from './LightLines';
import { GenerateButton } from './GenerateButton';
import { MorphPhraseCycle } from './MorphText';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-end pb-16 pt-32 sm:pb-24 lg:items-center lg:py-0 overflow-hidden bg-[#050505]"
    >
      {/* 1. Real Photography Background Layer (Crisp, sharp, never blurred or distorted) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={BUSINESS_INFO.heroBg}
          alt="Cinematic Photography by Leah Strozeski"
          className="h-full w-full object-cover object-center brightness-90 transition-transform duration-1000 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim for WCAG AA text legibility without muddying the photograph */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30 lg:bg-gradient-to-r lg:from-[#050505]/85 lg:via-[#050505]/45 lg:to-transparent" />
      </div>

      {/* 2. Isolated Animated Light Lines Canvas Layer (Complements the photograph in negative space) */}
      <LightLines className="z-10" />

      {/* 3. Hero Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400"
          >
            <span>{BUSINESS_INFO.location}</span>
            <span aria-hidden="true">·</span>
            <span>Editorial & Portrait Studio</span>
          </motion.div>

          {/* Morph Headline */}
          <div className="mb-6">
            <MorphPhraseCycle
              phrases={[
                'Every Frame Holds a Feeling.',
                'The Art of Honest Seeing.',
                'Moments Captured for Eternity.',
              ]}
              intervalMs={4500}
              className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl"
            />
          </div>

          {/* Supporting editorial copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg text-balance"
          >
            {BUSINESS_INFO.subheading}
          </motion.p>

          {/* Interactive Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <GenerateButton
              variant="primary"
              size="lg"
              onClick={() => scrollTo('#portfolio')}
              showIcon={true}
            >
              Explore Portfolio
            </GenerateButton>

            <GenerateButton
              variant="outline"
              size="lg"
              onClick={() => scrollTo('#contact')}
            >
              Get in Touch
            </GenerateButton>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-400"
      >
        <span>Scroll to Explore</span>
        <div className="h-6 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
};
