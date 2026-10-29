"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  X,
} from "lucide-react";

import { config } from "@/data/config";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";
import OnlineUsers from "@/components/realtime/online-users";
import { GameTrigger } from "@/components/game/game-trigger";

type HeaderProps = {
  loader?: boolean;
  githubStars?: ReactNode;
};

type NavName =
  | "Home"
  | "Skills"
  | "Experience"
  | "Organizations"
  | "Projects"
  | "Contact";

type NavItem = {
  title: NavName;
  href: string;
  eyebrow: string;
  headline: string;
  description: string;
  tags: string[];
};

type PreviewPhoto = {
  src: string;
  alt: string;
  label: string;
  position?: "top" | "center";
};

const BASE = "/assets/projects-screenshots";
const SLIDE_INTERVAL_MS = 4000;

// Hanya judul profesional. Nama teknologi tetap ada di bagian Skills.
const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
    eyebrow: "INTRODUCTION / 01",
    headline: "Hi, I'm Devin Siahaan.",
    description:
      "D3 Computer Technology student at Del Institute of Technology. Building meaningful software with a focus on cybersecurity.",
    tags: ["Software Development", "Cybersecurity", "Problem Solving"],
  },
  {
    title: "Skills",
    href: "/#skills",
    eyebrow: "EXPERTISE / 02",
    headline: "My technical toolkit.",
    description:
      "Languages, frameworks, databases, cybersecurity tools, and development workflows I use and explore.",
    tags: ["Development", "Security", "Infrastructure"],
  },
  {
    title: "Experience",
    href: "/#experience",
    eyebrow: "EXPERIENCE / 03",
    headline: "Learning by building.",
    description:
      "Hands-on work across cybersecurity assessments, web applications, and research-driven digital solutions.",
    tags: ["Projects", "Research", "Engineering"],
  },
  {
    title: "Organizations",
    href: "/#organizations",
    eyebrow: "COMMUNITY / 04",
    headline: "Beyond technology.",
    description:
      "Leadership, teamwork, and student activities that help me grow beyond the classroom.",
    tags: ["HIMATEK", "Mentoring", "Teamwork"],
  },
  {
    title: "Projects",
    href: "/#projects",
    eyebrow: "SELECTED WORK / 05",
    headline: "From ideas to impact.",
    description:
      "Explore cybersecurity platforms, digital products, security research, and interactive software demos.",
    tags: ["Cybersecurity", "Full-Stack", "Interactive Demos"],
  },
  {
    title: "Contact",
    href: "/#contact",
    eyebrow: "CONNECT / 06",
    headline: "Let's work together.",
    description:
      "Open to internship opportunities, meaningful collaborations, and conversations about technology.",
    tags: ["Internship", "Collaboration", "Get in Touch"],
  },
];

// Foto mengikuti nama folder yang sudah digunakan di portfolio.
const HOME: PreviewPhoto = {
  src: `${BASE}/home/homedevin.jpeg`,
  label: "Devin Siahaan / Portfolio",
  alt: "Preview portfolio Devin Siahaan",
  position: "center",
};
const TOOLS: PreviewPhoto = {
  src: `${BASE}/tools/tools.png`,
  label: "Tools & Technologies",
  alt: "Ilustrasi tools dan teknologi Devin",
  position: "center",
};
const EXP1: PreviewPhoto = {
  src: `${BASE}/experience/exp1.jpeg`,
  label: "Experience / Photo 01",
  alt: "Dokumentasi pengalaman Devin, foto pertama",
};
const EXP2: PreviewPhoto = {
  src: `${BASE}/experience/exp2.jpeg`,
  label: "Experience / Photo 02",
  alt: "Dokumentasi pengalaman Devin, foto kedua",
};
const CULINARY: PreviewPhoto = {
  src: `${BASE}/pa1-website-kuliner-batak-toba/pa1.jpeg`,
  label: "Toba Batak Culinary",
  alt: "Website Toba Batak Culinary",
  position: "top",
};
const READINESS: PreviewPhoto = {
  src: `${BASE}/pa2-cybersecurity-readiness-index/pa2.jpeg`,
  label: "Cybersecurity Readiness Assessment",
  alt: "Platform cybersecurity readiness untuk siswa SMA dan SMK",
  position: "top",
};
const ENHANCEMENT: PreviewPhoto = {
  src: `${BASE}/ta1-pengembangan-cri-domain/ta1.jpeg`,
  label: "Cybersecurity Assessment Enhancement",
  alt: "Pengembangan platform cybersecurity readiness",
  position: "top",
};

const NAV_PHOTOS: Record<NavName, PreviewPhoto[]> = {
  Home: [HOME, EXP1, CULINARY],
  Skills: [TOOLS], // FOTO TOOLS TETAP, TIDAK BERGANTI.
  Experience: [EXP1, EXP2],
  Organizations: [EXP2, EXP1],
  Projects: [CULINARY, READINESS, ENHANCEMENT],
  Contact: [HOME, EXP1, EXP2],
};

export default function Header({ loader = false, githubStars }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);

  const activeItem = NAV_ITEMS[activeIndex] ?? NAV_ITEMS[0];
  const photos = NAV_PHOTOS[activeItem.title].filter(
    (photo) => !brokenImages.includes(photo.src)
  );
  const currentIndex = photos.length ? slideIndex % photos.length : 0;
  const currentPhoto = photos[currentIndex] ?? null;
  const showCarouselControls = photos.length > 1;
  const isHome = pathname === "/";

  // Hanya dijalankan ketika menu terbuka. Satu foto pada Skills selalu statis.
  useEffect(() => {
    if (!isOpen || isPaused || photos.length < 2) return;
    const timer = window.setInterval(() => {
      setSlideIndex((previous) => previous + 1);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isOpen, isPaused, activeIndex, photos.length]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const selectNavItem = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setSlideIndex(0);
    setIsPaused(false);
  };

  const openMenu = () => {
    if (!isOpen) {
      const hash = window.location.hash;
      const index = NAV_ITEMS.findIndex((item) =>
        hash && item.href.endsWith(hash)
      );
      setActiveIndex(index >= 0 ? index : 0);
      setSlideIndex(0);
      setIsPaused(false);
    }
    setIsOpen((previous) => !previous);
  };

  const markImageBroken = (src: string) => {
    setBrokenImages((previous) =>
      previous.includes(src) ? previous : [...previous, src]
    );
  };

  return (
    <motion.header
      initial={{ y: loader ? -80 : 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[1000]"
    >
      {/* Bar atas tetap terlihat saat navigasi terbuka. */}
      <div
        className={`pointer-events-auto relative z-50 flex h-[72px] items-center justify-between border-b px-5 backdrop-blur-xl transition-colors sm:px-8 lg:px-12 ${
          isOpen
            ? "border-white/10 bg-[#080d18] text-white"
            : "border-border/30 bg-background/65 text-foreground"
        }`}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="truncate text-sm font-extrabold tracking-tight transition-opacity hover:opacity-70 sm:text-base"
          aria-label="Back to home"
        >
          {config.author}
        </Link>

        <div className="flex items-center gap-4">
          <FunnyThemeToggle className={`hidden h-5 w-5 md:flex ${isOpen ? "text-white" : ""}`} />
          {!isOpen && isHome && process.env.NEXT_PUBLIC_WS_URL && (
            <div className="hidden items-center gap-2 lg:flex">
              <GameTrigger />
              <OnlineUsers />
            </div>
          )}
          {!isOpen && githubStars && (
            <div className="hidden items-center sm:flex">{githubStars}</div>
          )}
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={isOpen}
            aria-controls="devin-fullscreen-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`inline-flex h-11 min-w-[112px] items-center justify-center gap-3 rounded-full border px-5 text-xs font-bold uppercase tracking-[0.13em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
              isOpen
                ? "border-white bg-white text-slate-950 hover:bg-slate-200"
                : "border-foreground/20 bg-foreground/5 text-foreground hover:border-foreground/40 hover:bg-foreground/10"
            }`}
          >
            {isOpen ? "Close" : "Menu"}
            {isOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="devin-fullscreen-navigation"
            aria-label="Main navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            className="pointer-events-auto fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[#080d18] pt-[72px] text-white"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_18%,rgba(27,97,135,0.16),transparent_48%),radial-gradient(ellipse_at_15%_90%,rgba(15,84,101,0.12),transparent_45%)]" />
            <div className="relative mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-[1480px] flex-col px-5 pb-7 pt-8 sm:px-9 lg:px-14 lg:pt-10">
              {/* Small editorial navigation header */}
              <div className="mb-6 flex items-center justify-between gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.21em] text-slate-400 sm:mb-8 sm:text-xs">
                <span>Devin Siahaan <span className="text-cyan-300/70">/</span> Navigation</span>
                <span className="hidden sm:inline">Explore portfolio — 01 / 06</span>
              </div>

              <div className="grid flex-1 items-center gap-9 lg:grid-cols-[minmax(0,0.97fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
                {/* Links: ukuran tidak terlalu dominan */}
                <div className="flex min-w-0 flex-col gap-1.5">
                  {NAV_ITEMS.map((item, index) => {
                    const selected = activeIndex === index;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onMouseEnter={() => selectNavItem(index)}
                        onFocus={() => selectNavItem(index)}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex min-h-[60px] w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border px-4 py-3 outline-none transition-colors duration-200 sm:min-h-[68px] sm:px-5 lg:min-h-[70px] ${
                          selected
                            ? "border-white/20 bg-white/[0.085] text-white shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
                            : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.045] hover:text-white"
                        } focus-visible:border-cyan-300`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="devin-nav-accent"
                            transition={{ type: "spring", stiffness: 450, damping: 38 }}
                            className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-cyan-300"
                          />
                        )}
                        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                          <span className="w-5 shrink-0 font-mono text-[11px] text-cyan-300/80 sm:w-6">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[clamp(1.65rem,2.8vw,2.75rem)] font-bold leading-none tracking-[-0.05em]">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className={`shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                            selected ? "text-cyan-200 opacity-100" : "opacity-30"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* Hero-like preview panel. Skills shows only tools.png. */}
                <div className="hidden min-w-0 sm:block">
                  <div className="overflow-hidden rounded-[26px] border border-white/15 bg-[#101b2c] shadow-[0_28px_75px_rgba(0,0,0,0.34)]">
                    <div className="relative h-[290px] overflow-hidden bg-[#0b1525] lg:h-[315px] xl:h-[350px]">
                      {currentPhoto ? (
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={currentPhoto.src}
                            initial={{ opacity: 0, scale: 1.045 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.995 }}
                            transition={{ duration: 0.38, ease: "easeInOut" }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={currentPhoto.src}
                              alt={currentPhoto.alt}
                              fill
                              sizes="(max-width: 1024px) 90vw, 50vw"
                              className="object-cover"
                              style={{ objectPosition: currentPhoto.position ?? "center" }}
                              onError={() => markImageBroken(currentPhoto.src)}
                            />
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-cyan-200/70">
                          <ShieldCheck size={56} strokeWidth={1.1} />
                          <p className="max-w-xs px-6 text-center text-sm text-slate-400">
                            Preview akan tampil setelah foto ditambahkan ke folder proyek.
                          </p>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101b2c] via-transparent to-black/10" />
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                        {currentPhoto && (
                          <span className="max-w-[62%] truncate rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                            {currentPhoto.label}
                          </span>
                        )}
                        {showCarouselControls && (
                          <div className="ml-auto flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-black/65 p-1 text-white backdrop-blur-md">
                            <button
                              type="button"
                              onClick={() => setSlideIndex((old) => (old - 1 + photos.length) % photos.length)}
                              aria-label="Previous photo"
                              className="rounded-full p-1.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="min-w-[40px] text-center font-mono text-[10px] tabular-nums">
                              {String(currentIndex + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => setSlideIndex((old) => old + 1)}
                              aria-label="Next photo"
                              className="rounded-full p-1.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                            >
                              <ChevronRight size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsPaused((old) => !old)}
                              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                              aria-pressed={isPaused}
                              className="rounded-full p-1.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                            >
                              {isPaused ? <Play size={14} /> : <Pause size={14} />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Informasi disederhanakan agar foto terlihat dominan. */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeItem.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex min-h-[175px] flex-col justify-center px-6 py-5 xl:px-7"
                      >
                        <span className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                          {activeItem.eyebrow}
                        </span>
                        <h2 className="font-display text-[clamp(1.5rem,2vw,2rem)] font-bold leading-tight tracking-tight text-white">
                          {activeItem.headline}
                        </h2>
                        <p className="mt-2 max-w-[520px] text-[13px] leading-relaxed text-slate-300">
                          {activeItem.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {activeItem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/15 bg-white/[0.045] px-2.5 py-1 text-[10px] text-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Simple footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-slate-400">
                <div className="flex items-center gap-5">
                  {config.social.github && (
                    <a
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-white"
                    >
                      <Github size={15} /> GitHub
                    </a>
                  )}
                  {config.social.linkedin && (
                    <a
                      href={config.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-white"
                    >
                      <Linkedin size={15} /> LinkedIn
                    </a>
                  )}
                </div>
                <span className="text-slate-500">Computer Technology · Del Institute of Technology</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
