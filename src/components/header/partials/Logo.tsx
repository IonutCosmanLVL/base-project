import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  url: string;
};

export default function Logo({ url }: LogoProps) {
    return (
        <Link
            href="/"
            aria-label="Go to homepage"
            className="block w-[195px]"
        >
            <Image
                src={url}
                alt="Ares Residence Logo"
                width={195}
                height={49}
                priority
            />
        </Link>
    );
}
// This component renders the logo for the Ares Residence website.
// It uses Next.js Image component for optimized loading and includes a link to the homepage.