import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MorphPhraseCycleProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
}

export const MorphPhraseCycle: React.FC<MorphPhraseCycleProps> = ({
  phrases,
  intervalMs = 4000,
  className = '',
  as: Tag = 'h1',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [phrases.length, intervalMs]);

  const currentPhrase = phrases[index];
  const words = currentPhrase.split(' ');

  return (
    <Tag className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-flex flex-wrap items-baseline gap-x-[0.28em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {words.map((word, wIdx) => (
            <motion.span
              key={`${index}-${wIdx}-${word}`}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.6,
                delay: wIdx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block whitespace-nowrap"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </Tag>
  );
};

interface MorphHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  delay?: number;
}

export const MorphHeading: React.FC<MorphHeadingProps> = ({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
}) => {
  const words = children.split(' ');

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        className="inline-flex flex-wrap items-baseline gap-x-[0.28em]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.65,
                  delay: delay + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};
