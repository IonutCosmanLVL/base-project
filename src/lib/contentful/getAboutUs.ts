import { client } from '../contentfulClient';
import type { AboutUsSkeleton } from '../types/aboutUs';

export async function getAboutUs() {
    try {
        const res = await client.getEntries<AboutUsSkeleton>({
            content_type: 'aboutUs',
            limit: 1,
        });

        if (!res.items.length) {
            console.warn('⚠️ No About Us entry found in Contentful.');
            return null;
        }

        const entry = res.items[0].fields;

        // Add a type assertion for images array
        const images = entry.images as Array<{
            fields: {
                file: {
                    url: string;
                };
            };
        }> | undefined;

        return {
            title: entry.aboutUsTitle,
            headline: entry.headline,
            aboutUsParagraph: entry.aboutUsParagraph,
            linkText: entry.linkText,
            linkUrl: entry.linkUrl,
            imageRightUrl: images?.[0]?.fields?.file?.url
                ? `https:${images[0].fields.file.url}`
                : '',
            imageLeftUrl: images?.[1]?.fields?.file?.url
                ? `https:${images[1].fields.file.url}`
                : '',
        };
    } catch (err) {
        console.error('Failed to fetch About Us data:', err);
        return null;
    }
}
