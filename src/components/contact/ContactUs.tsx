'use client';

import { useEffect, useMemo, useState } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

type SubmitStatus = 'idle' | 'success' | 'error';

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

    const embedUrl =
        'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3135.5331449690057!2d27.512641265998493!3d47.13986163179846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDfCsDA4JzI1LjIiTiAyN8KwMzAnNDkuMCJF!5e0!3m2!1sen!2sro!4v1705395015153!5m2!1sen!2sro';

    const [form, setForm] = useState<FormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<SubmitStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const phoneNumber = '0712 345 678';
    const phoneHref = 'tel:+40712345678';

    function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (status !== 'idle') {
            setStatus('idle');
            setStatusMessage('');
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone || !form.message) {
            setStatus('error');
            setStatusMessage('Completeaza toate campurile.');
            return;
        }

        try {
            setIsSubmitting(true);
            setStatus('idle');
            setStatusMessage('');

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error || 'Mesajul nu a putut fi trimis.');
            }

            setStatus('success');
            setStatusMessage('Mesaj trimis cu succes. Iti raspundem in cel mai scurt timp.');
            setForm(initialState);
        } catch (error) {
            setStatus('error');
            setStatusMessage(
                error instanceof Error ? error.message : 'Mesajul nu a putut fi trimis.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="contact" className="bg-white px-6 xl:px-20">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 18 }}
                animate={mounted && inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mx-auto max-w-[1440px] py-[100px] lg:pb-[200px] lg:pt-[250px]"
            >
                <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-[2px] w-12 bg-gold" />
                            <p className="font-inter text-[12px] uppercase tracking-[0.28em] text-gold md:text-[13px]">
                                Contacteaza-ne
                            </p>
                        </div>

                        <h2 className="h2 text-dark-grey">
                            Gata sa construiesti
                            <br />
                            viitoarea ta casa?
                        </h2>

                        <p className="mt-6 max-w-[560px] font-inter text-lg leading-[34px] text-grey">
                            Echipa noastra de experti este aici pentru a transforma viziunea ta in realitate.
                            Completeaza formularul sau contacteaza-ne direct.
                        </p>

                        <form onSubmit={onSubmit} className="mt-12">
                            <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
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
                                <label className="mb-4 block font-inter text-[12px] uppercase tracking-[0.18em] text-[#9aa4b2]">
                                    Mesaj
                                </label>

                                <textarea
                                    suppressHydrationWarning
                                    value={form.message}
                                    onChange={(e) => onChange('message', e.target.value)}
                                    placeholder="Spune-ne mai multe despre proiectul tau..."
                                    className="w-full min-h-[120px] resize-none border-b border-[#dfe6f1] bg-transparent pb-4 font-inter text-[16px] text-dark-grey outline-none transition-colors duration-200 placeholder:text-[#c7cfda] focus:border-gold"
                                />
                            </div>

                            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex cursor-pointer items-center justify-center bg-dark-grey px-10 py-4 font-inter text-[13px] font-[700] uppercase tracking-[0.08em] text-white shadow-sm transition-all duration-200 hover:bg-gold disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                >
                                    {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
                                </button>

                                {status !== 'idle' && (
                                    <p
                                        className={`font-inter text-[14px] ${
                                            status === 'success' ? 'text-hunter' : 'text-[#b42318]'
                                        }`}
                                    >
                                        {statusMessage}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="lg:pt-8">
                        <div className="flex min-h-[520px] w-full flex-col items-center justify-center border border-[#edf2f7] bg-[#f7fafc] p-10 text-center md:p-12">
                            <div className="mb-10 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#efe7da]">
                                <Phone className="h-8 w-8 text-gold" strokeWidth={2} />
                            </div>

                            <p className="mb-4 font-inter text-[12px] uppercase tracking-[0.28em] text-[#9aa4b2]">
                                Suna-ne acum
                            </p>

                            <a
                                href={phoneHref}
                                className="font-poppins text-[44px] font-[700] leading-[1] text-dark-grey transition-colors duration-200 hover:text-gold md:text-[54px]"
                            >
                                {phoneNumber}
                            </a>

                            <p className="mt-8 max-w-[420px] font-inter text-[16px] leading-[28px] text-[#64748b]">
                                Disponibili de luni pana vineri intre orele
                                <br />
                                09:00 si 18:00 pentru consultanta gratuita.
                            </p>
                        </div>
                        <div className="mt-[20px] flex w-full flex-col items-center justify-center border border-[#edf2f7] text-center">
                            <div className="relative h-[360px] w-full md:h-[420px]">
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
            <label className="mb-4 block font-inter text-[12px] uppercase tracking-[0.18em] text-[#9aa4b2]">
                {label}
            </label>

            <input
                suppressHydrationWarning
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="w-full border-b border-[#dfe6f1] bg-transparent pb-3 font-inter text-[16px] text-dark-grey outline-none transition-colors duration-200 placeholder:text-[#c7cfda] focus:border-gold"
            />
        </div>
    );
}
