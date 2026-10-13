import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'image' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for interactive states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, [data-cursor], input, textarea, select');
      if (interactiveEl) {
        const customType = interactiveEl.getAttribute('data-cursor');
        const customLabel = interactiveEl.getAttribute('data-cursor-text') || '';

        if (customType === 'image') {
          setCursorType('image');
          setCursorText(customLabel || 'VIEW');
        } else if (customType === 'text') {
          setCursorType('text');
          setCursorText(customLabel);
        } else {
          setCursorType('pointer');
          setCursorText(customLabel);
        }
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision inner center dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'image' ? 0 : cursorType === 'pointer' ? 6 : 4,
          height: cursorType === 'image' ? 0 : cursorType === 'pointer' ? 6 : 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Smooth outer follower ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border border-white/60 bg-white/5 backdrop-blur-[1px] transition-[width,height,background-color,border-color] duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'image' ? 72 : cursorType === 'pointer' ? 44 : 26,
          height: cursorType === 'image' ? 72 : cursorType === 'pointer' ? 44 : 26,
          borderColor: cursorType === 'image' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.45)',
          backgroundColor: cursorType === 'image' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.04)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-medium tracking-[0.2em] text-white uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};
