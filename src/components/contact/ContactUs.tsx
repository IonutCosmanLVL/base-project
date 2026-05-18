'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

type SubmitStatus = 'idle' | 'success' | 'error';
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactUs() {
    const [mounted, setMounted] = useState(false);
    const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
    const messageId = useId();
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
    const [errors, setErrors] = useState<FormErrors>({});

    const phoneNumber = '0712 345 678';
    const phoneHref = 'tel:+40712345678';

    function validateForm(values: FormState): FormErrors {
        const nextErrors: FormErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const normalizedPhone = values.phone.replace(/[\s().-]/g, '');
        const phonePattern = /^(?:\+40|0040|0)7\d{8}$/;

        if (!values.name.trim()) {
            nextErrors.name = 'Introdu numele tău.';
        }

        if (!values.email.trim()) {
            nextErrors.email = 'Introdu adresa de email.';
        } else if (!emailPattern.test(values.email.trim())) {
            nextErrors.email = 'Introdu o adresă de email validă.';
        }

        if (!values.phone.trim()) {
            nextErrors.phone = 'Introdu numărul de telefon.';
        } else if (!phonePattern.test(normalizedPhone)) {
            nextErrors.phone = 'Introdu un număr valid, de forma 07xx xxx xxx.';
        }

        if (!values.message.trim()) {
            nextErrors.message = 'Scrie câteva detalii despre proiect.';
        }

        return nextErrors;
    }

    function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            if (!prev[key]) {
                return prev;
            }

            const rest = { ...prev };
            delete rest[key];
            return rest;
        });
        if (status !== 'idle') {
            setStatus('idle');
            setStatusMessage('');
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const validationErrors = validateForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setStatus('error');
            setStatusMessage('Te rugăm să corectezi câmpurile marcate.');
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
            setStatusMessage('Mesaj trimis cu succes. Îți răspundem în cel mai scurt timp.');
            setErrors({});
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
        <section
            id="contact"
            className="bg-white px-6 xl:px-20"
            aria-labelledby="contact-title"
        >
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 18 }}
                animate={mounted && inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mx-auto max-w-[1440px] py-[100px] lg:py-[120px]"
            >
                <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-[2px] w-12 bg-gold" />
                            <p className="font-inter text-[12px] uppercase tracking-[0.28em] text-gold md:text-[13px]">
                                Contactează-ne
                            </p>
                        </div>

                        <h2 id="contact-title" className="h2 text-dark-grey">
                            Gata să construiești
                            <br />
                            viitoarea ta casă?
                        </h2>

                        <p className="mt-6 max-w-[560px] font-inter text-[18px] leading-[28px] text-grey">
                            Echipa noastră te ajută să transformi ideea unei locuințe moderne în realitate.
                            Completează formularul sau contactează-ne direct pentru detalii despre proiect.
                        </p>

                        <form onSubmit={onSubmit} className="mt-12">
                            <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
                                <Field
                                    label="Nume"
                                    placeholder="Popescu Ion"
                                    value={form.name}
                                    onChange={(v) => onChange('name', v)}
                                    autoComplete="name"
                                    error={errors.name}
                                />

                                <Field
                                    label="Email"
                                    placeholder="email@exemplu.ro"
                                    value={form.email}
                                    onChange={(v) => onChange('email', v)}
                                    autoComplete="email"
                                    type="email"
                                    error={errors.email}
                                />

                                <Field
                                    label="Telefon"
                                    placeholder="07xx xxx xxx"
                                    value={form.phone}
                                    onChange={(v) => onChange('phone', v)}
                                    autoComplete="tel"
                                    error={errors.phone}
                                />
                            </div>

                            <div className="mt-10">
                                <label
                                    htmlFor={messageId}
                                    className="mb-4 block font-inter text-[12px] uppercase tracking-[0.18em] text-[#9aa4b2]"
                                >
                                    Mesaj
                                </label>

                                <textarea
                                    id={messageId}
                                    suppressHydrationWarning
                                    value={form.message}
                                    onChange={(e) => onChange('message', e.target.value)}
                                    aria-invalid={Boolean(errors.message)}
                                    aria-describedby={errors.message ? `${messageId}-error` : undefined}
                                    placeholder="Spune-ne mai multe despre proiectul tău..."
                                    className={`w-full min-h-[120px] resize-none border-b bg-transparent pb-4 font-inter text-[16px] text-dark-grey outline-none transition-colors duration-200 placeholder:text-[#c7cfda] focus:border-gold ${
                                        errors.message ? 'border-[#b42318]' : 'border-[#dfe6f1]'
                                    }`}
                                />
                                {errors.message && (
                                    <p id={`${messageId}-error`} className="mt-3 font-inter text-[13px] text-[#b42318]">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-12 flex flex-col items-start gap-4">
                                {status !== 'idle' && (
                                    <p
                                        id="contact-form-status"
                                        role="status"
                                        className={`font-inter text-[14px] ${
                                            status === 'success' ? 'text-hunter' : 'text-[#b42318]'
                                        }`}
                                    >
                                        {statusMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    aria-describedby={status !== 'idle' ? 'contact-form-status' : undefined}
                                    className="inline-flex h-14 items-center justify-center gap-3 border-2 border-dark-grey bg-white px-8 font-inter text-[13px] font-[700] capitalize tracking-[0.04em] text-dark-grey shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold focus-visible:-translate-y-0.5 focus-visible:border-gold focus-visible:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0"
                                >
                                    <span>{isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}</span>
                                    <ArrowRight className="h-4 w-4 text-dark-grey" aria-hidden="true" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:pt-8">
                        <address className="flex min-h-[520px] w-full flex-col items-center justify-center border border-[#edf2f7] bg-[#f7fafc] p-10 text-center not-italic md:p-12">
                            <div className="mb-10 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#efe7da]">
                                <Phone className="h-8 w-8 text-gold" strokeWidth={2} aria-hidden="true" />
                            </div>

                            <p className="mb-4 font-inter text-[12px] uppercase tracking-[0.28em] text-[#9aa4b2]">
                                Sună-ne acum
                            </p>

                            <a
                                href={phoneHref}
                                aria-label={`Sună Ares Residence la ${phoneNumber}`}
                                className="font-poppins text-[44px] font-[700] leading-[1] text-dark-grey transition-colors duration-200 hover:text-gold md:text-[54px]"
                            >
                                {phoneNumber}
                            </a>

                            <p className="mt-8 max-w-[420px] font-inter text-[18px] leading-[28px] text-[#64748b]">
                                Disponibili de luni până vineri între orele
                                <br />
                                09:00 și 18:00 pentru consultanță gratuită.
                            </p>
                        </address>
                        <div className="mt-[20px] flex w-full flex-col items-center justify-center border border-[#edf2f7] text-center">
                            <div className="relative h-[360px] w-full md:h-[420px]">
                                <iframe
                                    title="Hartă Ares Residence"
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
    error?: string;
}) {
    const { label, placeholder, value, onChange, type = 'text', autoComplete, error } = props;
    const id = useId();
    const errorId = `${id}-error`;

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-4 block font-inter text-[12px] uppercase tracking-[0.18em] text-[#9aa4b2]"
            >
                {label}
            </label>

            <input
                id={id}
                suppressHydrationWarning
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`w-full border-b bg-transparent pb-3 font-inter text-[16px] text-dark-grey outline-none transition-colors duration-200 placeholder:text-[#c7cfda] focus:border-gold ${
                    error ? 'border-[#b42318]' : 'border-[#dfe6f1]'
                }`}
            />
            {error && (
                <p id={errorId} className="mt-3 font-inter text-[13px] text-[#b42318]">
                    {error}
                </p>
            )}
        </div>
    );
}
