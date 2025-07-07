import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
    url?: string;
};

export default function Logo({ url }: LogoProps) {
    if (!url) {
        return (
            <span className="text-sm text-gray-500">
                No logo
            </span>
        );
    }

    return (
        <Link href="/" aria-label="Go to homepage" className="hover:opacity-80 block w-[120px]">
            <Image
                src={`https:${url}`}
                alt="Ares Residence Logo"
                width={120}
                height={60}
                priority
            />
        </Link>
    );
}
// This component renders the logo for the website.
// If no URL is provided, it displays a placeholder text.