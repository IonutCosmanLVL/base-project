'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Logo from './partials/Logo';
import NavMenu from './partials/NavMenu';
import SocialIcons from './partials/SocialIcons';
import HamburgerToggle from './partials/HamburgerToggle';

const menuLinks = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about-us' },
  { text: 'Gallery', href: '/gallery' },
  { text: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < 150 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimatingOut(false);
      }, 400); // Match SCSS animation timing
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
            <Logo url="/icons/ares-logo-nogradient.svg" />

            {/* Desktop Nav */}
            <nav className="hidden lg:block">
                <NavMenu menuLinks={menuLinks} />
            </nav>

            {/* Desktop Social Icons */}
            <div className="hidden lg:flex gap-4">
                <SocialIcons color="dark-grey" hoverColor="gold" />
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden">
                <HamburgerToggle isOpen={isMobileMenuOpen} onClick={toggleMenu} />
            </div>
        </div>

        {/* Mobile Menu Overlay */}
        {(isMobileMenuOpen || isAnimatingOut) && (
            <div
                className={clsx(
                'fixed top-[81px] left-0 w-full h-[calc(100dvh-80px)] z-40 bg-white flex flex-col',
                isAnimatingOut ? 'slide-out' : 'slide-in'
                )}
            >
                {/* Centered Navigation */}
                <div className="flex-1 flex items-center justify-center px-6">
                    <NavMenu menuLinks={menuLinks} onClick={closeMenu} isMobile />
                </div>

                {/* Social Icons at the Bottom */}
                <div className="pb-6 flex justify-center">
                    <SocialIcons />
                </div>
            </div>
        )}

    </header>
  );
}
// This Header component implements a responsive navigation bar with a logo, menu links, and social icons.
// It includes a mobile hamburger menu that animates in and out, and hides the header on scroll down.