import { EntrySkeletonType } from 'contentful';

export interface AboutUsFields {
    aboutUsTitle: string;
    headline: string;
    aboutUsParagraph: any;
    linkText: string;
    linkUrl: string;
    imageRightUrl?: string;
    imageLeftUrl?: string;
    images?: {
        fields: {
            file: {
                url: string;
            };
        };
    }[];
}

export type AboutUsSkeleton = EntrySkeletonType<AboutUsFields>;
