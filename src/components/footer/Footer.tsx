import Link from 'next/link';
import AresLogo from './partials/AresLogo';
import SocialIcons from '../header/partials/SocialIcons';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-grey text-copper px-6 py-[120px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Row: Logo + Nav + Social */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="w-40">
            <Link
                href="/"
                aria-label="Go to homepage"
            >
                <AresLogo />
            </Link>
          </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-wide">
                {navigation.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="transition-colors duration-300 hover:text-gold"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <SocialIcons color="copper" hoverColor="gold" />
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="text-xs text-tan-light text-center">
          &copy; {new Date().getFullYear()} Ares Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
// This Footer component implements a responsive footer with a logo, navigation links, and social media icons.
// It includes a copyright notice that updates automatically with the current year.