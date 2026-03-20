"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type TimelineItem = {
    year: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
};

const timeline: TimelineItem[] = [
    {
        year: "2016",
        title: "Fundatia",
        description:
            "Ares Residence a pornit din dorinta de a ridica standardul locuirii premium prin arhitectura coerenta si executie riguroasa.",
        image: "/images/ares-house-v4.png",
        imageAlt: "Fundatia Ares Residence",
        imageCaption:
            "Inceputul unei viziuni care a pus accent pe executie premium si arhitectura coerenta.",
    },
    {
        year: "2019",
        title: "Expansiunea",
        description:
            "Am extins portofoliul cu proiecte rezidentiale ample, construite in jurul luminii naturale, al eficientei si al finisajelor atent selectionate.",
        image: "/images/black-house-bg.jpg",
        imageAlt: "Extinderea portofoliului Ares Residence",
        imageCaption:
            "Portofoliul s-a dezvoltat in jurul proiectelor luminoase, functionale si atent executate.",
    },
    {
        year: "Astazi",
        title: "Viziune matura",
        description:
            "Continuam sa dezvoltam comunitati in care estetica moderna, confortul si valoarea pe termen lung merg impreuna.",
        image: "/images/house4-min.jpg",
        imageAlt: "Ares Residence in prezent",
        imageCaption:
            "Astazi construim proiecte care imbina confortul contemporan cu valoarea pe termen lung.",
    },
];

export default function AboutStorySection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    const [textVisible, setTextVisible] = useState(true);
    const activeItem = timeline[activeIndex];

    const handleSelect = (index: number) => {
        if (index === activeIndex) return;
        setDirection(index > activeIndex ? 1 : -1);
        setPreviousIndex(activeIndex);
        setTextVisible(false);
        setActiveIndex(index);
    };

    useEffect(() => {
        if (previousIndex === null) return;
        const timer = window.setTimeout(() => setPreviousIndex(null), 460);
        return () => window.clearTimeout(timer);
    }, [previousIndex]);

    useEffect(() => {
        const timer = window.setTimeout(() => setTextVisible(true), 120);
        return () => window.clearTimeout(timer);
    }, [activeIndex]);

    return (
        <section className="bg-white py-24 text-dark-grey lg:py-32">
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24 lg:px-8">
                <div className="group relative">
                    <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-gold/10 blur-3xl" />
                    <div className="relative aspect-[4/5] overflow-hidden border border-black/8 bg-[#faf7f2]">
                        {previousIndex !== null && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 1, x: 0 }}
                                animate={{ opacity: 0, x: direction > 0 ? -42 : 42 }}
                                transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
                            >
                                <Image
                                    src={timeline[previousIndex].image}
                                    alt={timeline[previousIndex].imageAlt}
                                    fill
                                    className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                                />
                            </motion.div>
                        )}

                        <motion.div
                            key={activeItem.image}
                            className="absolute inset-0"
                            initial={{ opacity: 0, x: direction > 0 ? 42 : -42 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
                        >
                            <Image
                                src={activeItem.image}
                                alt={activeItem.imageAlt}
                                fill
                                className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                            />
                        </motion.div>

                        <motion.div
                            key={`${activeItem.year}-${activeItem.imageCaption}`}
                            initial={false}
                            animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 16 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="absolute bottom-6 right-0 max-w-[280px] border-l-4 border-gold bg-white/82 p-6 backdrop-blur-md"
                        >
                            <span className="mb-2 block font-poppins text-4xl font-[700] text-gold">
                                {activeItem.year}
                            </span>
                            <p className="font-inter text-sm leading-7 text-dark-grey/75">
                                {activeItem.imageCaption}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div>
                    <h2 className="font-poppins text-4xl font-[600] tracking-[-0.03em] text-dark-grey lg:text-[56px]">
                        O istorie scrisa in beton, lumina si detaliu
                    </h2>
                    <div className="mt-10 space-y-8">
                        {timeline.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() => handleSelect(index)}
                                    className="group relative block w-full border-l border-black/10 pl-10 text-left cursor-pointer"
                                >
                                    <span
                                        className={`absolute -left-[5px] top-1 h-[10px] w-[10px] rounded-full transition-all duration-300 ${
                                            isActive
                                                ? "bg-gold shadow-[0_0_18px_rgba(182,153,90,0.5)]"
                                                : "bg-dark-grey/20 group-hover:bg-gold/70"
                                        }`}
                                    />
                                    <p
                                        className={`font-inter text-xs tracking-[0.22em] ${
                                            isActive ? "text-gold" : "text-dark-grey/45"
                                        }`}
                                    >
                                        {item.year}
                                    </p>
                                    <h3
                                        className={`mt-3 font-poppins text-2xl font-[600] transition-colors duration-300 ${
                                            isActive ? "text-dark-grey" : "text-dark-grey/75 group-hover:text-dark-grey"
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className={`mt-3 max-w-xl font-inter text-[17px] leading-8 transition-colors duration-300 ${
                                            isActive ? "text-dark-grey/70" : "text-dark-grey/50 group-hover:text-dark-grey/65"
                                        }`}
                                    >
                                        {item.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
