/**
 * Represents a single image asset retrieved from Contentful.
 * Typically used for images like logos or social media icons.
 */
export type ContentfulImageAsset = {
    fields: {
        /** Image title (used as alt text or tooltip) */
        title: string;

        /** Description or external link (used e.g. for social media URLs) */
        description: string;

        /** File metadata including the actual image URL */
        file: {
            /** Image URL path (prefixed with https:) */
            url: string;
        };
    };
};

/**
 * Represents the structure of the Navbar content type from Contentful.
 */
export type NavbarData = {
    /** The name or label for this navbar configuration (for internal reference) */
    navbarName: string;

    /** The main logo used in the navbar */
    navbarLogo: ContentfulImageAsset;

    /** Rich-text menu structure (manually parsed into usable links) */
    navMenu?: any;

    /** Optional array of social media icons with links */
    socialMedia?: ContentfulImageAsset[];
};
