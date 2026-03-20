import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const CONTACT_RECIPIENT = "ionut.cosman@ymail.com";
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

    const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
            to: [CONTACT_RECIPIENT],
            reply_to: email,
            subject: `Mesaj nou Ares Residence de la ${name}`,
            text: [
                `Nume: ${name}`,
                `Email: ${email}`,
                `Telefon: ${phone}`,
                "",
                "Mesaj:",
                message,
            ].join("\n"),
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
            { error: "Mesajul nu a putut fi trimis.", details: errorText },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}
