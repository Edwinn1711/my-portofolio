
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import projects, { type Project } from "@/data/projects";

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import ScrollingPreview from "../scrolling-preview";

import {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
} from "../ui/responsive-dialog";

import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";

// ============================================
// PROJECTS SECTION
// ============================================

const ProjectsSection = () => {
  return (
    <SectionWrapper
      id="projects"
      className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:min-h-[100vh]"
    >
      <SectionHeader
        id="projects"
        title="Projects"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

// ============================================
// INDIVIDUAL PROJECT CARD
// ============================================

const ProjectCard = ({
  project,
}: {
  project: Project;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <ResponsiveDialog>

        {/* PROJECT COVER */}
        <ResponsiveDialogTrigger
          className="flex w-full justify-center bg-transparent"
        >
          <div
            className="group relative aspect-[3/2] w-full max-w-[400px] overflow-hidden rounded-xl border border-border/40 bg-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {/* PROJECT IMAGE WITH HOVER ANIMATION */}
            <ScrollingPreview
              src={project.src}
              alt={project.title}
              isHovered={isHovered}
            />

            {/* GRADIENT OVERLAY */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-16">

              <h3 className="text-left text-base font-bold leading-snug text-white md:text-lg">
                {project.title}
              </h3>

              <span className="mt-2 inline-block rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-medium text-white/90">
                {project.category}
              </span>

            </div>
          </div>
        </ResponsiveDialogTrigger>

        {/* ====================================== */}
        {/* PROJECT DETAILS POPUP                  */}
        {/* ====================================== */}

        <ResponsiveDialogContent
          className="md:!flex md:h-[85vh] md:max-w-4xl md:flex-col md:gap-0 md:overflow-hidden md:p-0"
        >

          {/* POPUP HEADER */}
          <div className="shrink-0 border-b border-border bg-background/95 px-5 py-5 backdrop-blur-xl md:px-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-w-0 space-y-2">

                
              <ResponsiveDialogTitle className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {project.title}
              </ResponsiveDialogTitle>

              <ResponsiveDialogDescription className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {project.category}
              </ResponsiveDialogDescription>


              </div>

              {/* OPTIONAL PROJECT LINKS */}
              <div className="flex shrink-0 items-center gap-3">

                {project.github &&
                  project.github !== "#" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Source Code
                    </Link>
                  )}

                {project.live &&
                  project.live !== "#" && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-80"
                    >
                      Visit Website
                      <ArrowUpRight size={14} />
                    </Link>
                  )}

              </div>
            </div>
          </div>

          {/* SCROLLABLE PROJECT CONTENT */}
          <ScrollArea
            className="flex-1"
            type="always"
            data-lenis-prevent
          >
            <div className="space-y-8 px-5 py-8 md:px-8">

              {/* TECHNOLOGY STACK */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 md:flex-row md:gap-10"
              >

                {/* FRONTEND */}
                {project.skills.frontend.length > 0 && (
                  <div className="flex flex-col items-start gap-3">

                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Frontend / Framework
                    </span>

                    <FloatingDock
                      items={project.skills.frontend}
                    />

                  </div>
                )}

                {/* BACKEND */}
                {project.skills.backend.length > 0 && (
                  <div className="flex flex-col items-start gap-3">

                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Backend / Database
                    </span>

                    <FloatingDock
                      items={project.skills.backend}
                    />

                  </div>
                )}

              </motion.div>

              {/* DIVIDER */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* PROJECT DESCRIPTION & SCREENSHOTS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
              >
                {project.content}
              </motion.div>

            </div>
          </ScrollArea>

        </ResponsiveDialogContent>

      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
