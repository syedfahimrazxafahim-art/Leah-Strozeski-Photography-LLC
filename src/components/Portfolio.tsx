import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PhotoItem, CategoryFilter } from '../types';
import { PHOTOGRAPHY_COLLECTION } from '../data/photography';
import { MorphHeading } from './MorphText';
import { ImageTrail } from './ImageTrail';

interface PortfolioProps {
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectPhoto }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = ['All', 'Portraits', 'Editorial', 'Atmosphere', 'Monolith'];

  const filteredPhotos =
    activeCategory === 'All'
      ? PHOTOGRAPHY_COLLECTION
      : PHOTOGRAPHY_COLLECTION.filter((p) => p.category === activeCategory);

  // Selected works for the editorial text index with Image Trail
  const indexFeatures = PHOTOGRAPHY_COLLECTION.slice(0, 6);

  return (
    <section id="portfolio" className="relative py-28 sm:py-36 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-400">
              Selected Works · 2024–2025
            </p>
            <MorphHeading
              as="h2"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight"
            >
              Curated Portfolio
            </MorphHeading>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
                data-cursor="pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Curated Interactive Editorial Archive Index with Image Trail */}
        <div className="my-16 py-8 border-b border-white/10">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Editorial Index (Hover for Visual Trail)
            </span>
            <span className="text-xs font-mono text-neutral-500">
              {filteredPhotos.length} Works Cataloged
            </span>
          </div>

          <ImageTrail images={PHOTOGRAPHY_COLLECTION.map((p) => ({ url: p.url, title: p.title }))}>
            <div className="divide-y divide-white/5">
              {indexFeatures.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => onSelectPhoto(item)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] px-2"
                  data-cursor="image"
                  data-cursor-text="OPEN"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-neutral-600 transition-colors group-hover:text-neutral-400">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-neutral-200 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-6 text-xs text-neutral-400">
                    <span className="tracking-widest uppercase">{item.category}</span>
                    <span className="font-mono text-neutral-500">{item.exif.lens}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </div>
              ))}
            </div>
          </ImageTrail>
        </div>

        {/* 2. Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pt-6">
          {filteredPhotos.map((photo, index) => {
            // Creative editorial column spans for asymmetrical rhythm
            const isWide = index % 5 === 0;
            const isMedium = index % 5 === 1 || index % 5 === 2;
            const colSpan = isWide
              ? 'lg:col-span-12'
              : isMedium
              ? 'lg:col-span-6'
              : 'lg:col-span-6';

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: (index % 4) * 0.08 }}
                className={`group cursor-pointer ${colSpan}`}
                onClick={() => onSelectPhoto(photo)}
                data-cursor="image"
                data-cursor-text="VIEW"
              >
                <div className="w-full max-w-[82%] mx-auto">
                  <div className="relative overflow-hidden rounded-sm bg-neutral-900 border border-white/5 transition-all duration-500 group-hover:border-white/30">
                    <div
                      className={`w-full overflow-hidden ${
                        isWide ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[4/5] sm:aspect-[3/4]'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Gentle gradient overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Corner icon indicator on hover */}
                    <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 backdrop-blur-sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Clean Unboxed Metadata Strip */}
                  <div className="mt-3 flex items-baseline justify-between text-xs text-neutral-400">
                    <div>
                      <h4 className="font-serif text-lg text-white font-normal group-hover:text-neutral-200 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                        <span>{photo.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{photo.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{photo.exif.lens}</span>
                      </p>
                    </div>

                    <span className="font-mono text-[11px] text-neutral-500">
                      {photo.exif.aperture}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
