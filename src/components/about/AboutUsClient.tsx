'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import type { AboutUsFields } from "@/lib/types/aboutUs";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

export default function AboutUsClient({ data }: { data: AboutUsFields }) {
    console.log("About Us data:", data);

    const paragraphText = data.aboutUsParagraph;
    const rightImg = data.imageRightUrl?.startsWith('//') 
        ? `https:${data.imageRightUrl}` 
        : data.imageRightUrl;

    const leftImg = data.imageLeftUrl?.startsWith('//') 
        ? `https:${data.imageLeftUrl}` 
        : data.imageLeftUrl;    

    const variants = {
        hiddenUp: { opacity: 0, y: 40 },
        hiddenLeft: { opacity: 0, x: -60 },
        hiddenRight: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, y: 0 },
    };

    const [headingRef, headingInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [lineRef, lineInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [paragraphRef, paragraphInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [linkRef, linkInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [imgRightRef, imgRightInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [imgLeftRef, imgLeftInView] = useInView({ threshold: 0.45, triggerOnce: true });

    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: { content: any[]; }, children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => {
                // Get plain text value of the paragraph
                const text = node.content.map((c: { value: any; }) => c.value).join('').trim();

                // Check if paragraph is empty (used as spacing)
                if (text === '') {
                    return <div key={index} className="h-6" />; // empty row (adjust height if needed)
                }

                return (
                    <p key={index} className="leading-[34px] text-light-grey">
                        {children}
                    </p>
                );
            },
        },
    };

    return (
        <section className="relative py-[120px] px-[24px] xl:px-20 bg-white">
            <div className="xl:max-w-[1440px] w-full mx-auto flex flex-col items-start overflow-hidden lg:overflow-visible">
                <div className="lg:max-w-[75%] z-5">
                    <motion.h2
                        ref={headingRef}
                        className="text-4xl md:text-5xl lg:text-[40px] font-inter font-bold uppercase tracking-wide text-dark-grey mb-[55px] xl:mb-[85px]"
                        variants={variants}
                        initial="hiddenUp"
                        animate={headingInView ? "visible" : "hiddenUp"}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                    >
                        {data.headline}
                    </motion.h2>

                    <div className="w-full flex flex-col xl:flex-row">
                        <motion.div
                            ref={lineRef}
                            className="bg-gold w-[250px] min-w-[250px] h-[2px] opacity-60 mb-[60px] xl:mr-[115px]"
                            variants={variants}
                            initial="hiddenLeft"
                            animate={lineInView ? "visible" : "hiddenLeft"}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                        />
                        <motion.div
                            ref={paragraphRef}
                            className="relative"
                            variants={variants}
                            initial="hiddenRight"
                            animate={paragraphInView ? "visible" : "hiddenRight"}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                        >
                            <div className="font-inter text-lg text-light-grey leading-[34px] mb-[60px] xl:mb-[110px] mt-[-10px]">
                                 {documentToReactComponents(paragraphText as Document, options)}
                            </div>

                            <motion.div
                                ref={linkRef}
                                initial={{ opacity: 0 }}
                                animate={linkInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
                            >
                                <Link
                                    href={data.linkUrl}
                                    className="absolute bottom-[-25px] left-0 uppercase text-grey hover:border-tan-light font-inter text-[16px] font-semibold hover:text-gold transition-colors duration-300 border-b-[2px] border-gold pb-[4px]"
                                >
                                    {data.linkText}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Images */}
                <div className="relative w-full h-auto lg:h-[500px] z-3 mt-20 xl:mt-0">
                    <motion.div
                        ref={imgRightRef}
                        className="relative lg:absolute lg:top-0 lg:right-0 w-full lg:w-[50%] h-[100%] min-h-[450px] overflow-hidden lg:border-l-[20px] lg:border-b-[20px] lg:border-white z-2"
                        variants={variants}
                        initial="hiddenRight"
                        animate={imgRightInView ? "visible" : "hiddenRight"}
                        transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                    >
                        <Image
                            src={rightImg  || "/fallback.jpg"}
                            alt="Modern luxury home"
                            fill
                            className="object-cover"
                        />              
                    </motion.div>

                    <motion.div
                        ref={imgLeftRef}
                        className="relative lg:absolute lg:bottom-[-40%] lg:left-0 w-full lg:w-[65%] h-[65%] min-h-[450px] overflow-hidden z-1 mt-[20px] lg:mt-0"
                        variants={variants}
                        initial="hiddenLeft"
                        animate={imgLeftInView ? "visible" : "hiddenLeft"}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                    >
                        <Image
                            src={leftImg || "/fallback.jpg"}
                            alt="Contemporary villa"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
