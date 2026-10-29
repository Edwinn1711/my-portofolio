
"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  return (
    <SectionWrapper
      id="contact"
      className="
        relative mx-auto
        min-h-screen w-full max-w-7xl
        px-4 pb-28 pt-28
        sm:px-6
        md:pt-36
        lg:px-8
      "
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl">

        {/* ====================================
            SECTION HEADING
            ==================================== */}

        <div className="mb-14 space-y-4 text-center md:mb-20">

          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Get in Touch
          </div>

          <h2
            className="
              font-display
              text-[clamp(2.5rem,7vw,5.75rem)]
              font-bold
              leading-[1.08]
              tracking-[-0.06em]
              text-foreground
            "
          >
            LET&apos;S WORK
            <span className="block">
              TOGETHER
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have an exciting project, internship opportunity,
            or collaboration in mind? Let&apos;s connect
            and create something meaningful.
          </p>
        </div>

        {/* ====================================
            CONTACT CARD
            ==================================== */}

        <Card
          className="
            relative w-full overflow-hidden
            rounded-2xl
            border border-border/60
            bg-background/90
            shadow-2xl
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-[#090d18]/95
          "
        >
          {/* Decorative top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <CardHeader
            className="
              space-y-4
              px-6 pb-5 pt-8
              sm:px-10 sm:pt-10
            "
          >
            <CardTitle
              className="
                font-display
                text-3xl
                font-bold
                tracking-tight
                sm:text-4xl
              "
            >
              Contact Form
            </CardTitle>

            <CardDescription className="text-sm leading-7 text-muted-foreground sm:text-base">
              Feel free to send me a message about a project,
              internship opportunity, or collaboration.
              You can also contact me directly at{" "}

              <a
                href={`mailto:${config.email}`}
                className="
                  break-all
                  font-semibold
                  text-foreground
                  underline
                  decoration-sky-400/50
                  underline-offset-4
                  transition-colors
                  hover:text-sky-400
                "
              >
                {config.email.replace("@", "(at)")}
              </a>
              .
            </CardDescription>
          </CardHeader>

          <CardContent
            className="
              px-6 pb-9
              sm:px-10 sm:pb-10
            "
          >
            <ContactForm />
          </CardContent>
        </Card>

        {/* ====================================
            FOOTER MESSAGE
            ==================================== */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Open to opportunities and collaborations
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
