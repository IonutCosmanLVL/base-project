import Image from 'next/image';

type Social = {
    fields: {
        title: string;
        description: string;
        file: { url: string };
    };
};

type SocialIconsProps = {
    icons: Social[];
};

export default function SocialIcons({ icons }: SocialIconsProps) {
    return (
        <div className="flex gap-4 items-center">
            {icons.map((icon, idx) => {
                const imgUrl = `https:${icon.fields.file.url}`;
                const link = icon.fields.description.startsWith('http')
                    ? icon.fields.description
                    : `https://${icon.fields.description}`;
                const alt = icon.fields.title || 'Social';

                return (
                    <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Follow us on ${alt}`}
                        aria-label={`Visit our ${alt} page`}
                        className="hover:opacity-80 transition-opacity duration-300"
                    >
                        <Image
                            src={imgUrl}
                            alt={alt}
                            width={24}
                            height={24}
                            priority
                        />
                    </a>
                );
            })}
        </div>
    );
}
// This component renders a list of social media icons.
// Each icon is wrapped in a link that opens the corresponding social media page in a new tab