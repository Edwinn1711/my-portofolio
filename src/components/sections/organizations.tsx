
import { ORGANIZATIONS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

const OrganizationsSection = () => {
  return (
    <SectionWrapper
      className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">

        <SectionHeader
          id="organizations"
          title="Organizational Experience"
          desc="Leadership, teamwork, and community involvement."
          className="mb-12"
        />

        <div className="flex flex-col gap-6 md:gap-8">
          {ORGANIZATIONS.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card className="bg-card/95 backdrop-blur-lg border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">

                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">

                    <div className="space-y-2">
                      <CardTitle className="text-lg md:text-xl font-bold tracking-tight">
                        {org.organization}
                      </CardTitle>

                      <p className="text-sm font-medium text-muted-foreground">
                        {org.role}
                      </p>
                    </div>

                    <Badge
                      variant="secondary"
                      className="w-fit h-fit text-xs font-mono"
                    >
                      {org.startDate} - {org.endDate}
                    </Badge>

                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin size={14} />
                    {org.location}
                  </div>

                  <ul className="list-disc ml-4 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {org.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default OrganizationsSection;
