import Link from 'next/link';

type MenuItem = {
    text: string;
    href: string;
};

type NavMenuProps = {
    menuLinks: MenuItem[];
    onClick?: () => void;
    isMobile?: boolean;
};

export default function NavMenu({ menuLinks, onClick, isMobile = false }: NavMenuProps) {
    const baseClasses = isMobile
        ? 'flex flex-col items-center gap-6 text-[36px] lg:hidden'
        : 'hidden lg:flex items-center gap-8 text-[16px]';

    return (
        <ul className={`${baseClasses}`}>
            {menuLinks.map((link, index) => {
                const isExternal = link.href.startsWith('http');

                return (
                    <li key={index}>
                        {isExternal ? (
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClick}
                                className="text-dark-grey hover:text-copper transition-colors duration-300"
                            >
                                {link.text}
                            </a>
                        ) : (
                            <Link
                                href={link.href}
                                onClick={onClick}
                                className="text-dark-grey hover:text-copper transition-colors duration-300"
                            >
                                {link.text}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
// This component renders a navigation menu with links.
// It supports both internal and external links, and can be styled differently for mobile and desktop views