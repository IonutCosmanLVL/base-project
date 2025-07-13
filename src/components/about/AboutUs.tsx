// app/components/about/AboutUsServer.tsx
import { getAboutUs } from "@/lib/contentful/getAboutUs";
import AboutUsClient from "./AboutUsClient";

export default async function AboutUsServer() {
    const data = await getAboutUs();

    if (!data) return null;

    return <AboutUsClient data={data} />;
}
