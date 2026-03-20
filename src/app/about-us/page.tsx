import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutStorySection from "@/components/about/AboutStorySection";
import {
    ArrowRight,
    Building2,
    ClipboardList,
    Gem,
    Lightbulb,
    ShieldCheck,
    Trees,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | Ares Residence",
    description:
        "Descopera viziunea, valorile si procesul de lucru din spatele Ares Residence.",
};

type ValueItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    accent: boolean;
    image?: string;
    imageAlt?: string;
};

const values: ValueItem[] = [
    {
        icon: ShieldCheck,
        title: "Integritate",
        description:
            "Respectam promisiunile asumate si construim relatii bazate pe transparenta, seriozitate si incredere.",
        accent: false,
    },
    {
        icon: Gem,
        title: "Excelenta",
        description:
            "Urmarim atent fiecare detaliu, de la conceptul arhitectural pana la calitatea perceptibila in fiecare finisaj.",
        accent: true,
    },
    {
        icon: Lightbulb,
        title: "Inovatie",
        description:
            "Integram solutii actuale de design si constructie pentru locuinte relevante si durabile.",
        accent: false,
    },
    {
        icon: Trees,
        title: "Confort Real",
        description:
            "Proiectam spatii care sustin bunastarea zilnica, lumina naturala si o experienta de locuire echilibrata.",
        accent: false,
        image: "/images/example-house2.png",
        imageAlt: "Interior luminos Ares Residence",
    },
];

const processSteps = [
    {
        number: "01",
        icon: Building2,
        title: "Design",
        description:
            "Definim conceptul arhitectural si directia vizuala pentru o locuinta coerenta, contemporana si functionala.",
    },
    {
        number: "02",
        icon: ClipboardList,
        title: "Planificare",
        description:
            "Coordonam partea tehnica, autorizatiile si calendarul de executie pentru un parcurs clar si predictibil.",
    },
    {
        number: "03",
        icon: Gem,
        title: "Executie",
        description:
            "Construim cu materiale premium si cu atentie constanta la detalii, proportii si calitatea lucrarilor.",
    },
    {
        number: "04",
        icon: ShieldCheck,
        title: "Livrare",
        description:
            "Predam un produs final bine finisat, pregatit pentru locuire si sustinut de standarde ridicate.",
    },
];

export default function AboutUsPage() {
    return (
        <main className="bg-dark-grey text-white">
            <section className="relative isolate min-h-[78vh] overflow-hidden pt-28 lg:pt-32">
                <div className="absolute inset-0">
                    <Image
                        src="/images/black-house-bg.jpg"
                        alt="Ares Residence exterior"
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
                            Integritate si Arhitectura
                        </span>
                        <h1 className="font-poppins text-5xl font-[700] leading-[1] tracking-[1px] text-white sm:text-6xl lg:text-[88px]">
                            Experienta,
                            <br />
                            viziune si calitate
                        </h1>
                        <p className="mt-8 max-w-2xl font-inter text-lg leading-[1.85] text-white/70 md:text-xl">
                            Redefinim conceptul de locuire urbana prin proiecte care imbina
                            estetica moderna cu functionalitatea reala. Ares Residence nu
                            construieste doar cladiri, ci repere arhitecturale gandite pentru
                            oameni si pentru timp.
                        </p>
                    </div>
                </div>
            </section>

            <AboutStorySection />

            <section className="bg-dark-grey py-24 lg:py-32">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="font-poppins text-4xl font-[700] tracking-[-0.03em] text-white lg:text-6xl">
                            Valorile noastre
                        </h2>
                        <p className="mt-6 font-inter text-lg leading-8 text-white/60">
                            Principiile care definesc felul in care proiectam, construim si
                            relationam cu fiecare familie care ne alege.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-6 xl:grid-rows-2">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            const layoutClass =
                                index === 0
                                    ? "xl:col-span-3 xl:row-span-1"
                                    : index === 1
                                      ? "xl:col-span-3 xl:row-span-1"
                                      : index === 2
                                        ? "xl:col-span-2 xl:row-span-1"
                                        : "xl:col-span-4 xl:row-span-1";

                            const surfaceClass = value.accent
                                ? "bg-gold text-dark-grey"
                                : "bg-white/5 text-white border border-white/8";

                            return (
                                <article
                                    key={value.title}
                                    className={`${layoutClass} ${surfaceClass} group relative overflow-hidden cursor-pointer ${
                                        value.image ? "md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch" : "p-8 lg:p-10"
                                    }`}
                                >
                                    <div className={value.image ? "p-8 lg:p-10" : ""}>
                                        <Icon
                                            className={`mb-6 h-10 w-10 ${
                                                value.accent ? "text-dark-grey" : "text-gold"
                                            }`}
                                        />
                                        <h3 className="font-poppins text-2xl font-[600]">
                                            {value.title}
                                        </h3>
                                        <p
                                            className={`mt-4 max-w-[34rem] font-inter text-[16px] leading-8 ${
                                                value.accent ? "text-dark-grey/80" : "text-white/60"
                                            }`}
                                        >
                                            {value.description}
                                        </p>
                                    </div>

                                    {value.image ? (
                                        <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
                                            <Image
                                                src={value.image}
                                                alt={value.imageAlt ?? value.title}
                                                fill
                                                className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                                                sizes="(max-width: 768px) 100vw, 40vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-dark-grey/20 via-transparent to-black/30" />
                                        </div>
                                    ) : (
                                        !value.accent && (
                                            <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-gold/5 blur-3xl" />
                                        )
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-white py-24 lg:py-32">
                <div className="absolute right-0 top-0 hidden h-full w-1/3 translate-x-1/3 skew-x-[-18deg] bg-gold/5 lg:block" />
                <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
                    <h2 className="font-poppins text-4xl font-[700] tracking-[-0.03em] text-dark-grey lg:text-6xl">
                        Procesul de lucru
                    </h2>
                    <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-dark-grey/65">
                        Fiecare etapa este gandita pentru claritate, control si calitate,
                        astfel incat drumul de la concept la livrare sa fie coerent si usor de urmarit.
                    </p>

                    <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {processSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.number}
                                    className="group relative overflow-hidden border border-white/10 bg-dark-grey p-8 pt-12 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 cursor-pointer"
                                >
                                    <span className="absolute right-4 top-4 font-poppins text-6xl font-[700] leading-none text-white/10 transition-colors duration-300 group-hover:text-gold/20">
                                        {step.number}
                                    </span>
                                    <Icon className="mb-6 h-8 w-8 text-gold" />
                                    <h3 className="font-poppins text-xl font-[600] tracking-tight text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-4 font-inter text-sm leading-7 text-white/60">
                                        {step.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-dark-grey py-20 lg:py-24">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-gold px-8 py-12 text-dark-grey lg:px-16 lg:py-20">
                        <div className="absolute inset-0 opacity-20">
                            <Image
                                src="/images/ares-house.jpg"
                                alt="Ares Residence CTA"
                                fill
                                className="object-cover mix-blend-overlay"
                                sizes="100vw"
                            />
                        </div>

                        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-3xl">
                                <h2 className="font-poppins text-4xl font-[700] leading-[1.05] tracking-[-0.04em] lg:text-6xl">
                                    Esti gata sa iti gasesti noua casa?
                                </h2>
                                <p className="mt-6 font-inter text-lg leading-8 text-dark-grey/80">
                                    Descopera proiectele noastre actuale sau programeaza o discutie
                                    pentru a vedea mai indeaproape standardul Ares Residence.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:w-full sm:flex-row sm:justify-start lg:w-auto lg:gap-4">
                                <Link
                                    href="/gallery"
                                    className="inline-flex w-full items-center justify-center gap-3 whitespace-nowrap bg-dark-grey px-5 py-4 font-inter text-[12px] font-[700] uppercase tracking-[0.12em] text-white transition-opacity duration-300 hover:opacity-90 sm:w-auto sm:flex-none sm:px-8 sm:text-sm sm:tracking-[0.18em]"
                                >
                                    Vezi proiecte
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href="tel:+40712345678"
                                    className="inline-flex w-full items-center justify-center whitespace-nowrap border-2 border-dark-grey px-5 py-4 font-inter text-[12px] font-[700] uppercase tracking-[0.12em] text-dark-grey transition-colors duration-300 hover:bg-dark-grey hover:text-gold sm:w-auto sm:flex-none sm:px-8 sm:text-sm sm:tracking-[0.18em]"
                                >
                                    Contacteaza-ne
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}





