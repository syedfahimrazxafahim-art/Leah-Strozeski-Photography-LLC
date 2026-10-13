import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  image: string;
  title: string;
}

interface ImageTrailProps {
  images: Array<{ url: string; title: string }>;
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  maxItems?: number;
}

export const ImageTrail: React.FC<ImageTrailProps> = ({
  images,
  children,
  className = '',
  threshold = 65,
  maxItems = 5,
}) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const imageIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const idCounter = useRef(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice.current || images.length === 0) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Position relative to viewport for fixed floating rendering
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!lastPos.current) {
        lastPos.current = { x: currentX, y: currentY };
        return;
      }

      const dx = currentX - lastPos.current.x;
      const dy = currentY - lastPos.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= threshold) {
        lastPos.current = { x: currentX, y: currentY };

        const currentImage = images[imageIndex.current % images.length];
        imageIndex.current += 1;

        const rotation = (Math.random() - 0.5) * 12; // -6deg to +6deg
        const newItem: TrailItem = {
          id: idCounter.current++,
          x: currentX,
          y: currentY,
          rotation,
          image: currentImage.url,
          title: currentImage.title,
        };

        setTrail((prev) => [...prev.slice(-(maxItems - 1)), newItem]);
      }
    },
    [images, maxItems, threshold]
  );

  const handleMouseLeave = () => {
    lastPos.current = null;
    // Clear trail smoothly
    setTimeout(() => {
      setTrail([]);
    }, 400);
  };

  // Auto remove oldest item after 850ms
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [trail]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {children}

      {/* Floating trail images overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.65,
                rotate: item.rotation,
                x: item.x,
                y: item.y,
              }}
              animate={{
                opacity: 0.95,
                scale: 1,
                rotate: item.rotation,
                x: item.x,
                y: item.y,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                filter: 'blur(4px)',
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                translateX: '-50%',
                translateY: '-50%',
              }}
              className="pointer-events-none origin-center"
            >
              <div className="relative h-56 w-40 overflow-hidden rounded-sm border border-white/20 bg-black/90 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md sm:h-64 sm:w-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover grayscale contrast-110"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 text-left">
                  <p className="font-serif text-[11px] font-medium tracking-wide text-white truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
