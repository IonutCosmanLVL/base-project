// app/components/about/AboutUs.tsx
import { getAboutUs } from '@/lib/contentful/getAboutUs';
import AboutUsClient from './AboutUsClient';

export default async function AboutUs() {
    const data = await getAboutUs();

    if (!data) {
        return null; // Or a fallback component
    }

    return <AboutUsClient data={data} />;
}
