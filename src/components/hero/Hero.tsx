// components/Hero/Hero.tsx
"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
    const HERO_IMAGE = "/images/ares-generated-08-compress.png";
    const LOCATION_NAME = "Ares Residence";
    const LOCATION_URL = "#contact";
    const COMPANY_NAME = "Ares Residence";
    const COMPANY_CITY = "Iași";
    const PHONE_HREF = "+40712345678";

    const titleVariants: Variants = {
        hidden: { opacity: 0, x: -64, y: 16 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.2, 0, 0, 1] as const,
            },
        },
    };

    const copyVariants: Variants = {
        hidden: { opacity: 0, x: 54, y: 16 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.9,
                delay: 0.12,
                ease: [0.2, 0, 0, 1] as const,
            },
        },
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "RealEstateAgent"],
        name: COMPANY_NAME,
        description:
            `Proiect rezidențial premium în ${COMPANY_CITY}, cu arhitectură contemporană, design modern și confort autentic.`,
        image: HERO_IMAGE,
        telephone: PHONE_HREF,
        address: {
            "@type": "PostalAddress",
            addressLocality: COMPANY_CITY,
            addressCountry: "RO",
        },
        areaServed: {
            "@type": "City",
            name: COMPANY_CITY,
            addressCountry: "RO",
        },
        priceRange: "$$",
    };

    const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        event.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            className="bg-white px-6 pb-16 pt-[140px] text-dark-grey lg:px-8 lg:pb-0 lg:pt-[170px]"
            aria-label={`Prezentare ${LOCATION_NAME} ${COMPANY_CITY}`}
            role="region"
        >
            <div className="mx-auto max-w-[1440px]">
                <div className="grid items-end gap-[30px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
                    <motion.div variants={titleVariants} initial="hidden" animate="visible">
                        <span className="mb-5 block font-inter text-[12px] uppercase tracking-[0.34em] text-gold">
                            Arhitectură contemporană premium
                        </span>
                        <h1 className="lg:max-w-[12ch] font-poppins text-[48px] font-[600] leading-[54px] tracking-[1px] text-dark-grey sm:text-6xl lg:text-[88px] lg:leading-[100px]">
                            Construim spații care se simt ca <span className="text-gold">acasă</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="pb-2 lg:pb-7"
                        variants={copyVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="max-w-[360px] font-inter text-[18px] leading-[28px] text-dark-grey/72">
                            Design rezidențial modern în Iași, confort autentic și detalii gândite pentru viața de zi cu zi.
                        </p>
                    </motion.div>
                </div>

                <div
                    className="relative mt-[30px] lg:mt-16 overflow-hidden rounded-[4px] bg-[#f6f3ed] shadow-[0_28px_80px_rgba(20,22,21,0.12)]"
                >
                    <div className="relative aspect-[16/8] min-h-[420px] w-full">
                        <Image
                            src={HERO_IMAGE}
                            alt={`${LOCATION_NAME} Iași - concept rezidențial modern cu arhitectură contemporană`}
                            fill
                            priority
                            fetchPriority="high"
                            sizes="(max-width: 1440px) calc(100vw - 48px), 1440px"
                            quality={60}
                            className="object-cover object-[70%_center] md:object-center"
                            title={`${LOCATION_NAME} Iași - design rezidențial contemporan`}
                        />
                    </div>

                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38%] bg-gradient-to-t from-black/85 via-black/38 to-transparent"
                        aria-hidden="true"
                    />

                    <div className="absolute bottom-6 left-1/2 z-20 flex w-[calc(100%-48px)] -translate-x-1/2 flex-col items-center gap-4 sm:left-6 sm:w-auto sm:translate-x-0 sm:flex-row sm:items-start">
                        <a
                            href="#contact"
                            onClick={scrollToContact}
                            className="liquid-glass inline-flex h-14 w-full max-w-[320px] items-center justify-center border border-white/30 px-6 font-inter text-[14px] font-[600] text-white sm:w-auto md:text-[15px]"
                        >
                            <span
                                aria-hidden="true"
                                className="liquid-glass-hover-shine"
                            />
                            <span>Programează o vizionare</span>
                        </a>
                    </div>

                    <a
                        href={LOCATION_URL}
                        onClick={scrollToContact}
                        className="group absolute bottom-6 right-6 z-20 hidden items-center gap-[6px] px-2 py-1 md:inline-flex"
                        aria-label={`Vizitează ${LOCATION_NAME} pe hartă`}
                        title={`${LOCATION_NAME} ${COMPANY_CITY} - contactează-ne`}
                    >
                        <MapPin
                            className="h-[22px] w-[20px] text-white drop-shadow transition-colors duration-300 group-hover:text-gold"
                            aria-hidden="true"
                            role="presentation"
                        />
                        <span className="font-poppins text-[16px] font-[500] text-white drop-shadow transition-colors duration-300 group-hover:text-gold">
                            {LOCATION_NAME}
                        </span>
                    </a>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </section>
    );
}
