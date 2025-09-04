'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    LucideHammer,
    LucideShieldCheck,
    LucideRuler,
    LucideHandshake,
} from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        image: '/images/bricks-quality-img.jpg',
        icon: LucideShieldCheck,
        title: 'Materiale Premium',
        description:
            'Folosim doar materiale de construcție certificate, de cea mai înaltă calitate, pentru durabilitate și stil care rezistă în timp.',
    },
    {
        image: '/images/example-house.png',
        icon: LucideRuler,
        title: 'Arhitectură Modernă',
        description:
            'Design-uri care îmbină funcționalitatea cu linii elegante și atemporale, gândite pentru stilul de viață contemporan.',
    },
    {
        image: '/images/experience-img.jpg',
        icon: LucideHammer,
        title: 'Experiență & Expertiză',
        description:
            'Cu peste 8 ani în dezvoltarea de proiecte rezidențiale, echipa noastră livrează excelență în fiecare detaliu.',
    },
    {
        image: '/images/trust-img.jpg',
        icon: LucideHandshake,
        title: 'Transparență & Încredere',
        description:
            'Știi mereu ce se întâmplă. Construim cu transparență, livrăm cu încredere.',
    },
];

export default function ChooseUs() {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.6,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <section className="bg-[#f9f9f9] px-6 xl:px-20">
            <div className="max-w-[1440px] mx-auto py-[100px] lg:pt-[250px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-[40px] font-inter font-bold uppercase tracking-wide text-dark-grey mb-[20px]">
                        De ce să alegi Ares Residence
                    </h2>
                    <p className="font-inter text-lg text-light-grey leading-[34px] mb-[60px] xl:mb-[110px]">
                        Află ce ne face speciali în designul și construcția de locuințe moderne.
                    </p>
                </motion.div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map(({ icon: Icon, ...feature }, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={cardVariants}
                            className="bg-white shadow-md overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-square">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Line separator */}
                            {/* <div className="h-4" /> */}
                            <div className="w-full h-[4px] bg-gold" />
                            <div className="h-4" />

                            {/* Icon + Title */}
                            <div className="flex items-center gap-2 px-4 pt-[22px]">
                                <Icon className="w-6 h-6 text-gold" />
                                <h3 className="text-lg font-normal text-dark-grey font-inter">
                                    {feature.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="px-4 pb-6 pt-4 text-light-grey text-sm font-inter text-[16px] leading-[24px]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
// Note: Ensure you have the necessary images in the specified paths and the Lucide icons installed in your project.
// You can adjust the paths and styles as needed to fit your design system.