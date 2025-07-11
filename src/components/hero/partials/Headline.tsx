'use client';

import AnimatedHeadline from './AnimatedHeadline';

interface HeadlineProps {
  staticTitle: string;
  animatedPhrases: string[];
}

export default function Headline({ staticTitle, animatedPhrases }: HeadlineProps) {
  return (
    <AnimatedHeadline
      phrases={animatedPhrases}
      staticText={staticTitle}
      className="block"
    />
  );
}
// This Headline component renders an animated headline with a static title and rotating phrases.
// It uses the AnimatedHeadline component to create a visually engaging effect.