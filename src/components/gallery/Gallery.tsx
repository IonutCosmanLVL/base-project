'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type GalleryCard = {
    src: string;
    alt: string;
};

const galleryCards: { left: GalleryCard; rightTop: GalleryCard; rightBottom: GalleryCard } = {
    left: {
        src: '/images/ares-front-left-01.png',
        alt: 'Exterior modern Ares Residence cu arhitectură contemporană',
    },
    rightTop: {
        src: '/images/floor-0-interior.png',
        alt: 'Interior premium Ares Residence cu design minimalist',
    },
    rightBottom: {
        src: '/images/ares-front-right-01.png',
        alt: 'Detalii de finisaje și materiale pentru locuințe moderne',
    },
};

export default function Gallery() {
    return (
        <section
            className="relative bg-dark-grey text-white px-6 xl:px-20"
            aria-labelledby="homepage-gallery-title"
        >
            {/* Subtle vignette background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(161,120,63,0.12),transparent_60%)]" />

            <div className="relative max-w-[1440px] mx-auto py-[100px] lg:pt-[80px] lg:pb-[80px]">
                {/* Header */}
                <div className="text-center max-w-[920px] mx-auto">
                    <p className="font-inter text-[12px] md:text-[13px] tracking-[0.28em] uppercase text-gold mb-6">
                        Portofoliu vizual
                    </p>

                    <h2 id="homepage-gallery-title" className="h2">
                        Galerie Proiecte
                    </h2>

                    <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />

                    <p className="mt-8 p-lead text-white/55">
                        Descoperă rafinamentul în fiecare linie și textură. Galeria noastră surprinde echilibrul dintre
                        funcționalitate modernă, lumină naturală și finisaje premium pentru un stil de locuire contemporan.
                    </p>
                </div>

                {/* Grid */}
                <div className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* Left big card */}
                    <div className="relative overflow-hidden bg-white/5 border border-white/10">
                        <div className="relative w-full h-[520px] md:h-[620px] lg:h-[720px]">
                            <Image
                                src={galleryCards.left.src}
                                alt={galleryCards.left.alt}
                                fill
                                className="object-cover transition-transform duration-700 ease-out"
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                quality={68}
                            />

                            {/* Soft bottom fade */}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* CTA Button */}
                            <div className="absolute inset-x-0 bottom-6 flex justify-center px-6">
                                <Link
                                    href="/gallery"
                                    aria-label="Vezi galeria completă Ares Residence"
                                    className="
                                        liquid-glass inline-flex h-14 items-center justify-center gap-3
                                        border border-white/30 px-6
                                        font-inter text-[14px] font-[600] text-white md:text-[15px]
                                    "
                                >
                                    <span
                                        aria-hidden="true"
                                        className="liquid-glass-hover-shine"
                                    />
                                    <span>Vezi galeria completă</span>
                                    <ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />
{/*  */}                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right stacked cards */}
                    <div className="grid grid-rows-2 gap-6 lg:gap-8">
                        {/* Top right card */}
                        <div className="relative overflow-hidden bg-white/5 border border-white/10">
                            <div className="relative w-full h-[260px] md:h-[300px] lg:h-[344px]">
                                <Image
                                    src={galleryCards.rightTop.src}
                                    alt={galleryCards.rightTop.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out"
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    quality={68}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
                            </div>
                        </div>

                        {/* Bottom right card */}
                        <div className="relative overflow-hidden bg-white/5 border border-white/10">
                            <div className="relative w-full h-[260px] md:h-[300px] lg:h-[344px]">
                                <Image
                                    src={galleryCards.rightBottom.src}
                                    alt={galleryCards.rightBottom.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out"
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    quality={68}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/*
Notes:
- Desktop layout matches the reference: centered header + 1 big image on the left + 2 stacked cards on the right.
- Mobile/tablet stack naturally via grid-cols-1 and fixed heights.
- Replace image paths with your real assets. Keep them large for best quality.
*/
