import { Menu, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type HamburgerToggleProps = {
    isOpen: boolean;
    onClick: () => void;
};

export default function HamburgerToggle({ isOpen, onClick }: HamburgerToggleProps) {
    return (
        <button
            onClick={onClick}
            aria-label="Toggle menu"
            className="relative w-10 h-10 flex items-center justify-center overflow-hidden bg-transparent p-0"
        >
            {/* Hamburger Icon */}
            <div
                className={clsx(
                    'absolute transition-all duration-200',
                    '[transition-timing-function:cubic-bezier(0.17,0.67,0.83,0.67)]',
                    isOpen ? 'opacity-0 -translate-x-6 pointer-events-none' : 'opacity-100 translate-x-0'
                )}
            >
                <Menu size={32} />
            </div>

            {/* Chevron Right Icon */}
            <div
                className={clsx(
                    'absolute transition-all duration-200',
                    '[transition-timing-function:cubic-bezier(0.17,0.67,0.83,0.67)]',
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'
                )}
            >
                <ChevronRight size={36} />
            </div>
        </button>
    );
}
// This component renders a hamburger toggle button.
// It uses the Lucide icons for the hamburger menu and chevron right.