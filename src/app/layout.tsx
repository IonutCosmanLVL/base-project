// src/app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Oswald, Poppins } from "next/font/google";
import "../styles/globals.css";
import "../styles/styles.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-play",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

const oswald = Oswald({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
    variable: "--font-oswald",
    display: "swap",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ares-residence.ro"),
    title: {
        default: "Ares Residence Iași | Locuințe moderne și design rezidențial premium",
        template: "%s | Ares Residence",
    },
    description:
        "Ares Residence dezvoltă în Iași locuințe moderne cu arhitectură contemporană, confort autentic și execuție premium.",
    keywords: [
        "Ares Residence",
        "Ares Residence Iași",
        "case moderne Iași",
        "locuințe premium Iași",
        "locuințe moderne",
        "case moderne",
        "design rezidențial",
        "arhitectură contemporană",
        "proiect rezidențial premium",
    ],
    openGraph: {
        title: "Ares Residence Iași | Locuințe moderne și design rezidențial premium",
        description:
            "Descoperă Ares Residence, un proiect rezidențial premium din Iași construit în jurul arhitecturii contemporane și al confortului autentic.",
        type: "website",
        locale: "ro_RO",
        alternateLocale: ["en_US"],
        images: [
            {
                url: "/images/ares-generated-08-compress.png",
                width: 1200,
                height: 630,
                alt: "Ares Residence Iași - concept rezidențial modern",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ro">
            <body className={`${cormorant.variable} ${inter.variable} ${oswald.variable} ${poppins.variable} bg-white text-primary font-play`}>
                <Header />
                <main>{children}</main>
                <Footer />
                <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0 overflow-hidden">
                    <filter
                        id="glass-distortion"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        filterUnits="objectBoundingBox"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="1"
                            seed="5"
                            result="turbulence"
                        />
                        <feComponentTransfer in="turbulence" result="mapped">
                            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
                        </feComponentTransfer>
                        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
                        <feSpecularLighting
                            in="softMap"
                            surfaceScale="5"
                            specularConstant="1"
                            specularExponent="100"
                            lightingColor="white"
                            result="specLight"
                        >
                            <fePointLight x="-200" y="-200" z="300" />
                        </feSpecularLighting>
                        <feComposite
                            in="specLight"
                            operator="arithmetic"
                            k1="0"
                            k2="1"
                            k3="1"
                            k4="0"
                            result="litImage"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="softMap"
                            scale="240"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </svg>
            </body>
        </html>
    );
}
// This layout component sets up the basic structure of the application.
// It includes the header, main content area, and footer.
// The metadata object defines the title and description for the page.
