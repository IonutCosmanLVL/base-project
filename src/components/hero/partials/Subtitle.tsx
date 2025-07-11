'use client';

import { motion } from 'framer-motion';

interface SubtitleProps {
  text: string;
}

export default function Subtitle({ text }: SubtitleProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-lg md:text-xl font-space text-tan-light/90 max-w-2xl tracking-[4px] mb-[40px]"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
// This Subtitle component renders a subtitle with a fade-in animation.
// It uses Framer Motion for the animation effect and accepts a `text` prop,