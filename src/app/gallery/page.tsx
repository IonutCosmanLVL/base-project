import type { Metadata } from "next";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";

export const metadata: Metadata = {
    title: "Gallery | Ares Residence",
    description:
        "Exploreaza etapele de constructie, casele finalizate si detaliile interioare din portofoliul Ares Residence.",
};

export default function GalleryPage() {
    return <GalleryPageClient />;
}
