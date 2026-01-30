'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Feature = {
    image: string;
    title: string;
    description: string;
};

const features: Feature[] = [
    {
        image: '/images/bricks-quality-img2.png',
        title: 'Viziune și Inovație',
        description:
            'Abordăm fiecare proiect cu o perspectivă proaspătă, integrând cele mai noi tehnologii în designul rezidențial contemporan.',
    },
    {
        image: '/images/example-house2.png',
        title: 'Calitate superioară',
        description:
            'Selecționăm riguros materialele și colaborăm doar cu experți pentru a garanta durabilitatea și rafinamentul locuinței tale.',
    },
    {
        image: '/images/experience-img2.png',
        title: 'Integritate',
        description:
            'Transparența este fundația noastră. Construim relații bazate pe încredere și respect reciproc cu fiecare viitor locatar.',
    },
    {
        image: '/images/trust-img2.png',
        title: 'Eficiență',
        description:
            'Optimizăm resursele și timpul de execuție pentru a livra proiecte sustenabile și funcționale fără compromisuri estetice.',
    },
];

export default function ChooseUs() {
    const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });

    const headerVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 22 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.15 + index * 0.12,
                duration: 0.7,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <section className="relative bg-dark-grey text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(255,140,0,0.06),transparent_60%)]" />

            <div className="relative px-6 xl:px-20">
                <div className="max-w-[1440px] mx-auto py-[100px] lg:pt-[270px] lg:pb-[250px]">
                    <motion.div
                        ref={ref}
                        variants={headerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
                    >
                        <div>
                            <p className="text-[12px] md:text-[13px] tracking-[0.28em] uppercase gradient-text-gold font-inter mb-6">
                                Exclusivitate &amp; Excelență
                            </p>

                            <h2 className="h2">
                                <span className="text-white font-[300]">De ce să alegi</span>
                                <br />
                                <span className="italic gradient-text-gold">Ares Residence</span>
                            </h2>
                        </div>

                        <div className="lg:pt-10">
                            <div className="flex gap-6 lg:gap-8 items-start">
                                <div className="hidden lg:block w-px h-[78px] bg-white/10 mt-2" />
                                <p className="p-lead text-white max-w-[520px]">
                                    Angajamentul nostru față de excelență se reflectă în fiecare detaliu al procesului de construcție.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-14 lg:mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {features.map((feature, index) => (
                                <motion.article
                                    key={feature.title}
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={inView ? 'visible' : 'hidden'}
                                    className="
                                        group relative overflow-hidden
                                        bg-white/5 border border-white/10
                                        min-h-[420px] lg:min-h-[460px]
                                    "
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            priority={index < 2}
                                            className="
                                                object-cover opacity-35
                                                grayscale
                                                transition-all duration-500 ease-out
                                                group-hover:grayscale-0
                                                group-hover:opacity-45
                                            "
                                        />

                                        <div
                                            className="
                                                absolute inset-0
                                                bg-gradient-to-b from-black/60 via-black/55 to-black/85
                                                transition-opacity duration-500 ease-out
                                                group-hover:opacity-80
                                            "
                                        />

                                        <div className="absolute inset-0 bg-[radial-gradient(600px_320px_at_50%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
                                    </div>

                                    <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                                        <div className="h-[2px] w-10 bg-gold mb-8" />

                                        <h3 className="font-poppins text-[24px] lg:text-[24px] font-[500] text-white">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-4 p-lead leading-[28px] text-white/60">
                                            {feature.description}
                                        </p>
                                    </div>

                                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-white/[0.03]" />
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

