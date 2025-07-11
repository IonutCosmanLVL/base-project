'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedHeadlineProps {
  staticText?: string;
  phrases: string[];
  delay?: number;
  className?: string;
}

export default function AnimatedHeadline({
  staticText = 'ARES',
  phrases,
  delay = 4000,
  className = '',
}: AnimatedHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, delay);
    return () => clearInterval(interval);
  }, [delay, phrases.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative overflow-hidden text-shadow-sm flex flex-col items-end ${className}`}
    >
      <span className="block text-gold font-play uppercase font-extrabold text-[105px] xl:text-[185px] leading-[130px] tracking-[1.5px]">
        {staticText}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="block text-white italic lowercase text-[44px] xl:text-[70px] font-play font-normal mt-[-65px] xl:mt-[-60px]"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
