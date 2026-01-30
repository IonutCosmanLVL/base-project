'use client';

import { useMemo, useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export default function ContactUs() {
    const [mounted, setMounted] = useState(false);
    const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
    const initialState: FormState = useMemo(
        () => ({
            name: '',
            email: '',
            phone: '',
            message: '',
        }),
        []
    );

    const embedUrl =  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3135.5331449690057!2d27.512641265998493!3d47.13986163179846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDfCsDA4JzI1LjIiTiAyN8KwMzAnNDkuMCJF!5e0!3m2!1sen!2sro!4v1705395015153!5m2!1sen!2sro';

    const [form, setForm] = useState<FormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const phoneNumber = '0712 345 678';
    const phoneHref = 'tel:+40712345678';

    function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (status !== 'idle') setStatus('idle');
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone || !form.message) {
            setStatus('error');
            return;
        }

        try {
            setIsSubmitting(true);

            // TODO: Replace this with your real submit logic (API route, email service, etc.).
            await new Promise((r) => setTimeout(r, 650));

            setStatus('success');
            setForm(initialState);
        } catch {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="bg-white px-6 xl:px-20">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 18 }}
                animate={mounted && inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-[1440px] mx-auto py-[100px] lg:pt-[250px] lg:pb-[200px]"
            >
            {/* <div className="max-w-[1440px] mx-auto py-[100px] lg:pt-[250px] lg:pb-[200px]"> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                    {/* Left: Content + Form */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-[2px] w-12 bg-gold" />
                            <p className="font-inter uppercase tracking-[0.28em] text-[12px] md:text-[13px] text-gold">
                                Contactează-ne
                            </p>
                        </div>

                        <h2 className="h2 text-dark-grey">
                            Gata să construiești
                            <br />
                            viitoarea ta casă?
                        </h2>

                        <p className="font-inter text-lg leading-[34px] text-grey mt-6 max-w-[560px]">
                            Echipa noastră de experți este aici pentru a transforma viziunea ta în realitate.
                            Completează formularul sau contactează-ne direct.
                        </p>

                        <form onSubmit={onSubmit} className="mt-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                                <Field
                                    label="Nume"
                                    placeholder="Popescu Ion"
                                    value={form.name}
                                    onChange={(v) => onChange('name', v)}
                                    autoComplete="name"
                                />

                                <Field
                                    label="Email"
                                    placeholder="email@exemplu.ro"
                                    value={form.email}
                                    onChange={(v) => onChange('email', v)}
                                    autoComplete="email"
                                    type="email"
                                />

                                <Field
                                    label="Telefon"
                                    placeholder="07xx xxx xxx"
                                    value={form.phone}
                                    onChange={(v) => onChange('phone', v)}
                                    autoComplete="tel"
                                />
                            </div>

                            <div className="mt-10">
                                <label className="block font-inter uppercase tracking-[0.18em] text-[12px] text-[#9aa4b2] mb-4">
                                    Mesaj
                                </label>

                                <textarea
                                    suppressHydrationWarning
                                    value={form.message}
                                    onChange={(e) => onChange('message', e.target.value)}
                                    placeholder="Spune-ne mai multe despre proiectul tău..."
                                    className="
                                        w-full bg-transparent
                                        font-inter text-[16px] text-dark-grey
                                        placeholder:text-[#c7cfda]
                                        outline-none
                                        resize-none
                                        min-h-[120px]
                                        border-b border-[#dfe6f1]
                                        focus:border-gold
                                        transition-colors duration-200
                                        pb-4
                                    "
                                />
                            </div>

                            <div className="mt-12 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="
                                        inline-flex items-center justify-center
                                        bg-dark-grey text-white
                                        px-10 py-4
                                        font-inter font-[700] tracking-[0.08em] uppercase text-[13px]
                                        shadow-sm
                                        transition-all duration-200
                                        hover:bg-gold
                                        disabled:opacity-60 disabled:hover:translate-y-0
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white 
                                        cursor-pointer
                                    "
                                >
                                    {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
                                </button>

                                {status === 'success' && (
                                    <p className="font-inter text-[14px] text-hunter">
                                        Mesaj trimis cu succes.
                                    </p>
                                )}

                                {status === 'error' && (
                                    <p className="font-inter text-[14px] text-[#b42318]">
                                        Completează toate câmpurile.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Right: Call card */}
                    <div className="lg:pt-8">
                        <div
                            className="
                                w-full
                                bg-[#f7fafc]
                                border border-[#edf2f7]
                                p-10 md:p-12
                                min-h-[520px]
                                flex flex-col items-center justify-center text-center
                            "
                        >
                            <div className="h-[84px] w-[84px] rounded-full bg-[#efe7da] flex items-center justify-center mb-10">
                                <Phone className="h-8 w-8 text-gold" strokeWidth={2} />
                            </div>

                            <p className="font-inter uppercase tracking-[0.28em] text-[12px] text-[#9aa4b2] mb-4">
                                Sună-ne acum
                            </p>

                            <a
                                href={phoneHref}
                                className="
                                    font-poppins font-[700]
                                    text-[44px] md:text-[54px]
                                    leading-[1]
                                    text-dark-grey
                                    hover:text-gold
                                    transition-colors duration-200
                                "
                            >
                                {phoneNumber}
                            </a>

                            <p className="mt-8 font-inter text-[16px] leading-[28px] text-[#64748b] max-w-[420px]">
                                Disponibili de Luni până Vineri între orele
                                <br />
                                09:00 și 18:00 pentru consultanță gratuită.
                            </p>
                        </div>
                        <div
                            className="
                                w-full
                                border border-[#edf2f7] mt-[20px]
                                flex flex-col items-center justify-center text-center
                            "
                        >
                            <div className="relative w-full h-[360px] md:h-[420px]">
                                <iframe
                                    title="Ares Residence Location"
                                    src={embedUrl}
                                    className="absolute inset-0 h-full w-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="w-full overflow-hidden border border-black/10 bg-white mt-[80px]">
                    <div className="relative w-full h-[360px] md:h-[420px]">
                        <iframe
                            title="Ares Residence Location"
                            src={embedUrl}
                            className="absolute inset-0 h-full w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div> */}
            {/* </div> */}
            </motion.div>
        </section>
    );
}

function Field(props: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    autoComplete?: string;
}) {
    const { label, placeholder, value, onChange, type = 'text', autoComplete } = props;

    return (
        <div>
            <label className="block font-inter uppercase tracking-[0.18em] text-[12px] text-[#9aa4b2] mb-4">
                {label}
            </label>

            <input
                suppressHydrationWarning
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="
                    w-full bg-transparent
                    font-inter text-[16px] text-dark-grey
                    placeholder:text-[#c7cfda]
                    outline-none
                    border-b border-[#dfe6f1]
                    focus:border-gold
                    transition-colors duration-200
                    pb-3
                "
            />
        </div>
    );
}
