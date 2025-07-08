// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/styles.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Base Project",
    description: "Your starter for high-end projects.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-white text-primary font-body">
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
// This layout component sets up the basic structure of the application.
// It includes the header, main content area, and footer.
// The metadata object defines the title and description for the page.