// components/Hero/Hero.tsx
import Image from "next/image";
import Headline from "./partials/Headline";

export default function Hero() {
    const heroImg = "/images/ares-night.png";

    return (
        <section className="relative w-full text-tan-light overflow-hidden min-h-[95vh]">
            {/* Full-bleed background image */}
            <Image
                src={heroImg}
                alt="Casă modernă ARES"
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            {/* Bottom gradient for readability */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Bottom content row */}
            <div className="absolute inset-x-0 bottom-0 z-10">
                <div className="mx-auto px-[24px] 2xl:px-[150px] py-[32px]">
                    {/* One-line ARES */}
                    <Headline text="ARES" />
                </div>
            </div>
        </section>
    );
}
// This Hero component displays a full-width hero section with a background image,
// a gradient overlay at the bottom for readability, and an animated headline.