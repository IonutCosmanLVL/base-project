'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import type { NavbarData } from '@/lib/types/navbar';
import Logo from './partials/Logo';
import NavMenu from './partials/NavMenu';
import SocialIcons from './partials/SocialIcons';
import HamburgerToggle from './partials/HamburgerToggle';
// import '@/styles/header.scss';

type HeaderProps = {
    navbar: NavbarData | null;
};

function extractMenuLinks(navMenu: any): { text: string; href: string }[] {
    if (!navMenu?.content) return [];
    const links: { text: string; href: string }[] = [];

    navMenu.content.forEach((item: any) => {
        if (item.nodeType === 'unordered-list') {
            item.content.forEach((listItem: any) => {
                const paragraph = listItem.content?.[0];
                const hyperlink = paragraph?.content?.find(
                    (node: any) => node.nodeType === 'hyperlink'
                );
                if (hyperlink) {
                    const href = hyperlink.data?.uri ?? '#';
                    const text = hyperlink.content?.[0]?.value ?? 'Untitled';
                    links.push({ text, href });
                }
            });
        }
    });

    return links;
}

export default function Header({ navbar }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const logoUrl = navbar?.navbarLogo?.fields?.file?.url;
    const menuLinks = extractMenuLinks(navbar?.navMenu);
    const socialIcons = navbar?.socialMedia ?? [];

    // Show/hide header on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowHeader(currentScrollY < 150 || currentScrollY < lastScrollY);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Lock body scroll
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => {
        if (isMobileMenuOpen) {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setIsMobileMenuOpen(false);
                setIsAnimatingOut(false);
            }, 400); // match animation time in SCSS
        } else {
            setIsMobileMenuOpen(true);
        }
    };

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ease-[cubic-bezier(.17,.67,.83,.67)]',
                showHeader ? 'translate-y-0' : '-translate-y-full'
            )}
        >
            <div className="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Logo url={logoUrl} />

                {/* Desktop Menu */}
                <nav className="hidden lg:block">
                    <NavMenu menuLinks={menuLinks} />
                </nav>

                {/* Desktop Socials */}
                <div className="hidden lg:flex gap-4">
                    <SocialIcons icons={socialIcons} />
                </div>

                {/* Mobile Hamburger */}
                <div className="lg:hidden">
                    <HamburgerToggle isOpen={isMobileMenuOpen} onClick={toggleMenu} />
                </div>
            </div>

            {/* Mobile Menu */}
            {(isMobileMenuOpen || isAnimatingOut) && (
                <div
                    className={clsx(
                        'fixed top-[112px] left-0 w-full h-[calc(100dvh-80px)] z-40 bg-white p-6 flex flex-col justify-between items-center',
                        isAnimatingOut ? 'slide-out' : 'slide-in'
                    )}
                >
                    {/* Desktop Nav */}
                    <NavMenu menuLinks={menuLinks} isMobile={false} />

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="... slide-in">
                            <NavMenu menuLinks={menuLinks} onClick={closeMenu} isMobile />
                        </div>
                    )}


                    {/* Social icons at the bottom */}
                    <div className="pb-4">
                        <SocialIcons icons={socialIcons} />
                    </div>
                </div>
            )}
        </header>
    );
}
