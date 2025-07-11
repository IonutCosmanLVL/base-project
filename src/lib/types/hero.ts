import { EntrySkeletonType } from 'contentful';

// Define your content model fields
export interface HeroFields {
  headline: string;
  animatedPhrases: string[];
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

// ✅ Provide contentTypeId so TypeScript knows how to map it
export type HeroSkeleton = EntrySkeletonType<HeroFields, 'navigationMenu'>;

export interface HeroData {
  staticTitle: string;
  animatedPhrases: string[];
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageUrl: string;
}
// This HeroData interface represents the structure of the hero data returned from Contentful.
// It includes the static title, animated phrases, subtitle, call-to-action text and link,