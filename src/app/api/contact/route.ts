import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_RECIPIENT = "ionutcosman.d@gmail.com";
const DEFAULT_FROM = "Ares Residence <onboarding@resend.dev>";

type ContactPayload = {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
};

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !phone || !message) {
        return NextResponse.json(
            { error: "Toate campurile sunt obligatorii." },
            { status: 400 }
        );
    }

    if (!isValidEmail(email)) {
        return NextResponse.json(
            { error: "Adresa de email nu este valida." },
            { status: 400 }
        );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "Lipseste configurarea pentru trimiterea emailurilor." },
            { status: 500 }
        );
    }

    try {
        const resend = new Resend(apiKey);

        await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
            to: CONTACT_RECIPIENT,
            replyTo: email,
            subject: `Mesaj nou Ares Residence de la ${name}`,
            html: `
                <div>
                    <p><strong>Nume:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Telefon:</strong> ${phone}</p>
                    <p><strong>Mesaj:</strong></p>
                    <p>${message.replace(/\n/g, "<br />")}</p>
                </div>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json(
            { error: "Mesajul nu a putut fi trimis." },
            { status: 502 }
        );
    }
}
