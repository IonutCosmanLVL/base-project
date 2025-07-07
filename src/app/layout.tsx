// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/styles.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getNavbar } from '@/lib/contentful/getNavbar';

export const metadata: Metadata = {
    title: "Base Project",
    description: "Your starter for high-end projects.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navbar = await getNavbar();
    return (
        <html lang="en">
            <body className="bg-background text-primary font-body">
                <Header navbar={navbar} />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
// This layout file sets up the basic structure of the application,
// including the header and footer components, and applies global styles.