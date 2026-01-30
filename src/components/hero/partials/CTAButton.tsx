// components/CTAButton.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  link: string;
  variant?: 'inline' | 'circle';
  className?: string;
}

export default function CTAButton({
  text,
  link,
  variant = 'inline',
  className = '',
}: CTAButtonProps) {
  const base =
    'font-inter font-medium uppercase tracking-[2px] transition-all duration-300 ease-out';

  const inlineStyles =
    'inline-flex items-center justify-center rounded-none border border-copper bg-copper text-white hover:border-gold hover:bg-gold hover:shadow-xl hover:-translate-y-1 px-[35px] py-3';

  const circleStyles =
    'inline-flex h-28 w-28 items-center justify-center rounded-full bg-tan-light/95 text-neutral-900 shadow-2xl shadow-black/30 ring-1 ring-white/30 backdrop-blur hover:bg-copper hover:ring-copper hover:text-tan-light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className={className}
    >
      <Link
        href={link}
        aria-label={text}
        className={`${base} ${variant === 'inline' ? inlineStyles : circleStyles}`}
      >
        {text}
      </Link>
    </motion.div>
  );
}
// Usage example:
// <CTAButton text="Contact Us" link="/contact" variant="inline" />
// <CTAButton text="Get Started" link="/get-started" variant="circle" />