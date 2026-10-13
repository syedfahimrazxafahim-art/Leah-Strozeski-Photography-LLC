import React from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/photography';
import { MorphHeading } from './MorphText';
import { GenerateButton } from './GenerateButton';

export const About: React.FC = () => {
  const aboutImage =
    'https://res.cloudinary.com/fzobzdco/image/upload/v1791931052/842366745_18114464558025639_1862734101910343607_n.jpg';

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#000000] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: One Large Editorial Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[82%] overflow-hidden rounded-sm border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] aspect-[4/5] bg-neutral-950">
              <img
                src={aboutImage}
                alt="Portrait by Leah Strozeski Photography LLC"
                className="h-full w-full object-cover grayscale contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                <span>Leah Strozeski Photography LLC</span>
                <span>New York, NY</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
              Creative Philosophy
            </span>

            <MorphHeading
              as="h2"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-8"
            >
              The Art of Seeing.
            </MorphHeading>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl font-light leading-relaxed text-neutral-200 mb-6 font-serif italic"
            >
              “Photography is about more than what we see. It is about the atmosphere, the emotion,
              and the moments that deserve to be remembered.”
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base font-light leading-relaxed text-neutral-400 mb-10"
            >
              Working primarily across New York, each commission is treated with individual nuance,
              embracing natural luminescence, graphic shadow, and raw emotional resonance.
            </motion.p>

            {/* Editorial pillars */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 mb-10 text-xs">
              <div>
                <p className="uppercase tracking-[0.2em] text-neutral-500 mb-1">Focus</p>
                <p className="text-white font-medium">Editorial, Fine Art & Portraits</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.2em] text-neutral-500 mb-1">Base Location</p>
                <p className="text-white font-medium">{BUSINESS_INFO.location}</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GenerateButton
                variant="outline"
                size="md"
                href="#contact"
                onClick={scrollToContact}
                showIcon={true}
              >
                Inquire for Commissions
              </GenerateButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
