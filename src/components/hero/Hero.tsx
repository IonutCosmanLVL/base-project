// components/Hero/Hero.tsx
import { getHero } from '@/lib/contentful/getHero';
import Headline from './partials/Headline';
import Subtitle from './partials/Subtitle';
import CTAButton from './partials/CTAButton';
import Image from 'next/image';

export default async function Hero() {
    const heroData = await getHero();

    if (!heroData) {
        return <div className="text-red-500">⚠️ No hero data</div>;
    }

    const {
        staticTitle,
        animatedPhrases,
        subtitle,
        ctaText,
        ctaLink,
        backgroundImageUrl,
    } = heroData;

    const imageUrl = `https:${backgroundImageUrl}`;

    return (
        <section className="relative h-screen max-h-none xl:max-h-[1200px] w-full overflow-hidden">
            <Image
                src={imageUrl}
                alt="Hero background"
                fill
                className="object-cover object-center md:object-[50%_30%] z-0"
                priority
            />
            <div className="absolute inset-0 bg-black/40 z-10" />

            <div className="relative z-20 flex h-full px-6 flex-col justify-center items-center text-center lg:flex-row lg:items-center lg:justify-start lg:text-left">
                <div className="w-full max-w-[1440px] mx-auto">
                    <div className="w-full lg:w-1/2 text-shadow-sm flex flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left space-y-[100px] mt-[120px]">
                        <Headline
                            staticTitle={staticTitle}
                            animatedPhrases={animatedPhrases}
                        />

                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
                            <Subtitle text={subtitle} />
                            <CTAButton text={ctaText} link={ctaLink} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}