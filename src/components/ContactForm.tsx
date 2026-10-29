
"use client";

import React, { useState } from "react";
import type { FormEvent } from "react";

import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// =======================================
// FORM TYPES
// =======================================

type ContactFormData = {
  fullName: string;
  email: string;
  message: string;
  website: string;
};

type FormStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  id?: string;
};

const initialForm: ContactFormData = {
  fullName: "",
  email: "",
  message: "",
  website: "",
};

// =======================================
// CONTACT FORM
// =======================================

export default function ContactForm() {
  const [form, setForm] =
    useState<ContactFormData>(initialForm);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [feedback, setFeedback] = useState("");

  // =====================================
  // UPDATE INPUT
  // =====================================

  const updateField = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (
      status === "error" ||
      status === "success"
    ) {
      setStatus("idle");
      setFeedback("");
    }
  };

  // =====================================
  // SUBMIT FORM TO RESEND API
  // =====================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      });

      let result: ApiResponse = {};

      try {
        result = (await response.json()) as ApiResponse;
      } catch {
        // Handle non-JSON API responses.
      }

      // Check response status
      if (!response.ok || result.success === false) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to send your message. Please try again."
        );
      }

      // ===================================
      // SUCCESS
      // ===================================

      setStatus("success");

      setFeedback(
        "Your message has been submitted successfully! Thank you for reaching out."
      );

      // Clear fields after successful submission
      setForm(initialForm);
    } catch (error) {
      // ===================================
      // ERROR
      // ===================================

      setStatus("error");

      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  // =====================================
  // INPUT STYLES
  // =====================================

  const inputClassName = `
    w-full rounded-lg
    border border-border/60
    bg-zinc-100 px-4 py-3
    text-sm text-foreground
    outline-none
    transition-all duration-200
    placeholder:text-muted-foreground/70
    focus:border-primary/60
    focus:ring-2 focus:ring-primary/15
    dark:bg-zinc-800/90
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* ================================= */}
      {/* FULL NAME AND EMAIL               */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* FULL NAME */}
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-semibold"
          >
            Full name
          </label>

          <input
            id="contact-name"
            type="text"
            name="fullName"
            autoComplete="name"
            placeholder="Your Name"
            value={form.fullName}
            onChange={(event) =>
              updateField(
                "fullName",
                event.target.value
              )
            }
            minLength={2}
            maxLength={100}
            required
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        {/* EMAIL ADDRESS */}
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-semibold"
          >
            Email Address
          </label>

          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
            maxLength={254}
            required
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>
      </div>

      {/* ================================= */}
      {/* MESSAGE                           */}
      {/* ================================= */}

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold"
        >
          Your Message
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell me about your project, collaboration, or opportunity..."
          value={form.message}
          onChange={(event) =>
            updateField(
              "message",
              event.target.value
            )
          }
          minLength={10}
          maxLength={5000}
          required
          disabled={status === "loading"}
          className={`${inputClassName} resize-y`}
        />
      </div>

      {/* ================================= */}
      {/* HONEYPOT FIELD                     */}
      {/* ================================= */}

      <div
        className="absolute -left-[9999px]"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">
          Leave this field empty
        </label>

        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) =>
            updateField(
              "website",
              event.target.value
            )
          }
        />
      </div>

      {/* PRIVACY INFORMATION */}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Your contact information will only be used
        to respond to your message.
      </p>

      {/* ================================= */}
      {/* SUCCESS / ERROR FEEDBACK          */}
      {/* ================================= */}

      {feedback && (
        <div
          role={
            status === "error"
              ? "alert"
              : "status"
          }
          aria-live="polite"
          className={`
            flex items-start gap-3
            rounded-lg border p-3 text-sm
            ${
              status === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                : "border-red-500/30 bg-red-500/10 text-red-500"
            }
          `}
        >
          {status === "success" ? (
            <CheckCircle2
              size={18}
              className="shrink-0"
            />
          ) : (
            <AlertCircle
              size={18}
              className="shrink-0"
            />
          )}

          <span>{feedback}</span>
        </div>
      )}

      {/* ================================= */}
      {/* SEND MESSAGE BUTTON               */}
      {/* ================================= */}

      <button
        type="submit"
        disabled={status === "loading"}
        className="
          flex w-full items-center
          justify-center gap-3
          rounded-lg border border-border/60
          bg-zinc-100 px-6 py-3.5
          font-semibold text-zinc-900
          transition-all duration-200
          hover:bg-zinc-200
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          disabled:cursor-not-allowed
          disabled:opacity-60
          dark:bg-zinc-900
          dark:text-white
          dark:hover:bg-zinc-800
        "
      >
        {status === "loading" ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
