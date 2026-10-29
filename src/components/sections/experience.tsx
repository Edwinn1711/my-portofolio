"use client";

import { SKILLS, SkillNames } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Konten Experience disesuaikan dengan CV terbaru Devin Siahaan.
// Didefinisikan di sini agar tidak perlu mengubah data Skills atau Constants.
// Urutan: proyek aktif/terbaru ke proyek yang lebih lama.
type ExperienceItem = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

const PORTFOLIO_EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    startDate: "Jul 2026",
    endDate: "Feb 2027 (Expected)",
    title: "Cybersecurity Readiness Index — AI-Enhanced Assessment System",
    company: "Full-Stack Developer · Institut Teknologi Del",
    description: [
      "Developed a web-based Cybersecurity Readiness Index (CRI) system to manage and evaluate student cybersecurity readiness using Laravel and MySQL/MariaDB.",
      "Implemented authentication and dynamic role-based access control for administrators, teachers, and students.",
      "Integrated the LLaMA language model to support automated generation of cybersecurity assessment questions.",
      "Built an AI-assisted workflow to recommend suitable readiness indicators and security domains for generated questions.",
      "Connected assessment interfaces with AI backend modules to support consistent evaluation workflows.",
    ],
    skills: [SkillNames.LARAVEL, SkillNames.PHP, SkillNames.MYSQL, SkillNames.MARIADB],
  },
  {
    id: 2,
    startDate: "Feb 2026",
    endDate: "Jun 2026",
    title: "AEGIS-X — Intelligent Security Operations",
    company: "Cybersecurity Developer · Security Operations Project",
    description: [
      "Developed a Security Operations Center (SOC) platform combining Next.js, Python FastAPI, Go, and Wazuh SIEM/XDR for security event monitoring and threat investigation.",
      "Integrated an AI security analyst to interpret log findings, explain potential attack patterns, and recommend evidence-based mitigations.",
      "Implemented detection rules with Sigma and mapped security findings to the MITRE ATT&CK framework.",
      "Built an investigation dashboard and interactive attack graph to visualize relationships between IP addresses, devices, and suspicious activity.",
      "Designed incident response playbooks and supporting analytical infrastructure using PostgreSQL, OpenSearch, and Docker.",
    ],
    skills: [SkillNames.NEXTJS, SkillNames.PYTHON, SkillNames.GO, SkillNames.POSTGRES, SkillNames.DOCKER],
  },
  {
    id: 3,
    startDate: "Jan 2026",
    endDate: "Jun 2026",
    title: "Cybersecurity Readiness Index — Student Assessment Platform",
    company: "Full-Stack Developer · Institut Teknologi Del",
    description: [
      "Developed a web-based assessment platform to measure cybersecurity awareness and readiness among senior high school (SMA) and vocational school (SMK) students.",
      "Designed interactive and responsive questionnaires and assessment scenarios for students.",
      "Implemented Python-based scoring logic to process responses, calculate readiness metrics, and generate evaluation results.",
      "Managed data structures for student profiles, assessment histories, and scores to support readiness analysis.",
    ],
    skills: [SkillNames.NEXTJS, SkillNames.PYTHON, SkillNames.MYSQL, SkillNames.MARIADB],
  },
  {
    id: 4,
    startDate: "Jan 2025",
    endDate: "Jun 2025",
    title: "Toba Batak Culinary — Digital Culinary Platform",
    company: "Web Developer · Toba Batak Culinary, Balige",
    description: [
      "Developed a WordPress-based culinary directory featuring traditional Batak Toba dishes and local food destinations.",
      "Organized cuisine categories, restaurant profiles, and pricing information into an accessible information catalog.",
      "Implemented search and location-based filtering to help visitors discover culinary destinations.",
      "Designed responsive pages for mobile and desktop and managed content through the WordPress CMS.",
    ],
    skills: [SkillNames.WORDPRESS],
  },
];

const ExperienceSection = () => {
  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[120vh] py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="My professional journey."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector Line - simplified to a subtle border */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          {PORTFOLIO_EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative">
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "bg-card/95 backdrop-blur-xl text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {experience.title}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <Badge variant="secondary" className="w-fit font-mono text-xs font-normal">
              {experience.startDate} - {experience.endDate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
            {experience.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName];
              return (
                <Badge
                  key={skillName}
                  variant="outline"
                  className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors border-transparent"
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-3.5 h-3.5 object-contain opacity-80"
                  />
                  {skill.label}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
