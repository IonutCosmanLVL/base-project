'use client';

import { KeyboardEvent, PointerEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Bath, BedDouble, ChevronDown, ChevronUp, Layers, Ruler } from 'lucide-react';

const layoutStats = [
    {
        icon: Ruler,
        label: 'Suprafață utilă',
        value: '125 m²',
    },
    {
        icon: Bath,
        label: 'Băi',
        value: '2',
    },
    {
        icon: Layers,
        label: 'Niveluri',
        value: '2',
    },
    {
        icon: BedDouble,
        label: 'Dormitoare',
        value: '3',
    },
];

const floorPlans = [
    {
        label: 'Parter',
        src: '/images/floor-0-plan.png',
        alt: 'Plan parter Ares Residence',
        description: 'Zona de zi, bucătăria, spațiile tehnice și accesul către exterior.',
    },
    {
        label: 'Etaj',
        src: '/images/floor-1-plan.png',
        alt: 'Plan etaj Ares Residence',
        description: 'Dormitoare, spații de depozitare și zone private pentru familie.',
    },
];

export default function HouseLayout() {
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState<1 | -1>(1);
    const didDragRef = useRef(false);
    const isDraggingRef = useRef(false);
    const lastPointRef = useRef({ x: 0, y: 0 });
    const activePlan = floorPlans[activePlanIndex];
    const canGoUp = activePlanIndex < floorPlans.length - 1;
    const canGoDown = activePlanIndex > 0;

    function canUsePlanZoom() {
        return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    }

    function goToPlan(nextIndex: number) {
        if (nextIndex < 0 || nextIndex >= floorPlans.length) {
            return;
        }

        setDirection(nextIndex > activePlanIndex ? 1 : -1);
        setActivePlanIndex(nextIndex);
        setIsZoomed(false);
        setPan({ x: 0, y: 0 });
    }

    function toggleZoom() {
        setIsZoomed((current) => {
            setPan({ x: 0, y: 0 });
            return !current;
        });
    }

    function clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    function onPlanPointerDown(event: PointerEvent<HTMLDivElement>) {
        if (!canUsePlanZoom()) {
            return;
        }

        isDraggingRef.current = isZoomed;
        didDragRef.current = false;
        lastPointRef.current = { x: event.clientX, y: event.clientY };

        if (isZoomed) {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
    }

    function onPlanPointerMove(event: PointerEvent<HTMLDivElement>) {
        if (!canUsePlanZoom()) {
            return;
        }

        if (!isDraggingRef.current || !isZoomed) {
            return;
        }

        const deltaX = event.clientX - lastPointRef.current.x;
        const deltaY = event.clientY - lastPointRef.current.y;

        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            didDragRef.current = true;
        }

        lastPointRef.current = { x: event.clientX, y: event.clientY };

        setPan((current) => ({
            x: clamp(current.x + deltaX, -280, 280),
            y: clamp(current.y + deltaY, -240, 240),
        }));
    }

    function onPlanPointerUp(event: PointerEvent<HTMLDivElement>) {
        if (!canUsePlanZoom()) {
            return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        isDraggingRef.current = false;

        if (!didDragRef.current) {
            toggleZoom();
        }
    }

    function onPlanKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (!canUsePlanZoom()) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleZoom();
        }
    }

    return (
        <section
            className="bg-white px-6 py-[120px] text-dark-grey xl:px-20"
            aria-labelledby="house-layout-title"
        >
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
                <div className="flex h-full flex-col">
                    <h2 id="house-layout-title" className="h2 text-dark-grey">
                        Planul Casei
                    </h2>

                    <div className="mt-6 h-[3px] w-[80px] bg-gold" aria-hidden="true" />

                    <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-4">
                        {layoutStats.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.label} className="flex flex-col gap-3">
                                    <Icon className="h-9 w-9 text-dark-grey" strokeWidth={1.7} aria-hidden="true" />
                                    <dt className="font-inter text-[13px] text-grey">{item.label}</dt>
                                    <dd className="font-poppins text-[18px] font-[600] text-dark-grey">{item.value}</dd>
                                </div>
                            );
                        })}
                    </dl>

                    <p className="mt-10 max-w-[620px] font-inter text-[18px] leading-[28px] text-grey">
                        Compartimentarea este gândită pentru o locuire clară și eficientă: zonele de zi sunt deschise
                        și luminoase, iar dormitoarele oferă intimitate, depozitare și acces rapid către funcțiunile
                        principale ale casei.
                    </p>

                    <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-[#f6f3ed]">
                        <Image
                            src="/images/floor-0-interior.png"
                            alt="Interior Ares Residence - zonă de living cu design modern"
                            fill
                            sizes="(max-width: 1024px) 100vw, 42vw"
                            quality={68}
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex h-full flex-col">
                    <p className="max-w-[520px] self-start font-inter text-[15px] leading-[26px] text-grey lg:self-end">
                        După parcurgerea planului, ai deja o imagine clară asupra fluxului interior, a zonelor de
                        depozitare și a felului în care casa răspunde vieții de zi cu zi.
                    </p>

                    <div className="mt-10 flex flex-1 flex-col border border-black/10 bg-[#fafafa] shadow-[0_24px_70px_rgba(20,22,21,0.08)]">
                        <div className="relative flex flex-col gap-5 border-b border-black/10 p-5 pr-20 sm:pr-24">
                            <div className="relative min-h-[116px] flex-1 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${activePlan.label}-copy`}
                                        initial={{ opacity: 0, y: direction === 1 ? 24 : -24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: direction === 1 ? -24 : 24 }}
                                        transition={{ duration: 0.36, ease: [0.2, 0, 0, 1] }}
                                    >
                                        <p className="font-inter text-[12px] uppercase tracking-[0.24em] text-gold">
                                            Plan nivel
                                        </p>
                                        <h3 className="mt-2 font-poppins text-[28px] font-[600] leading-none text-dark-grey">
                                            {activePlan.label}
                                        </h3>
                                        <p className="mt-3 max-w-[440px] font-inter text-[14px] leading-[24px] text-grey">
                                            {activePlan.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="absolute right-5 top-5 flex flex-col items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => goToPlan(activePlanIndex + 1)}
                                    disabled={!canGoUp}
                                    className="inline-flex h-11 w-11 items-center justify-center border border-dark-grey bg-white text-dark-grey transition-all duration-300 hover:border-gold hover:bg-gold focus-visible:border-gold focus-visible:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:border-black/15 disabled:text-black/20"
                                    aria-label="Vezi etajul superior"
                                >
                                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => goToPlan(activePlanIndex - 1)}
                                    disabled={!canGoDown}
                                    className="inline-flex h-11 w-11 items-center justify-center border border-dark-grey bg-white text-dark-grey transition-all duration-300 hover:border-gold hover:bg-gold focus-visible:border-gold focus-visible:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:border-black/15 disabled:text-black/20"
                                    aria-label="Vezi etajul inferior"
                                >
                                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div
                            role="button"
                            tabIndex={0}
                            onPointerDown={onPlanPointerDown}
                            onPointerMove={onPlanPointerMove}
                            onPointerUp={onPlanPointerUp}
                            onPointerCancel={() => {
                                isDraggingRef.current = false;
                            }}
                            onKeyDown={onPlanKeyDown}
                            className={`relative block min-h-[520px] flex-1 w-full overflow-hidden bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                                isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                            } max-md:cursor-default`}
                            style={{ touchAction: isZoomed ? 'none' : 'auto' }}
                            aria-label={isZoomed ? 'Micșorează planul' : 'Mărește planul'}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePlan.src}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, y: direction === 1 ? 42 : -42, scale: isZoomed ? 1.55 : 1 }}
                                    animate={{ opacity: 1, x: pan.x, y: pan.y, scale: isZoomed ? 1.75 : 1 }}
                                    exit={{ opacity: 0, y: direction === 1 ? -42 : 42 }}
                                    transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
                                >
                                    <Image
                                        src={activePlan.src}
                                        alt={activePlan.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        quality={75}
                                        className="pointer-events-none select-none object-contain p-4 md:p-8"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
