// src/lib/contentfulClient.ts
import { createClient } from 'contentful';

/**
 * Creates and returns a Contentful client.
 * This function ensures that environment variables are present and throws an error if they are not.
 * This approach is better than having a client instance that's always connected.
 *
 * @returns The Contentful client.
 * @throws Will throw an error if Contentful environment variables are not set.
 */
export function createContentfulClient() {
    const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    if (!space || !accessToken) {
        throw new Error('Missing Contentful environment variables');
    }

    return createClient({
        space,
        accessToken,
    });
}

