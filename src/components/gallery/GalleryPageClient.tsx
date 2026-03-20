"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";

type FilterKey = "construction" | "homes" | "interiors";

type GallerySection = {
    key: FilterKey;
    label: string;
};

type Project = {
    title: string;
    location: string;
    description: string;
    area: string;
    year: string;
    heroImage: string;
    sideImages: { src: string; alt: string }[];
};

const filters: GallerySection[] = [
    { key: "construction", label: "Etape Constructie" },
    { key: "homes", label: "Case Finalizate" },
    { key: "interiors", label: "Design Interior" },
];

const constructionCollections: Record<
    FilterKey,
    {
        title: string;
        subtitle: string;
        featured: { src: string; alt: string; phase: string; title: string };
        secondary: { src: string; alt: string }[];
    }
> = {
    construction: {
        title: "Etape Constructie",
        subtitle: "Technical Raw Beauty",
        featured: {
            src: "/images/ares-house-v4.png",
            alt: "Structura beton armat",
            phase: "Faza I",
            title: "Structura beton armat",
        },
        secondary: [
            { src: "/images/house3-min.jpg", alt: "Excavare si fundatie" },
            { src: "/images/house4-min.jpg", alt: "Montaj vitraje si inchideri" },
        ],
    },
    homes: {
        title: "Case Finalizate",
        subtitle: "Completed Residences",
        featured: {
            src: "/images/ares-house-v3.png",
            alt: "Casa finalizata Ares Residence",
            phase: "Selectie",
            title: "Arhitectura finalizata",
        },
        secondary: [
            { src: "/images/black-house-bg.jpg", alt: "Fatada finalizata" },
            { src: "/images/house12.jpg", alt: "Curte si terasa" },
        ],
    },
    interiors: {
        title: "Design Interior",
        subtitle: "Interior Material Moodboard",
        featured: {
            src: "/images/example-house2.png",
            alt: "Interior premium Ares Residence",
            phase: "Interior",
            title: "Atmosfera si materiale",
        },
        secondary: [
            { src: "/images/example-house.png", alt: "Living contemporan" },
            { src: "/images/experience-img.jpg", alt: "Detalii si texturi" },
        ],
    },
};

const completedProjects: Project[] = [
    {
        title: "Vila Obsidian",
        location: "Bucuresti Nord",
        description:
            "O compozitie de volume clare, suprafete vitrate si materiale naturale, gandita pentru lumina si intimitate.",
        area: "450 m²",
        year: "2023",
        heroImage: "/images/ares-house-v3.png",
        sideImages: [
            { src: "/images/black-house-bg.jpg", alt: "Ansamblul Zenith" },
            { src: "/images/black-house2-bg.jpg", alt: "The Timber Frame" },
        ],
    },
    {
        title: "Casa Horizon",
        location: "Iasi Metropolitan",
        description:
            "Un proiect care pune accent pe proportii echilibrate, planuri deschise si o relatie fluida intre interior si terasa.",
        area: "390 m²",
        year: "2024",
        heroImage: "/images/house12.jpg",
        sideImages: [
            { src: "/images/house4.jpg", alt: "Casa Horizon exterior" },
            { src: "/images/example-house.png", alt: "Casa Horizon backyard" },
        ],
    },
    {
        title: "Residence Frame",
        location: "Brasov Highlands",
        description:
            "Minimalism cald, texturi controlate si un dialog constant intre lemn, sticla si piatra pentru o locuire contemporana.",
        area: "420 m²",
        year: "2025",
        heroImage: "/images/ares-house.jpg",
        sideImages: [
            { src: "/images/example-house2.png", alt: "Residence Frame entry" },
            { src: "/images/house3.jpg", alt: "Residence Frame garden side" },
        ],
    },
];

const interiorImages = [
    { src: "/images/example-house.png", alt: "Living minimalist" },
    { src: "/images/example-house2.png", alt: "Bucatarie premium" },
    { src: "/images/experience-img.jpg", alt: "Baie cu finisaje naturale" },
    { src: "/images/trust-img.jpg", alt: "Texturi si materiale" },
    { src: "/images/desktop-ai-house.png", alt: "Exterior modern la apus" },
    { src: "/images/desktop2-ai-house.png", alt: "Volumetrie contemporana" },
    { src: "/images/desktop3-ai-house.png", alt: "Fatada minimalista" },
    { src: "/images/desktop4-ai-house.png", alt: "Terasa si vitraje ample" },
    { src: "/images/desktop5-ai-house.png", alt: "Zona de lounge exterior" },
    { src: "/images/ares-night.png", alt: "Ares Residence noaptea" },
    { src: "/images/house3.jpg", alt: "Casa premium in constructie avansata" },
    { src: "/images/house4.jpg", alt: "Casa finalizata cu gradina" },
];

export default function GalleryPageClient() {
    const [activeFilter, setActiveFilter] = useState<FilterKey>("construction");
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [previousProjectIndex, setPreviousProjectIndex] = useState<number | null>(null);
    const [carouselDirection, setCarouselDirection] = useState(1);
    const [visibleGalleryCount, setVisibleGalleryCount] = useState(6);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const activeProject = completedProjects[activeProjectIndex];
    const activeConstructionCollection = constructionCollections[activeFilter];
    const visibleGalleryImages = interiorImages.slice(0, visibleGalleryCount);
    const selectedImage =
        selectedImageIndex !== null ? interiorImages[selectedImageIndex] : null;

    const showPreviousProject = () => {
        setCarouselDirection(-1);
        setPreviousProjectIndex(activeProjectIndex);
        setActiveProjectIndex((current) =>
            current === 0 ? completedProjects.length - 1 : current - 1
        );
    };

    const showNextProject = () => {
        setCarouselDirection(1);
        setPreviousProjectIndex(activeProjectIndex);
        setActiveProjectIndex((current) =>
            current === completedProjects.length - 1 ? 0 : current + 1
        );
    };

    useEffect(() => {
        if (previousProjectIndex === null) return;
        const timer = window.setTimeout(() => setPreviousProjectIndex(null), 520);
        return () => window.clearTimeout(timer);
    }, [previousProjectIndex]);

    return (
        <main className="bg-dark-grey text-white">
            <header className="relative isolate min-h-[78vh] overflow-hidden pt-28 lg:pt-32">
                <div className="absolute inset-0">
                    <Image
                        src="/images/ares-night.png"
                        alt="Portofoliu Ares Residence"
                        fill
                        priority
                        className="object-cover opacity-45"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,22,21,0.96)_0%,rgba(20,22,21,0.84)_38%,rgba(20,22,21,0.5)_72%,rgba(20,22,21,0.28)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(182,153,90,0.15),transparent_28%)]" />
                </div>

                <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-[200px] pb-20 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="mb-6 block font-inter text-[12px] uppercase tracking-[0.34em] text-gold">
                            Portofoliu vizual
                        </span>
                        <h1 className="font-poppins text-5xl font-[700] leading-[1] tracking-[1px] text-white sm:text-6xl lg:text-[88px]">
                            Portofoliu <span className="text-gold">Ares</span>
                        </h1>
                        <p className="mt-8 max-w-2xl font-inter text-lg leading-[1.85] text-white/70 md:text-xl">
                            Descopera etapele de constructie, proiectele finalizate si selectia
                            extinsa de imagini care definesc universul Ares Residence.
                        </p>
                    </div>
                </div>
            </header>

            <section className="border-y border-black/8 bg-white py-6">
                <div className="mx-auto flex max-w-[1440px] flex-wrap justify-center gap-8 px-6 lg:gap-14 lg:px-8">
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter.key;

                        return (
                            <button
                                key={filter.key}
                                type="button"
                                onClick={() => setActiveFilter(filter.key)}
                                className={`border-b-2 pb-1 font-poppins text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
                                    isActive
                                        ? "border-gold text-gold"
                                        : "border-transparent text-dark-grey/55 hover:text-dark-grey"
                                }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section
                className="bg-white px-6 pb-20 pt-10 text-dark-grey md:px-12 lg:px-20 lg:pb-24 lg:pt-12"
            >
                <div className="mx-auto max-w-[1440px]">
                    <div className="mb-14 flex items-baseline gap-6">
                        <h2 className="font-poppins text-4xl font-[700] tracking-[-0.04em]">
                            {activeConstructionCollection.title}
                        </h2>
                        <div className="h-px flex-1 bg-black/10" />
                        <span className="hidden font-inter text-xs uppercase tracking-[0.3em] text-gold/70 md:block">
                            {activeConstructionCollection.subtitle}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:h-[780px] md:grid-cols-12">
                        <div className="group relative overflow-hidden bg-dark-grey md:col-span-8">
                            <Image
                                src={activeConstructionCollection.featured.src}
                                alt={activeConstructionCollection.featured.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-8">
                                <div>
                                    <p className="mb-2 font-inter text-xs uppercase tracking-[0.26em] text-gold">
                                        {activeConstructionCollection.featured.phase}
                                    </p>
                                    <h3 className="font-poppins text-2xl font-[700] text-white">
                                        {activeConstructionCollection.featured.title}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 md:col-span-4">
                            {activeConstructionCollection.secondary.map((image) => (
                                <div
                                    key={image.src}
                                    className="group relative min-h-[280px] flex-1 overflow-hidden bg-dark-grey"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 34vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden bg-dark-grey px-6 py-20 md:px-12 lg:px-20 lg:py-24">
                <div className="mx-auto max-w-[1440px]">
                    <div className="mb-14 flex items-baseline gap-6 justify-end">
                        <span className="hidden font-inter text-xs uppercase tracking-[0.3em] text-gold/70 md:block">
                            The Ares Style
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                        <h2 className="font-poppins text-4xl font-[700] tracking-[-0.04em]">
                            Case Finalizate
                        </h2>
                    </div>

                    <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-20">
                        <div className="w-full md:w-3/5">
                            <div className="relative overflow-visible">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    {previousProjectIndex !== null && (
                                        <motion.div
                                            className="absolute inset-0"
                                            initial={{ opacity: 1, x: 0 }}
                                            animate={{
                                                opacity: 0,
                                                x: carouselDirection > 0 ? -70 : 70,
                                                scale: 0.98,
                                            }}
                                            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                                        >
                                            <Image
                                                src={completedProjects[previousProjectIndex].heroImage}
                                                alt={completedProjects[previousProjectIndex].title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 60vw"
                                            />
                                        </motion.div>
                                    )}

                                    <motion.div
                                        key={activeProject.heroImage}
                                        className="absolute inset-0"
                                        initial={{
                                            opacity: 0,
                                            x: carouselDirection > 0 ? 70 : -70,
                                            scale: 1.02,
                                        }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                                    >
                                        <Image
                                            src={activeProject.heroImage}
                                            alt={activeProject.title}
                                            fill
                                            className="object-cover shadow-[0_32px_64px_-12px_rgba(16,20,26,0.4)]"
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                        />
                                    </motion.div>
                                </div>
                                <div className="absolute -bottom-8 right-0 bg-gold px-8 py-6 text-dark-grey md:-right-8">
                                    <span className="font-poppins text-5xl font-[800] tracking-[-0.04em]">
                                        {String(activeProjectIndex + 1).padStart(2, "0")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/5">
                            <motion.div
                                key={`${activeProject.title}-${activeProject.year}`}
                                initial={{ opacity: 0, x: carouselDirection > 0 ? 28 : -28 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="font-poppins text-5xl font-[800] leading-none tracking-[-0.05em]">
                                        {activeProject.title}
                                    </h3>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={showPreviousProject}
                                            className="inline-flex h-12 w-12 items-center justify-center border border-white/10 text-white/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                                            aria-label="Proiect anterior"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={showNextProject}
                                            className="inline-flex h-12 w-12 items-center justify-center border border-white/10 text-white/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                                            aria-label="Proiect urmator"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-3 font-inter text-xs uppercase tracking-[0.3em] text-gold">
                                    {activeProject.location}
                                </p>
                                <p className="mt-8 max-w-[24ch] font-inter text-lg leading-relaxed text-white/65">
                                    {activeProject.description}
                                </p>

                                <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                    <div>
                                        <p className="mb-1 font-inter text-xs uppercase tracking-[0.3em] text-white/45">
                                            Suprafata
                                        </p>
                                        <p className="font-poppins text-xl font-[700]">{activeProject.area}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 font-inter text-xs uppercase tracking-[0.3em] text-white/45">
                                            Finalizare
                                        </p>
                                        <p className="font-poppins text-xl font-[700]">{activeProject.year}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-20 text-dark-grey lg:py-24">
                <div>
                    <div className="mx-auto mb-14 flex max-w-[1440px] items-baseline gap-6 px-2">
                        <h2 className="font-poppins text-4xl font-[700] tracking-[-0.04em]">
                            Galerie extinsa
                        </h2>
                        <div className="h-px flex-1 bg-black/10" />
                        <span className="hidden font-inter text-xs uppercase tracking-[0.3em] text-gold/70 md:block">
                            Extended Visual Archive
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {visibleGalleryImages.map((image, index) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setSelectedImageIndex(index)}
                                className="group relative overflow-hidden text-left shadow-[0_32px_64px_-12px_rgba(16,20,26,0.18)]"
                            >
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>
                            </button>
                        ))}
                    </div>

                    {visibleGalleryCount < interiorImages.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setVisibleGalleryCount((current) =>
                                        Math.min(current + 6, interiorImages.length)
                                    )
                                }
                                className="inline-flex items-center justify-center border border-dark-grey/15 px-8 py-4 font-poppins text-sm font-[700] uppercase tracking-[0.22em] text-dark-grey transition-colors duration-300 hover:border-gold hover:text-gold"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-dark-grey px-6 py-24 text-center md:px-12 lg:px-20 lg:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(182,153,90,0.35),transparent_55%)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-2xl">
                    <h2 className="font-poppins text-5xl font-[700] tracking-[-0.04em]">
                        Pregatit pentru viitoarea ta resedinta?
                    </h2>
                    <p className="mt-8 font-inter text-lg leading-relaxed text-white/65">
                        Fiecare proiect incepe cu o viziune. Suntem aici pentru a o aduce
                        la viata cu precizie si excelenta arhitecturala.
                    </p>

                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center bg-gold px-10 py-5 font-poppins text-sm font-[700] uppercase tracking-[0.24em] text-dark-grey transition-opacity duration-300 hover:opacity-90"
                        >
                            Contacteaza-ne
                        </Link>
                    </div>
                </div>
            </section>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedImage.alt}
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedImageIndex(null)}
                        className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:border-gold hover:text-gold"
                        aria-label="Inchide imaginea"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div
                        className="relative w-full max-w-6xl overflow-hidden bg-[#0f1110]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative aspect-[16/10] w-full">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                                sizes="90vw"
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}



