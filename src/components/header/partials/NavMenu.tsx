// src/components/header/partials/NavMenu.tsx
import Link from 'next/link';

type MenuItem = { text: string; href: string };
type NavMenuProps = { menuLinks: MenuItem[]; onClick?: () => void; isMobile?: boolean };

export default function NavMenu({ menuLinks, onClick, isMobile = false }: NavMenuProps) {
    const baseClasses = isMobile
        ? 'flex flex-col items-center gap-6 text-[36px] font-poppins lg:hidden'
        : 'hidden lg:flex items-center gap-8 text-[18px] font-poppins';

    const linkClasses = 'text-dark-grey hover:text-gold transition-colors duration-300';

    return (
        <ul className={baseClasses}>
            {menuLinks.map(({ text, href }) => {
                const isExternal = href.startsWith('http');
                return (
                    <li key={href}>
                        {isExternal ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={linkClasses}>
                                {text}
                            </a>
                        ) : (
                            <Link href={href} onClick={onClick} className={linkClasses}>
                                {text}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
// This component renders a navigation menu with links.     