'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type StatItem = {
    label: string;
    value: string;
};

type Props = {
    imagePosition?: 'left' | 'right';
    title: string;
    description: string;
    imageSrc: string;
    stats?: StatItem[];
};

export default function FeaturedProjects({
    imagePosition = 'left',
    title,
    description,
    imageSrc,
    stats = [],
}: Props) {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    const isImageLeft = imagePosition === 'left';

    return (
        <section ref={ref} className={`relative w-full overflow-hidden lg:h-[900px] bg-transparent z-[2] ${isImageLeft ? 'lg:mt-[-80px]' : ''}`}>
            {/* Desktop: Image */}
            <motion.div
                className={`hidden lg:block absolute top-0 h-full w-1/2 ${
                    isImageLeft ? 'left-0' : 'right-0'
                }`}
                initial={{ x: isImageLeft ? -100 : 100, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Content container */}
            <div className="relative max-w-[1440px] mx-auto h-full flex flex-col lg:flex-row">
                {isImageLeft && <div className="hidden lg:block w-1/2" />}
                <motion.div
                    className={`w-full lg:w-1/2 flex items-center py-12 lg:py-0 ${
                        isImageLeft ? 'justify-end text-right px-6 2xl:pr-0' : 'justify-start text-left px-6 2xl:pl-0'
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                >
                    <div className={`max-w-xl ${isImageLeft ? 'lg:mt-[40px]' : 'lg:mt-[-40px]'}`}>
                        <h2 className="h2 text-dark-grey">
                            {title}
                        </h2>
                        <div
                            className={`h-[3px] w-[80px] bg-gold my-6 ${
                                isImageLeft ? 'ml-auto' : 'mr-auto'
                            }`}
                        />

                        <p className="text-grey p-lead leading-relaxed mb-8">
                            {description}
                        </p>
                        {stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                                {stats.map((stat, i) => (
                                    <Stat key={i} label={stat.label} value={stat.value} align={isImageLeft ? 'end' : 'start'} />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
                {!isImageLeft && <div className="hidden lg:block w-1/2" />}
            </div>

            {/* Mobile: Image */}
            <motion.div
                className="lg:hidden w-full h-[300px] relative"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </section>
    );
}

function Stat({ label, value, align }: { label: string; value: string; align: 'start' | 'end' }) {
    return (
        <div className={`flex flex-col items-${align}`}>
            <span className="font-inter text-[15px] text-grey mb-1">{label}</span>
            <span className="font-poppins text-dark-grey text-[18px] font-[500] text-gold leading-none">{value}</span>
        </div>
    );
}
