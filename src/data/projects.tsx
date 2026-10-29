
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import {
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";

// ==========================================
// AUTOMATIC PROJECT COVER GENERATOR
// ==========================================
// Creates cover art without needing image files.

const makeCover = (
  title: string,
  subtitle: string,
  accent: string
): string => {
  const xml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 1200 675"
       width="1200"
       height="675">

    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#080f20"/>
        <stop offset="1" stop-color="#172239"/>
      </linearGradient>

      <radialGradient id="glow">
        <stop stop-color="${accent}" stop-opacity=".38"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>

      <pattern id="grid"
               width="48"
               height="48"
               patternUnits="userSpaceOnUse">
        <path
          d="M48 0H0V48"
          fill="none"
          stroke="#ffffff"
          stroke-opacity=".075"
        />
      </pattern>
    </defs>

    <rect
      width="1200"
      height="675"
      fill="url(#bg)"
    />

    <rect
      width="1200"
      height="675"
      fill="url(#grid)"
    />

    <circle
      cx="930"
      cy="250"
      r="380"
      fill="url(#glow)"
    />

    <path
      d="M890 165L1040 225V325C1040 440 971 504 890 546C809 504 740 440 740 325V225L890 165Z"
      fill="${accent}"
      fill-opacity=".11"
      stroke="${accent}"
      stroke-opacity=".8"
      stroke-width="4"
    />

    <path
      d="M836 345L875 386L950 295"
      fill="none"
      stroke="${accent}"
      stroke-width="13"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <rect
      x="72"
      y="84"
      width="12"
      height="12"
      rx="3"
      fill="${accent}"
    />

    <text
      x="100"
      y="95"
      font-family="Arial,sans-serif"
      fill="#9db0cf"
      font-size="22"
      letter-spacing="7"
    >
      DEVIN SIAHAAN / SELECTED WORK
    </text>

    <text
      x="72"
      y="345"
      font-family="Arial,sans-serif"
      fill="#ffffff"
      font-weight="800"
      font-size="69"
    >
      ${xml(title)}
    </text>

    <text
      x="76"
      y="400"
      font-family="Arial,sans-serif"
      fill="#b9c5dc"
      font-size="25"
      letter-spacing="4"
    >
      ${xml(subtitle)}
    </text>

    <rect
      x="75"
      y="451"
      width="114"
      height="7"
      rx="3"
      fill="${accent}"
    />
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

// ==========================================
// PROJECT COVER IMAGES
// ==========================================

const COVERS = {
  cri: makeCover(
    "CRI / AI",
    "INTELLIGENT ASSESSMENT",
    "#5bb4ff"
  ),

  aegis: makeCover(
    "AEGIS-X",
    "INTELLIGENT SECURITY OPERATIONS",
    "#18d6ba"
  ),

  sentinel: makeCover(
    "CYBERSENTINEL",
    "SECURITY LOG ANALYZER",
    "#64b5ff"
  ),

  pulse: makeCover(
    "PULSEWATCH",
    "API HEALTH & OBSERVABILITY",
    "#55d6a1"
  ),

  sprint: makeCover(
    "SPRINTFORGE",
    "INTERACTIVE KANBAN BOARD",
    "#bd8bfa"
  ),
};

// ==========================================
// TYPES
// ==========================================

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: {
    frontend: Skill[];
    backend: Skill[];
  };
  content: ReactNode;
  github?: string;
  live: string;
};

// ==========================================
// TECHNOLOGY BADGES
// ==========================================

const technology = (
  title: string,
  acronym: string
): Skill => ({
  title,
  bg: "black",
  fg: "white",

  icon: (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded px-1 text-[10px] font-bold leading-none">
      {acronym}
    </span>
  ),
});

const TECH = {
  wordpress: technology("WordPress", "WP"),
  nextjs: technology("Next.js", "Next"),
  react: technology("React", "Re"),
  typescript: technology("TypeScript", "TS"),
  python: technology("Python", "Py"),
  fastapi: technology("FastAPI", "API"),
  go: technology("Go", "Go"),
  laravel: technology("Laravel", "Lv"),
  php: technology("PHP", "PHP"),
  mysql: technology("MySQL", "SQL"),
  mariadb: technology("MariaDB", "MDB"),
  postgres: technology("PostgreSQL", "PG"),
  opensearch: technology("OpenSearch", "OS"),
  wazuh: technology("Wazuh SIEM/XDR", "WZ"),
  sigma: technology("Sigma", "SIG"),
  attack: technology("MITRE ATT&CK", "ATK"),
  docker: technology("Docker", "DK"),
  ai: technology("AI / LLM", "AI"),
  tailwind: technology("Tailwind CSS", "TW"),
};

// ==========================================
// PROJECT LINKS
// ==========================================

const ProjectLinks = ({
  live,
  github,
}: {
  live?: string;
  github?: string;
}) => {
  if (!live && !github) return null;

  return (
    <div className="my-5 flex flex-wrap gap-3">

      {live && live !== "#" && (
        <Link
          href={live}
          target={
            live.startsWith("/") ? "_self" : "_blank"
          }
          rel="noopener noreferrer"
        >
          <Button size="sm" className="gap-2">
            {live.startsWith("/")
              ? "Open Interactive Demo"
              : "Visit Website"}

            <ArrowUpRight size={16} />
          </Button>
        </Link>
      )}

      {github && github !== "#" && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            Source Code
            <ArrowUpRight size={16} />
          </Button>
        </Link>
      )}

    </div>
  );
};

// ==========================================
// PROJECT DETAIL COMPONENT
// ==========================================

function ProjectDetails({
  fullTitle,
  summary,
  contributions,
  image,
  live,
  github,
  note,
}: {
  fullTitle: string;
  summary: string;
  contributions: string[];
  image: string;
  live?: string;
  github?: string;
  note?: string;
}) {
  return (
    <div className="space-y-5">

      <TypographyP className="text-base font-semibold leading-relaxed">
        {fullTitle}
      </TypographyP>

      <TypographyP className="leading-7 text-muted-foreground">
        {summary}
      </TypographyP>

      <div>
        <TypographyH3 className="my-4">
          Project Highlights
        </TypographyH3>

        <ul className="ml-5 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
          {contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {note && (
        <p className="rounded-lg border border-border bg-secondary/30 p-3 text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}

      <ProjectLinks
        live={live}
        github={github}
      />

      <SlideShow images={[image]} />

    </div>
  );
}

// ==========================================
// PROJECT FACTORY
// ==========================================

type ProjectInput = Omit<Project, "content"> & {
  summary: string;
  highlights: string[];
  note?: string;
};

function defineProject({
  summary,
  highlights,
  note,
  ...project
}: ProjectInput): Project {
  return {
    ...project,

    content: (
      <ProjectDetails
        fullTitle={project.title}
        summary={summary}
        contributions={highlights}
        image={project.src}
        live={project.live}
        github={project.github}
        note={note}
      />
    ),
  };
}

// ==========================================
// DEVIN SIAHAAN — PROJECTS
// 4 MAIN PROJECTS + 3 INTERACTIVE DEMOS
// ==========================================

const projects: Project[] = [

  // ========================================
  // 1. CRI — AI-ENHANCED ASSESSMENT SYSTEM
  // ========================================

  defineProject({
    id: "cri-ai-enhanced",

    category:
      "Cybersecurity · AI Assessment · Ongoing",

    title:
      "Cybersecurity Readiness Index — AI-Enhanced Assessment System",

    src: COVERS.cri,

    screenshots: [],

    skills: {
      frontend: [
        TECH.laravel,
        TECH.php,
      ],

      backend: [
        TECH.mysql,
        TECH.mariadb,
        TECH.ai,
      ],
    },

    live: "",

    summary:
      "Advanced development of the Cybersecurity Readiness Index platform, focusing on extensible assessment domains, evaluation workflows, and AI-assisted question generation and classification. Project period: July 2026 – February 2027 (expected).",

    highlights: [
      "Development of a cybersecurity readiness assessment platform and management features using Laravel and relational databases.",

      "Authentication and role-based access for assessment participants and administrators.",

      "Integration work involving LLaMA-based question generation and domain/indicator mapping, as described in the current CV.",

      "Development of flexible assessment workflows and support for additional cybersecurity domains.",
    ],

    note:
      "Project ongoing. AI capabilities should be described according to their actual implementation status.",
  }),

  // ========================================
  // 2. AEGIS-X — SECURITY OPERATIONS
  // ========================================

  defineProject({
    id: "aegis-x",

    category:
      "Cybersecurity · Security Operations",

    title:
      "AEGIS-X — Intelligent Security Operations",

    src: COVERS.aegis,

    screenshots: [],

    skills: {
      frontend: [
        TECH.nextjs,
        TECH.react,
      ],

      backend: [
        TECH.python,
        TECH.fastapi,
        TECH.go,
        TECH.wazuh,
        TECH.postgres,
        TECH.docker,
      ],
    },

    live: "",

    summary:
      "A Security Operations Center platform described in the current CV, combining threat monitoring, security investigation, AI-assisted analysis, and incident response workflows.",

    highlights: [
      "Security telemetry monitoring and event correlation using the Wazuh SIEM/XDR ecosystem.",

      "AI-assisted security analysis designed to help interpret alerts and support investigation.",

      "Sigma detection rules and MITRE ATT&CK mapping for structured threat investigation.",

      "Interactive attack relationship visualization and incident response workflows.",

      "Data and application architecture featuring PostgreSQL, OpenSearch, and Docker.",
    ],

    note:
      "Illustrative cover. Replace with real application screenshots and verify implemented features before publishing.",
  }),

  // ========================================
  // 3. CRI — STUDENT ASSESSMENT PLATFORM
  // ========================================

  defineProject({
    id: "cri-nextjs",

    category:
      "Cybersecurity · Research Platform",

    title:
      "Cybersecurity Readiness Index — Student Assessment Platform",

    src:
      `${BASE_PATH}/pa2-cybersecurity-readiness-index/pa2.jpeg`,

    screenshots: [
      "pa2.jpeg",
    ],

    skills: {
      frontend: [
        TECH.nextjs,
        TECH.react,
      ],

      backend: [
        TECH.python,
        TECH.mysql,
        TECH.mariadb,
      ],
    },

    live: "",

    summary:
      "Cybersecurity readiness assessment platform for vocational (SMK) and senior high school (SMA) students, developed as an academic research project between January and June 2026.",

    highlights: [
      "Built web-based assessment pages and responsive student questionnaire interactions.",

      "Developed scoring and evaluation logic to process student assessment responses.",

      "Managed assessment and student data to support cybersecurity readiness analysis.",

      "Contributed to an information system for measuring and improving students' cybersecurity awareness.",
    ],
  }),

  // ========================================
  // 4. TOBA BATAK CULINARY
  // ========================================

  defineProject({
    id: "toba-culinary",

    category:
      "Web Development · Cultural Platform",

    title:
      "Toba Batak Culinary — Digital Culinary Platform",

    src:
      `${BASE_PATH}/pa1-website-kuliner-batak-toba/pa1.jpeg`,

    screenshots: [
      "pa1.jpeg",
    ],

    skills: {
      frontend: [
        TECH.wordpress,
      ],

      backend: [],
    },

    live: "",

    summary:
      "A digital culinary directory that introduces traditional Batak Toba dishes and food destinations, developed between January and June 2025.",

    highlights: [
      "Developed and managed a WordPress-based culinary information website.",

      "Organized traditional dishes, restaurant profiles, and pricing information in a user-friendly catalog.",

      "Designed responsive experiences for desktop and mobile users.",

      "Worked on content management and food discovery features described in the CV.",
    ],
  }),

  // ========================================
  // 5. CYBERSENTINEL
  // ========================================

  defineProject({
    id: "cybersentinel",

    category:
      "Cybersecurity · Interactive Demo",

    title:
      "CyberSentinel — Security Log Analyzer",

    src: COVERS.sentinel,

    screenshots: [],

    skills: {
      frontend: [
        TECH.nextjs,
        TECH.typescript,
        TECH.tailwind,
      ],

      backend: [],
    },

    live: "/labs/cybersentinel",

    summary:
      "Interactive browser-based security log analysis demo with sample events, CSV importing, rule-based detections, and exportable findings.",

    highlights: [
      "Analyzes HTTP log events locally in the browser.",

      "Highlights suspicious request bursts, sensitive route probing, and repeated authentication failures.",

      "Provides a findings timeline, risk filters, and CSV export.",
    ],

    note:
      "Learning demo. Rule-based alerts indicate events requiring further investigation.",
  }),

  // ========================================
  // 6. PULSEWATCH
  // ========================================

  defineProject({
    id: "pulsewatch",

    category:
      "Reliability · Interactive Demo",

    title:
      "PulseWatch — API Monitoring Dashboard",

    src: COVERS.pulse,

    screenshots: [],

    skills: {
      frontend: [
        TECH.nextjs,
        TECH.typescript,
      ],

      backend: [],
    },

    live: "/labs/pulsewatch",

    summary:
      "Interactive monitoring demo that checks an internal health endpoint, measures latency, tracks uptime history, and visualizes simulated failures.",

    highlights: [
      "Performs periodic browser-based checks of a same-origin health API.",

      "Shows response-time trends and a recent incident timeline.",

      "Stores recent history locally and exports monitoring results.",
    ],

    note:
      "Demo application, not a production multi-service monitoring system.",
  }),

  // ========================================
  // 7. SPRINTFORGE
  // ========================================

  defineProject({
    id: "sprintforge",

    category:
      "Productivity · Interactive Demo",

    title:
      "SprintForge — Interactive Kanban Board",

    src: COVERS.sprint,

    screenshots: [],

    skills: {
      frontend: [
        TECH.nextjs,
        TECH.react,
        TECH.typescript,
        TECH.tailwind,
      ],

      backend: [],
    },

    live: "/labs/sprintforge",

    summary:
      "Client-side Kanban task board with task management, priorities, drag-and-drop, and browser-local persistence.",

    highlights: [
      "Create, edit, delete, and move tasks across workflow stages.",

      "Visualizes workload and sprint progress with interactive controls.",

      "Persists data locally in the browser and supports JSON export.",
    ],

    note:
      "Demo application. Real-time collaboration and multi-user authentication are not yet implemented.",
  }),

];

// ==========================================
// EXPORT PROJECT DATA
// ==========================================

export default projects;
