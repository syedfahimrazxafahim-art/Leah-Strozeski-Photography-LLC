import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex < 0) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex < 0) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIdx);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!photo) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, handleNext, handlePrev]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={photo.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 lg:p-10 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Minimal top bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm tracking-widest text-neutral-300">
              {photo.title}
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-mono tracking-wider text-neutral-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-all hover:border-white/80 hover:bg-white/10"
              aria-label="Close image viewer (Esc)"
              data-cursor="pointer"
            >
              <X className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-all hover:border-white/80 hover:bg-white/10"
          aria-label="Previous photograph (Left Arrow)"
          data-cursor="pointer"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-all hover:border-white/80 hover:bg-white/10"
          aria-label="Next photograph (Right Arrow)"
          data-cursor="pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Focused High-Resolution Image Container */}
        <div
          className="relative max-h-[85vh] max-w-[90vw] select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={photo.id}
            src={photo.url}
            alt={photo.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-sm shadow-2xl"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Minimal metadata strip below photograph */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span>{photo.category}</span>
              <span aria-hidden="true">·</span>
              <span>{photo.year}</span>
              <span aria-hidden="true">·</span>
              <span>{photo.exif.lens}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500">
              <span>{photo.exif.aperture}</span>
              <span>{photo.exif.shutter}</span>
              <span>{photo.exif.iso}</span>
            </div>
          </div>
        </div>

        {/* Mobile quick swipe / prev next tap footer */}
        <div
          className="absolute bottom-4 inset-x-0 flex sm:hidden justify-center items-center gap-8 text-neutral-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handlePrev}
            className="px-4 py-2 text-xs uppercase tracking-widest border border-white/20 rounded-sm"
          >
            Prev
          </button>
          <span className="text-xs font-mono">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            onClick={handleNext}
            className="px-4 py-2 text-xs uppercase tracking-widest border border-white/20 rounded-sm"
          >
            Next
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
