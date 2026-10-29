import { createElement } from "react";
import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";


// Validasi data dari Contact Form
const EmailSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

// Pembatasan sederhana untuk development.
// Untuk production serverless, gunakan rate limiter
// berbasis penyimpanan bersama seperti Redis.
const rateLimit = new Map<
  string,
  { count: number; resetAt: number }
>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(req: Request) {
  try {
    // Pastikan API key sudah tersedia di server.
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing.");

      return Response.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    const contentType =
      req.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return Response.json(
        { error: "Invalid content type." },
        { status: 415 }
      );
    }

    // Batas ukuran request
    const rawBody = await req.text();

    if (rawBody.length > 12000) {
      return Response.json(
        { error: "Request is too large." },
        { status: 413 }
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return Response.json(
        { error: "Invalid JSON data." },
        { status: 400 }
      );
    }

    const result = EmailSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error:
            result.error.issues[0]?.message ??
            "Please check your input.",
        },
        { status: 400 }
      );
    }

    // Pembatasan request sederhana
    const ip =
      req.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        {
          error:
            "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const { fullName, email, message } = result.data;

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Devin Portfolio <onboarding@resend.dev>",

      // Penerima diambil dari config.ts
      to: [config.email],

      // Agar tombol Reply menuju email pengunjung
      replyTo: email,

      subject: "New Message — Devin Portfolio",

      react: createElement(EmailTemplate, {
      fullName,
      email,
      message,
    }),
    });

    if (error) {
      // Detail masalah hanya muncul di terminal server.
      console.error("Resend send error:", error);

      return Response.json(
        {
          error:
            "Unable to send your message. Please try again later.",
        },
        { status: 502 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message accepted for delivery.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form API error:", error);

    return Response.json(
      {
        error:
          "Something went wrong while sending the message.",
      },
      { status: 500 }
    );
  }
}
