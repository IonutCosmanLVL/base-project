'use client';

import AnimatedHeadline from './AnimatedHeadline';

interface HeadlineProps {
    text?: string;
    className?: string;
}

export default function Headline({ text = 'ARES', className }: HeadlineProps) {
    return <AnimatedHeadline text={text} className={className} />;
}
// This Headline component is a simple wrapper around the AnimatedHeadline component,
// allowing for easy reuse with default text and optional styling.