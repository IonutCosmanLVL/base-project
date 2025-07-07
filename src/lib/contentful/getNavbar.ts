// Import the Contentful client instance
import { client } from '../contentfulClient';

// Import the strongly-typed structure for navbar content
import type { NavbarData } from '../types/navbar';

/**
 * Fetches the navbar data from Contentful.
 * 
 * This function queries the Contentful API for entries of type 'navbar',
 * returning the first entry found (if any), cast to the NavbarData type.
 * 
 * @returns {Promise<NavbarData | null>} The navbar data or null if not found or failed.
 */
export async function getNavbar(): Promise<NavbarData | null> {
    try {
        const res = await client.getEntries({
            content_type: 'navbar',
            limit: 1
        });

        if (!res.items.length) {
            console.warn('⚠️ No navbar entry found in Contentful.');
            return null;
        }

        // Cast the fields to the expected NavbarData structure
        const fields = res.items[0].fields as NavbarData;
        return fields;
    } catch (error) {
        console.error('Failed to fetch navbar data:', error);
        return null;
    }
}
