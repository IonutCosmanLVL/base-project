import { createContentfulClient } from '../contentfulClient';
import type { HeroSkeleton, HeroData } from '../types/hero';

export async function getHero(): Promise<HeroData | null> {
    try {
        const client = createContentfulClient();
        const res = await client.getEntries<HeroSkeleton>({
            content_type: 'navigationMenu',
            limit: 1,
        });

        if (!res.items.length) {
            console.warn('⚠️ No hero entry found in Contentful.');
            return null;
        }

        const item = res.items[0].fields;

        return {
            staticTitle: item.headline,
            animatedPhrases: item.animatedPhrases,
            subtitle: item.subtitle,
            ctaText: item.ctaText,
            ctaLink: item.ctaLink,
            backgroundImageUrl: item.backgroundImage?.fields?.file?.url ?? '',
        };
    } catch (error) {
        console.error('Failed to fetch hero data:', error);
        return null;
    }
}
