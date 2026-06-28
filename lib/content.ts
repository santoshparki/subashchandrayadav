import { prisma } from "@/lib/prisma";
import { defaultContent, type PortfolioContent } from "@/lib/default-content";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  if (!process.env.DATABASE_URL) return defaultContent;
  try {
    const [profile, stats, skills, services, projects, timeline, certifications, achievements, socialLinks] = await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.siteStat.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.timelineItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.socialLink.findMany({ where: { active: true }, orderBy: { displayOrder: "asc" } })
    ]);

    if (!profile) return defaultContent;
    return { profile, stats, skills, services, projects, timeline, certifications, achievements, socialLinks } as PortfolioContent;
  } catch {
    return defaultContent;
  }
}
