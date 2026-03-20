// components/Hero/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
    // ========== Constants ==========
    const HERO_IMAGE = "/images/ares-night.png";
    const PHONE_DISPLAY = "0712 345 678";
    const PHONE_HREF = "+40712345678";
    const LOCATION_NAME = "Ares Residence";
    const LOCATION_URL = "#contact";
    const COMPANY_NAME = "ARES";
    const COMPANY_CITY = "Bucuresti"; // TODO: Update with actual city

    // ========== Animation Variants - grouped by component ==========
    // Heading and main title animations
    const textBlockVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0, 0, 1] as const,
            },
        },
    };

    const buttonVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.2, 0, 0, 1] as const,
                delay: 0.4,
            },
        },
    };

    const mapLinkVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.2, 0, 0, 1] as const,
                delay: 0.6,
            },
        },
    };

    // ========== Structured Data for SEO ==========
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: COMPANY_NAME,
        description: "Arhitectura moderna si design rezidential contemporan",
        image: HERO_IMAGE,
        telephone: PHONE_HREF,
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
        <>
            {/* ========== Hero Section Container ========== */}
            <section
                className="relative w-full overflow-hidden min-h-[95vh] text-tan-light"
                aria-label="Hero section featuring ARES Residence"
                role="region"
            >
                {/* ========== Background Image ========== */}
                <Image
                    src={HERO_IMAGE}
                    alt={`${LOCATION_NAME} - ${COMPANY_NAME} - Arhitectura moderna in ${COMPANY_CITY}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    title={`${LOCATION_NAME} - Design rezidential contemporan`}
                />

                {/* ========== Gradient Overlay (Readability) ========== */}
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                    aria-hidden="true"
                    role="presentation"
                />

                {/* ========== Main Content Container ========== */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 z-20 text-tan-light"
                    initial="hidden"
                    animate="visible"
                >
                    {/* ========== Content Wrapper ========== */}
                    <div
                        className="mx-auto flex min-h-[72vh] w-full max-w-[1440px] flex-col items-center justify-between gap-8 px-6 lg:h-auto lg:min-h-[60vh] lg:items-start lg:px-8"
                    >
                        {/* ========== Hero Headline + CTA Button ========== */}
                        <motion.div
                            className="flex min-h-0 flex-col items-center gap-10 md:gap-12 lg:min-h-[55vh] lg:max-w-[75%] lg:items-start lg:gap-[90px]"
                            variants={textBlockVariants}
                        >
                            <div className="flex flex-col items-start lg:items-start">
                                <span className="mb-6 block font-inter text-[12px] uppercase tracking-[0.34em] text-gold">
                                    Arhitectura contemporana
                                </span>

                                {/* ========== Main Heading (H1) ========== */}
                                <h1
                                    className="text-left font-poppins text-5xl font-[700] leading-[1] tracking-[1px] text-white sm:text-6xl lg:text-left lg:text-[88px]"
                                >
                                    Casa ta este aici, intr-o{" "}
                                    <span className="text-gold">arhitectura</span> moderna.
                                </h1>
                            </div>

                            <p className="-mt-12 hidden text-left font-inter text-xl font-light leading-relaxed text-slate-200 lg:-mt-16 lg:block lg:text-left">
                                Redefinim conceptul de acasa prin design contemporan si executie premium,
                                gandite special pentru stilul tau de viata.
                            </p>

                            {/* ========== Hero CTA Buttons ========== */}
                            <motion.div
                                className="flex w-full flex-col items-start gap-4 md:flex-row md:justify-center lg:w-auto lg:justify-start lg:items-start"
                                variants={buttonVariants}
                            >
                                <a
                                    href={`tel:${PHONE_HREF}`}
                                    className="inline-flex h-14 w-full max-w-[320px] items-center justify-center gap-2 rounded-full px-6 font-inter text-[14px] font-[600] uppercase tracking-[0.08em] text-tan-light btn-gold-bg transition-shadow duration-300 hover:shadow-lg md:w-auto md:px-[44px] md:text-[15px]"
                                    aria-label={`Apeleaza ${PHONE_DISPLAY}`}
                                    title={`Contacteaza-ne: ${PHONE_DISPLAY}`}
                                >
                                    <Phone
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                        role="presentation"
                                    />
                                    <span className="leading-none">
                                        {PHONE_DISPLAY}
                                    </span>
                                </a>

                                <a
                                    href="#contact"
                                    onClick={scrollToContact}
                                    className="
                                        inline-flex h-14 w-full max-w-[320px] items-center justify-center gap-3 md:w-auto
                                        rounded-full
                                        border border-[#a1783f]/40
                                        bg-black/20 backdrop-blur
                                        px-6
                                        font-inter text-[14px] md:text-[15px] font-[600]
                                        text-white/85
                                        transition-all duration-300 ease-out
                                        hover:bg-black/35 hover:border-[#a1783f]/70
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a1783f] focus-visible:ring-offset-2 focus-visible:ring-offset-black
                                    "
                                >
                                    Programeaza o Vizionare
                                    <ArrowRight className="h-4 w-4 text-[#a1783f]" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* ========== Location Link ========== */}
                        <motion.div
                            className="mb-10 flex w-full justify-center sm:mb-[75px] lg:justify-end"
                            variants={mapLinkVariants}
                        >
                            <a
                                href={LOCATION_URL}
                                onClick={scrollToContact}
                                className="text-[16px] sm:text-[18px] font-poppins flex items-center gap-[6px] group link-pop-icon rounded-md px-2 py-1"
                                rel="noopener noreferrer"
                                aria-label={`Viziteaza ${LOCATION_NAME} pe harta`}
                                title={`${LOCATION_NAME} - ${COMPANY_CITY}`}
                            >
                                <MapPin
                                    className="h-[26px] w-[22px] text-white transition-colors duration-300 group-hover:text-gold icon-pop"
                                    aria-hidden="true"
                                    role="presentation"
                                />
                                <span className="text-white transition-colors duration-300 group-hover:text-gold">
                                    {LOCATION_NAME}
                                </span>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </section>
        </>
    );
}






