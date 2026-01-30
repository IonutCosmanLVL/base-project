// components/Hero/Hero.tsx
"use client";

import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    // ========== Constants ==========
    const HERO_IMAGE = "/images/ares-night.png";
    const PHONE_DISPLAY = "0712 345 678";
    const PHONE_HREF = "+40712345678";
    const LOCATION_NAME = "Ares Residence";
    const LOCATION_URL = "#"; // TODO: Update with actual Google Maps URL
    const COMPANY_NAME = "ARES";
    const COMPANY_CITY = "București"; // TODO: Update with actual city

    // ========== Animation Variants - grouped by component ==========
    // Heading and main title animations
    const textBlockVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
        },
    };

    // Call-to-action button animation
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.4 },
        },
    };

    // Location link animation
    const mapLinkVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.2, 0, 0, 1], delay: 0.6 },
        },
    };

    // ========== Structured Data for SEO ==========
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: COMPANY_NAME,
        description: "Arhitectură modernă și design rezidențial contemporan",
        image: HERO_IMAGE,
        url: typeof window !== "undefined" ? window.location.href : "",
        telephone: PHONE_HREF,
        areaServed: {
            "@type": "City",
            name: COMPANY_CITY,
            addressCountry: "RO",
        },
        priceRange: "$$",
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
                    alt={`${LOCATION_NAME} - ${COMPANY_NAME} - Arhitectură modernă în ${COMPANY_CITY}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    title={`${LOCATION_NAME} - Design rezidențial contemporan`}
                />

                {/* ========== Gradient Overlay (Readability) ========== */}
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                    aria-hidden="true"
                    role="presentation"
                />

                {/* ========== Main Content Container ========== */}
                <motion.div
                    className="absolute inset-x-0 bottom-[5%] lg:bottom-[10%] z-20 text-tan-light"
                    initial="hidden"
                    animate="visible"
                >
                    {/* ========== Content Wrapper ========== */}
                    <div
                        className="mx-auto w-full flex flex-col items-center lg:items-start gap-8 max-w-[1440px] px-6 lg:px-8 h-[60vh] min-h-[55vh] justify-between lg:h-auto lg:min-h-0 lg:justify-between"
                    >
                        {/* ========== Hero Headline + CTA Button ========== */}
                        <motion.div
                            className="flex flex-col gap-[90px] items-center lg:items-start lg:max-w-[75%] min-h-[55vh]"
                            variants={textBlockVariants}
                        >
                            {/* ========== Main Heading (H1) ========== */}
                            <h1
                                className="font-poppins text-[36px] sm:text-[44px] lg:text-[68px] text-center lg:text-left leading-tight"
                            >
                                <span className="block">Casa ta este aici,</span>
                                <span className="block">
                                    într-o arhitectură modernă
                                </span>
                                <span className="block">gândită pentru tine.</span>
                            </h1>

                            {/* ========== Phone CTA Button ========== */}
                            <motion.a
                                href={`tel:${PHONE_HREF}`}
                                className="inline-flex items-center gap-2 px-[44px] py-[16px] font-medium uppercase text-tan-light btn-gold-bg hover:shadow-lg transition-shadow duration-300"
                                variants={buttonVariants}
                                aria-label={`Apelează ${PHONE_DISPLAY}`}
                                title={`Contactează-ne: ${PHONE_DISPLAY}`}
                            >
                                <Phone
                                    className="h-[20px] w-[20px]"
                                    aria-hidden="true"
                                    role="presentation"
                                />
                                <span className="font-poppins text-[18px] leading-[24px] tracking-[2px]">
                                    {PHONE_DISPLAY}
                                </span>
                            </motion.a>
                        </motion.div>

                        {/* ========== Location Link ========== */}
                        <motion.div
                            className="flex justify-center lg:justify-end w-full"
                            variants={mapLinkVariants}
                        >
                            <a
                                href={LOCATION_URL}
                                className="text-[16px] sm:text-[18px] font-poppins flex items-center gap-[6px] group link-pop-icon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D38312] rounded-md px-2 py-1"
                                rel="noopener noreferrer"
                                aria-label={`Vizitează ${LOCATION_NAME} pe hartă`}
                                title={`${LOCATION_NAME} - ${COMPANY_CITY}`}
                            >
                                <MapPin
                                    className="h-[26px] w-[22px] text-tan-light transition-colors duration-300 group-hover:text-[#D38312] icon-pop"
                                    aria-hidden="true"
                                    role="presentation"
                                />
                                <span className="gradient-text-animated text-tan-light">
                                    {LOCATION_NAME}
                                </span>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}