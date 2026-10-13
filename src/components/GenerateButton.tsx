import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface GenerateButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  showIcon = false,
  icon,
  className = '',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs tracking-wider',
    md: 'px-6 py-3 text-xs tracking-widest',
    lg: 'px-8 py-4 text-sm tracking-widest',
  }[size];

  const baseClasses =
    'group relative inline-flex items-center justify-center font-medium uppercase transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white select-none whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-neutral-200 border border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]',
    outline:
      'bg-black/40 backdrop-blur-md text-white border border-white/25 hover:border-white/80 hover:bg-white/10',
    ghost:
      'bg-transparent text-white/80 hover:text-white border border-transparent hover:border-white/15',
  }[variant];

  const content = (
    <>
      {/* Vengence UI animated sheen overlay */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />

      {/* Subtle corner light accents on outline buttons */}
      {variant === 'outline' && (
        <span
          className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[inset_0_0_12px_rgba(255,255,255,0.15)]"
          aria-hidden="true"
        />
      )}

      {/* Button text */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        {showIcon && (
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon || <ArrowUpRight className="h-3.5 w-3.5" />}
          </span>
        )}
      </span>
    </>
  );

  const motionProps: HTMLMotionProps<'button'> = {
    whileHover: disabled ? {} : { scale: 1.015 },
    whileTap: disabled ? {} : { scale: 0.985 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick as any}
        className={`${baseClasses} ${sizeClasses} ${variantStyles} ${className}`}
        aria-label={ariaLabel}
        data-cursor="pointer"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantStyles} ${className}`}
      aria-label={ariaLabel}
      data-cursor="pointer"
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};
