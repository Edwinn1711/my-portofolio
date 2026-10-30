
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight, FileText } from "lucide-react";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  // Get the name from config.ts
  const [firstName, ...remainingNames] = config.author
    .trim()
    .split(/\s+/);

  const lastName = remainingNames.join(" ");

  return (
    <SectionWrapper
      id="hero"
      className={cn("relative w-full min-h-[100dvh] md:h-screen")}
    >
      <div className="grid min-h-[100dvh] md:grid-cols-2">
        <div
          className={cn(
            "relative z-[2] col-span-1",
            "min-h-[100dvh] md:min-h-[calc(100dvh-4rem)]",
            "flex flex-col items-start justify-center",
            "px-6 pt-24 pb-20",
            "sm:px-10 md:px-12 lg:px-16 xl:px-24"
          )}
        >
          {!isLoading && (
            <div className="flex w-full max-w-xl flex-col">

              {/* INTRODUCTION */}
              <BlurIn delay={0.7}>
                <p
                  className={cn(
                    "mb-4 font-medium",
                    "text-base sm:text-lg",
                    "text-slate-500 dark:text-zinc-400"
                  )}
                >
                  Hi, I am
                </p>
              </BlurIn>

              {/* NAME */}
              <BlurIn delay={1}>
                <h1
                  className={cn(
                    "font-display font-bold tracking-tight",
                    "leading-[0.95] cursor-default",
                    "text-6xl sm:text-7xl",
                    "md:text-6xl lg:text-7xl xl:text-8xl",
                    "text-slate-900 dark:text-white"
                  )}
                >
                  <span className="block">
                    {firstName}
                  </span>

                  {lastName && (
                    <span className="block">
                      {lastName}
                    </span>
                  )}
                </h1>
              </BlurIn>

              {/* PROFESSIONAL TITLE */}
              <BlurIn delay={1.2}>
                <p
                  className={cn(
                    "mt-6 text-base sm:text-lg font-medium",
                    "text-slate-700 dark:text-zinc-300"
                  )}
                >
                  Computer Technology Student
                </p>
              </BlurIn>

              {/* AREAS OF INTEREST */}
              <BlurIn delay={1.4}>
                <p
                  className={cn(
                    "mt-2 max-w-md",
                    "text-sm sm:text-base leading-relaxed",
                    "text-slate-500 dark:text-zinc-400"
                  )}
                >
                  Cybersecurity · Web Development · Full-Stack Development
                </p>
              </BlurIn>

              {/* SHORT DESCRIPTION */}
              <BlurIn delay={1.6}>
                <p
                  className={cn(
                    "mt-4 max-w-md text-sm leading-6",
                    "text-slate-500 dark:text-zinc-400"
                  )}
                >
                  Passionate about building secure, functional,
                  and visually engaging digital experiences.
                  Always learning, exploring, and creating.
                </p>
              </BlurIn>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex w-fit flex-col gap-3">

                {/* DOWNLOAD CV */}
                <Link
                  href="/Devin-Siahaan-CV.pdf"
                  download="Devin-Siahaan-CV.pdf"
                  className="flex-1"
                >
                  <BoxReveal delay={2} width="100%">
                    <Button className="flex w-full items-center gap-2">
                      <FileText size={24} />
                      <span>Download CV</span>
                    </Button>
                  </BoxReveal>
                </Link>

                {/* CONTACT AND SOCIAL LINKS */}
                <div className="flex flex-wrap items-center gap-2">

                  <Link href="#contact">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Contact Me
                      <ArrowUpRight size={16} />
                    </Button>
                  </Link>

                  {/* GITHUB */}
                  {config.social.github && (
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit my GitHub"
                    >
                      <Button variant="outline">
                        <SiGithub size={20} />
                      </Button>
                    </Link>
                  )}

                  {/* LINKEDIN */}
                  {config.social.linkedin && (
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit my LinkedIn"
                    >
                      <Button variant="outline">
                        <SiLinkedin size={20} />
                      </Button>
                    </Link>
                  )}

                </div>
              </div>
            </div>
          )}
        </div>

        {/* KEEP THIS FOR THE EXISTING 3D KEYBOARD */}
        <div className="grid col-span-1"></div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
