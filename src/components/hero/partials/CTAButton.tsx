'use client';

import { motion } from 'framer-motion';

interface CTAButtonProps {
  text: string;
  link: string;
}

export default function CTAButton({ text, link }: CTAButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <a
        href={link}
        className="inline-block border border-gold text-shadow-sm font-inter text-white bg-gold hover:text-white hover:border-copper hover:bg-copper px-[35px] py-3 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 font-medium uppercase tracking-[2px] rounded-none"
      >
        {text}
      </a>
    </motion.div>
  );
}
// This CTAButton component renders a call-to-action button with a fade-in animation.