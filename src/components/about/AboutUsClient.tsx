'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutUsClient() {
    const [headingRef, headingInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [lineRef, lineInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [paragraphRef, paragraphInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [linkRef, linkInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [imgRightRef, imgRightInView] = useInView({ threshold: 0.45, triggerOnce: true });
    const [imgLeftRef, imgLeftInView] = useInView({ threshold: 0.45, triggerOnce: true });

    const variants = {
        hiddenUp: { opacity: 0, y: 40 },
        hiddenLeft: { opacity: 0, x: -60 },
        hiddenRight: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, y: 0 },
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
                        animate={headingInView ? 'visible' : 'hiddenUp'}
                        transition={{duration: 0.8, ease: 'easeInOut' }}
                    >
                        Despre Ares Residence
                    </motion.h2>

                    <div className="w-full flex flex-col xl:flex-row">
                        <motion.div
                            ref={lineRef}
                            className="bg-gold w-[250px] min-w-[250px] h-[2px] opacity-60 mb-[60px] xl:mr-[115px]"
                            variants={variants}
                            initial="hiddenLeft"
                            animate={lineInView ? 'visible' : 'hiddenLeft'}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        />

                        <motion.div
                            ref={paragraphRef}
                            className="relative"
                            variants={variants}
                            initial="hiddenRight"
                            animate={paragraphInView ? 'visible' : 'hiddenRight'}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        >
                            <div className="font-inter text-lg text-light-grey leading-[34px] mb-[60px] xl:mb-[110px] mt-[-10px] space-y-6">
                                <p>
                                    Ares Residence prezintă un remarcabil proiect imobiliar, menit să ducă mai departe tradiția dezvoltatorului de a crea opere de artă arhitecturale, conform standardelor occidentale, folosind materiale de cea mai înaltă calitate.
                                </p>
                                <p>
                                    În cadrul acestui proiect, punem un accent deosebit pe oferirea unei experiențe excepționale. Ne dedicăm să vă ținem la curent cu fiecare etapă a construcției, asigurând transparență absolută.
                                </p>
                            </div>

                            <motion.div
                                ref={linkRef}
                                initial={{ opacity: 0 }}
                                animate={linkInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{duration: 0.6, ease: 'easeInOut' }}
                            >
                                <Link
                                    href="/about-us"
                                    className="absolute bottom-[-25px] left-0 uppercase text-grey hover:border-tan-light font-inter text-[16px] font-semibold hover:text-gold transition-colors duration-300 border-b-[2px] border-gold pb-[4px]"
                                >
                                    despre noi
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
                        animate={imgRightInView ? 'visible' : 'hiddenRight'}
                        transition={{duration: 0.6, ease: 'easeInOut' }}
                    >
                        <Image
                            src="/images/black-house-bg.jpg"
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
                        animate={imgLeftInView ? 'visible' : 'hiddenLeft'}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <Image
                            src="/images/black-house2-bg.jpg"
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
