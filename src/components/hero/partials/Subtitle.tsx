'use client';

import { motion } from 'framer-motion';

interface SubtitleProps {
  text: string;
  disableAnimation?: boolean;
}

export default function Subtitle({ text, disableAnimation = false }: SubtitleProps) {
  const Tag: any = disableAnimation ? 'p' : motion.p;

  return (
    <Tag
      {...(!disableAnimation && {
        initial: { opacity: 1, y: 12 },   // 👈 visible immediately
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.05, duration: 0.45, ease: 'easeOut' },
      })}
      className="text-lg md:text-xl font-play text-tan-light/90 max-w-2xl tracking-[4px] mb-[40px]"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
// This Subtitle component displays a subtitle with optional animation using Framer Motion.