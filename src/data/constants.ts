// Devin Siahaan — portfolio skills & experience
// Legacy SkillNames are preserved to avoid breaking references in other files.
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  GCP = "gcp",
  VIM = "vim",

  // Technologies relevant to Devin's profile
  GO = "go",
  LARAVEL = "laravel",
  MARIADB = "mariadb",
  POSTMAN = "postman",
  PYTHON = "python",
  PHP = "php",
  FLUTTER = "flutter",
  DART = "dart",
  MYSQL = "mysql",
  FIGMA = "figma",
  C = "c",
  FRAMER_MOTION = "framer-motion",
  UBUNTU = "ubuntu",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  keyboardIcon?: string;
  keyboardColor?: string;
  shortcut?: string;
  /** Set false for leftover template skills not intended for Devin's skills grid. */
  featured?: boolean;
};

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;

const createSkill = (
  id: number,
  name: SkillNames,
  label: string,
  shortDescription: string,
  color: string,
  iconPath: string,
  options: Pick<Skill, "keyboardIcon" | "keyboardColor" | "featured"> = {}
): Skill => ({
  id,
  name,
  label,
  shortDescription,
  color,
  icon: devicon(iconPath),
  keyboardColor: options.keyboardColor ?? color,
  ...options,
});

export const SKILLS: Record<SkillNames, Skill> = {
  // Existing 3D keycap slots — keep these keys for compatibility.
  [SkillNames.JS]: createSkill(1, SkillNames.JS, "JavaScript", "Building interactive interfaces and client-side application logic.", "#F0DB4F", "javascript/javascript-original", { keyboardIcon: "/assets/keyboard/logos/js.svg", keyboardColor: "#FF9408" }),
  [SkillNames.TS]: createSkill(2, SkillNames.TS, "TypeScript", "Adding static types to make JavaScript applications easier to maintain.", "#3178C6", "typescript/typescript-original", { keyboardIcon: "/assets/keyboard/logos/ts.svg", keyboardColor: "#008FD5" }),
  [SkillNames.HTML]: createSkill(3, SkillNames.HTML, "HTML", "Structuring accessible and semantic web pages.", "#E34C26", "html5/html5-original", { keyboardIcon: "/assets/keyboard/logos/html.svg", keyboardColor: "#FF480A" }),
  [SkillNames.CSS]: createSkill(4, SkillNames.CSS, "CSS", "Creating responsive, clear, and visually engaging web layouts.", "#1572B6", "css3/css3-original", { keyboardIcon: "/assets/keyboard/logos/css.svg", keyboardColor: "#633595" }),
  [SkillNames.REACT]: createSkill(5, SkillNames.REACT, "React", "Developing component-based user interfaces for web applications.", "#61DAFB", "react/react-original", { keyboardIcon: "/assets/keyboard/logos/react.svg", keyboardColor: "#00CCE8" }),
  [SkillNames.VUE]: createSkill(6, SkillNames.VUE, "Vue", "A progressive framework for user interfaces. Kept for legacy 3D keycap compatibility.", "#41B883", "vuejs/vuejs-original", { keyboardIcon: "/assets/keyboard/logos/vue.svg", keyboardColor: "#00B880", featured: false }),
  [SkillNames.NEXTJS]: createSkill(7, SkillNames.NEXTJS, "Next.js", "Building modern React applications with routing and server rendering.", "#E5E7EB", "nextjs/nextjs-original", { keyboardIcon: "/assets/keyboard/logos/nextjs.svg", keyboardColor: "#333537" }),
  [SkillNames.TAILWIND]: createSkill(8, SkillNames.TAILWIND, "Tailwind CSS", "Designing responsive interfaces with utility-first CSS.", "#38BDF8", "tailwindcss/tailwindcss-original", { keyboardIcon: "/assets/keyboard/logos/tailwind.svg", keyboardColor: "#00BFD8" }),
  [SkillNames.NODEJS]: createSkill(9, SkillNames.NODEJS, "Node.js", "A JavaScript runtime used to build server-side applications.", "#6CC24A", "nodejs/nodejs-original", { keyboardIcon: "/assets/keyboard/logos/nodejs.svg", keyboardColor: "#00952C", featured: false }),
  [SkillNames.EXPRESS]: createSkill(10, SkillNames.EXPRESS, "Express", "A minimal framework for building Node.js web APIs.", "#E5E7EB", "express/express-original", { keyboardIcon: "/assets/keyboard/logos/express.svg", keyboardColor: "#343638", featured: false }),
  [SkillNames.POSTGRES]: createSkill(11, SkillNames.POSTGRES, "PostgreSQL", "Managing relational data and writing SQL queries.", "#336791", "postgresql/postgresql-original", { keyboardIcon: "/assets/keyboard/logos/postgres.svg", keyboardColor: "#146888" }),
  [SkillNames.MONGODB]: createSkill(12, SkillNames.MONGODB, "MongoDB", "Working with document-oriented data for backend applications.", "#47A248", "mongodb/mongodb-original", { keyboardIcon: "/assets/keyboard/logos/mongodb.svg", keyboardColor: "#00C51B" }),
  [SkillNames.GIT]: createSkill(13, SkillNames.GIT, "Git", "Tracking code changes and collaborating through version control.", "#F1502F", "git/git-original", { keyboardIcon: "/assets/keyboard/logos/git.svg", keyboardColor: "#FF4622" }),
  [SkillNames.GITHUB]: createSkill(14, SkillNames.GITHUB, "GitHub", "Managing repositories, branches, code reviews, and collaboration.", "#E5E7EB", "github/github-original", { keyboardIcon: "/assets/keyboard/logos/github.svg", keyboardColor: "#343638" }),
  [SkillNames.PRETTIER]: createSkill(15, SkillNames.PRETTIER, "Prettier", "Automatically formatting code to maintain a consistent style.", "#F7B93A", "prettier/prettier-original", { keyboardIcon: "/assets/keyboard/logos/prettier.svg", keyboardColor: "#18333E", featured: false }),
  [SkillNames.NPM]: createSkill(16, SkillNames.NPM, "npm", "Managing packages and scripts in JavaScript projects.", "#CB3837", "npm/npm-original-wordmark", { keyboardIcon: "/assets/keyboard/logos/npm.svg", keyboardColor: "#F50032", featured: false }),
  [SkillNames.FIREBASE]: createSkill(17, SkillNames.FIREBASE, "Firebase", "Exploring backend services and application data integration.", "#FFCA28", "firebase/firebase-original", { keyboardIcon: "/assets/keyboard/logos/firebase.svg", keyboardColor: "#EFBE00" }),
  [SkillNames.WORDPRESS]: createSkill(18, SkillNames.WORDPRESS, "WordPress", "A content management system for building and maintaining websites.", "#21759B", "wordpress/wordpress-original", { keyboardIcon: "/assets/keyboard/logos/wordpress.svg", keyboardColor: "#007D9F" }),
  [SkillNames.UBUNTU]: createSkill(38, SkillNames.UBUNTU, "Ubuntu", "Working with Ubuntu Linux, terminal commands, package management, and development environments.", "#E95420", "ubuntu/ubuntu-plain", { keyboardIcon: "/assets/keyboard/logos/ubuntu.svg", keyboardColor: "#C24621" }),
  [SkillNames.LINUX]: createSkill(19, SkillNames.LINUX, "Linux", "Exploring command-line workflows, development environments, and system fundamentals.", "#E5E7EB", "linux/linux-original", { keyboardIcon: "/assets/keyboard/logos/linux.svg", keyboardColor: "#333537" }),
  [SkillNames.DOCKER]: createSkill(20, SkillNames.DOCKER, "Docker", "Packaging applications into consistent development and deployment environments.", "#2496ED", "docker/docker-original", { keyboardIcon: "/assets/keyboard/logos/docker.svg", keyboardColor: "#009FE8" }),
  [SkillNames.NGINX]: createSkill(21, SkillNames.NGINX, "Nginx", "A web server and reverse proxy used in application deployment.", "#009639", "nginx/nginx-original", { keyboardIcon: "/assets/keyboard/logos/nginx.svg", keyboardColor: "#00A20B", featured: false }),
  [SkillNames.AWS]: createSkill(22, SkillNames.AWS, "AWS", "Cloud services and infrastructure fundamentals.", "#FF9900", "amazonwebservices/amazonwebservices-original-wordmark", { keyboardIcon: "/assets/keyboard/logos/aws.svg", keyboardColor: "#FF9208", featured: false }),
  [SkillNames.GCP]: createSkill(25, SkillNames.GCP, "Google Cloud", "Google Cloud infrastructure and deployment services.", "#4285F4", "googlecloud/googlecloud-original", { keyboardIcon: "/assets/keyboard/logos/gcp.svg", keyboardColor: "#008FD5", featured: false }),
  [SkillNames.VIM]: createSkill(23, SkillNames.VIM, "Vim", "A keyboard-driven text editor for development workflows.", "#019733", "vim/vim-original", { keyboardIcon: "/assets/keyboard/logos/vim.svg", keyboardColor: "#009F18", featured: false }),

  // Additional technologies with local keycap artwork (included in ZIP).
  [SkillNames.GO]: createSkill(26, SkillNames.GO, "Go", "Developing backend services and REST APIs using Go.", "#00ADD8", "go/go-original", { keyboardIcon: "/assets/keyboard/logos/go.svg" }),
  [SkillNames.LARAVEL]: createSkill(27, SkillNames.LARAVEL, "Laravel", "Building PHP-based web applications with authentication, APIs, and database integration.", "#FF2D20", "laravel/laravel-original", { keyboardIcon: "/assets/keyboard/logos/laravel.svg" }),
  [SkillNames.MARIADB]: createSkill(28, SkillNames.MARIADB, "MariaDB", "Working with relational databases and structured SQL data.", "#C49A6C", "mariadb/mariadb-original", { keyboardIcon: "/assets/keyboard/logos/mariadb.svg" }),
  [SkillNames.POSTMAN]: createSkill(29, SkillNames.POSTMAN, "Postman", "Testing, documenting, and validating REST API requests and responses.", "#FF6C37", "postman/postman-original", { keyboardIcon: "/assets/keyboard/logos/postman.svg" }),
  [SkillNames.PYTHON]: createSkill(30, SkillNames.PYTHON, "Python", "Writing scripts and exploring data analysis and automation.", "#3776AB", "python/python-original", { keyboardIcon: "/assets/keyboard/logos/python.svg" }),
  [SkillNames.PHP]: createSkill(31, SkillNames.PHP, "PHP", "Developing server-side web features and backend application logic.", "#777BB4", "php/php-original", { keyboardIcon: "/assets/keyboard/logos/php.svg" }),
  [SkillNames.FLUTTER]: createSkill(32, SkillNames.FLUTTER, "Flutter", "Building cross-platform mobile interfaces and applications.", "#02569B", "flutter/flutter-original", { keyboardIcon: "/assets/keyboard/logos/flutter.svg" }),
  [SkillNames.DART]: createSkill(33, SkillNames.DART, "Dart", "Programming mobile application features with Flutter.", "#0175C2", "dart/dart-original", { keyboardIcon: "/assets/keyboard/logos/dart.svg" }),
  [SkillNames.MYSQL]: createSkill(34, SkillNames.MYSQL, "MySQL", "Designing and querying relational data for web applications.", "#4479A1", "mysql/mysql-original", { keyboardIcon: "/assets/keyboard/logos/mysql.svg" }),
  [SkillNames.FIGMA]: createSkill(35, SkillNames.FIGMA, "Figma", "Prototyping and designing intuitive user interfaces.", "#F24E1E", "figma/figma-original", { keyboardIcon: "/assets/keyboard/logos/figma.svg" }),
  [SkillNames.C]: createSkill(36, SkillNames.C, "C", "Learning programming fundamentals and low-level problem-solving.", "#A8B9CC", "c/c-original", { keyboardIcon: "/assets/keyboard/logos/c.svg" }),
  [SkillNames.FRAMER_MOTION]: createSkill(37, SkillNames.FRAMER_MOTION, "Motion", "Creating polished interactive animations in React applications.", "#C99CFF", "framermotion/framermotion-original"),
};

/**
 * 24 featured skills (6 columns x 4 rows).
 * Keep this order aligned between the 3D keyboard and accessible skills grid.
 */
export const KEYBOARD_SKILL_ORDER: SkillNames[] = [
  SkillNames.GO,
  SkillNames.LARAVEL,
  SkillNames.PHP,
  SkillNames.PYTHON,
  SkillNames.MYSQL,
  SkillNames.MARIADB,
  SkillNames.JS,
  SkillNames.TS,
  SkillNames.REACT,
  SkillNames.NEXTJS,
  SkillNames.HTML,
  SkillNames.CSS,
  SkillNames.TAILWIND,
  SkillNames.POSTGRES,
  SkillNames.MONGODB,
  SkillNames.WORDPRESS,
  SkillNames.FLUTTER,
  SkillNames.DART,
  SkillNames.UBUNTU,
  SkillNames.DOCKER,
  SkillNames.GIT,
  SkillNames.GITHUB,
  SkillNames.POSTMAN,
  SkillNames.FIGMA,
];

// Maintain compatibility with existing components that filter on `featured`.
const visibleKeyboardSkills = new Set<SkillNames>(KEYBOARD_SKILL_ORDER);
for (const name of Object.values(SkillNames)) {
  SKILLS[name].featured = visibleKeyboardSkills.has(name);
}

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

// Devin Siahaan's project and development experience.
// Each entry describes information supplied in the CV and chat.
// The end date of the Laravel CRI project remains unconfirmed.
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Jul 2026",
    endDate: "Date to confirm",
    title: "Cybersecurity Readiness Index — Assessment System Enhancement",
    company: "Cybersecurity Development Project · Institut Teknologi Del",
    description: [
      "Worked on a Cybersecurity Readiness Index system and security-domain determination for student assessments.",
      "Developed web application features using Laravel, PHP, and MySQL/MariaDB.",
      "Explored the use of AI within the cybersecurity assessment project.",
      "Continuation of the Fiscal Year 2026 Funded Research, focusing on system development through the integration of AI features and the addition of new domains.",
    ],
    skills: [SkillNames.LARAVEL, SkillNames.PHP, SkillNames.MYSQL, SkillNames.MARIADB],
  },
  {
    id: 2,
    startDate: "Jan 2026",
    endDate: "Jun 2026",
    title: "Cybersecurity Readiness Index — Student Assessment Platform",
    company: "Cybersecurity Research Project · Institut Teknologi Del",
    description: [
      "Contributed to a web-based Cybersecurity Readiness Index platform for senior high and vocational school students (SMA/SMK).",
      "Worked with Next.js, MySQL/MariaDB, and Python as part of the technology stack.",
      "Research Funding for Fiscal Year 2026: Design and Development of a Cybersecurity Readiness Index Information System for Measuring and Improving Cybersecurity among Vocational (SMK) and Senior High School (SMA) Students",
    ],
    skills: [SkillNames.NEXTJS, SkillNames.MYSQL, SkillNames.MARIADB, SkillNames.PYTHON],
  },
  {
    id: 3,
    startDate: "Jan 2025",
    endDate: "Jun 2025",
    title: "Toba Batak Culinary — Digital Culinary Platform",
    company: "Web Development Project · Sitoluama, Balige",
    description: [
      "Developed a WordPress-based website for Toba Batak Culinary.",
      "Developed as an academic website project at Institut Teknologi Del.",
    ],
    skills: [SkillNames.WORDPRESS],
  }
];

export type OrganizationExperience = {
  id: number;
  startDate: string;
  endDate: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
};

// A separate export preserves the existing project Experience components.
// To show these on the website, render ORGANIZATIONS in an organization section.
export const ORGANIZATIONS: OrganizationExperience[] = [
  {
    id: 1,
    startDate: "Oct 2024",
    endDate: "Oct 2025",
    role: "Division Member",
    organization: "HIMATEK IT Del",
    location: "Laguboti, Indonesia",
    description: [
      "Participated in the Computer Technology Student Association at Institut Teknologi Del.",
      "Engaged in student activities supporting academic, professional, and community development.",
    ],
  },
  {
    id: 2,
    startDate: "Feb 2026",
    endDate: "Present",
    role: "Department Member",
    organization: "Depol IT Del — Sports Department",
    location: "Laguboti, Indonesia",
    description: [
      "Participated in sports-related student activities that foster sportsmanship and teamwork.",
      "Supported a collaborative and inclusive campus community through the student organization.",
    ],
  },
  {
    id: 3,
    startDate: "Aug 2025",
    endDate: "Jun 2026",
    role: "Student Mentor Committee Member",
    organization: "IT Del Student Leadership Program (Abang/Kakak Asuh)",
    location: "Laguboti, Indonesia",
    description: [
      "Mentored and guided first-year students during their transition to academic and dormitory life.",
      "Collaborated with dormitory supervisors to promote discipline, safety, and a positive learning environment.",
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Light mode enabled.",
    "A brighter view of the same workspace.",
    "Interface switched to light mode.",
  ],
  dark: [
    "Dark mode enabled.",
    "Focus mode: on.",
    "Interface switched to dark mode.",
  ],
};
