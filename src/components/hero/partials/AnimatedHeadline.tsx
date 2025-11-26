'use client';

import { motion } from 'framer-motion';

interface AnimatedHeadlineProps {
    text?: string;
    className?: string;
    stagger?: number;
}

export default function AnimatedHeadline({
    text = 'ARES',
    className = '',
    stagger = 0.12,
}: AnimatedHeadlineProps) {

    const letters = text.toUpperCase().split(''); // ["A","R","E","S"]

    return (
        <h1 className={`tracking-tight leading-tight ${className}`} aria-label={text}>
            <span className="sr-only">ARES Residence</span>
            {/* Single row with equal gaps between letters */}
            <span aria-hidden="true" className="flex justify-center gap-[34px] mb-[-40px] sm:mb-[-70px] lg:mb-[-120px]">
                {letters.map((char, i) => (
                    <motion.span
                        key={`ares-${char}-${i}`}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: i * stagger }}
                        className="uppercase font-black font-inter text-[64px] sm:text-[96px] md:text-[120px] lg:text-[140px] xl:text-[160px] 2xl:text-[460px] text-white"
                        style={{
                            lineHeight: 1.0,
                            letterSpacing: '4px',
                            textShadow: '5px 5px 8px rgba(0,0,0,0.3)'
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </span>
        </h1>
    );
}
// This AnimatedHeadline component takes a text string, splits it into letters,
// and animates each letter into view with a staggered effect using Framer Motion.