import { createContentfulClient } from '../contentfulClient';
import type { AboutUsSkeleton } from '../types/aboutUs';

export async function getAboutUs() {
    try {
        const client = createContentfulClient();
        const res = await client.getEntries<AboutUsSkeleton>({
            content_type: 'aboutUs',
            limit: 1,
        });

        if (!res.items.length) {
            console.warn('⚠️ No About Us entry found in Contentful.');
            return null;
        }

        const entry = res.items[0].fields;

        const images = (entry.images as any[]) || [];

        const getImageUrl = (index: number) => {
            const url = images[index]?.fields?.file?.url;
            return url ? `https:${url}` : '';
        };

        return {
            title: entry.aboutUsTitle,
            headline: entry.headline,
            aboutUsParagraph: entry.aboutUsParagraph,
            linkText: entry.linkText,
            linkUrl: entry.linkUrl,
            imageRightUrl: getImageUrl(0),
            imageLeftUrl: getImageUrl(1),
        };
    } catch (err) {
        console.error('Failed to fetch About Us data:', err);
        return null;
    }
}
