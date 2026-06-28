import { PrismaClient } from "@prisma/client";
import { defaultContent } from "../lib/default-content";

const prisma = new PrismaClient();

async function main() {
  const { profile, stats, projects, skills, services, timeline, certifications, achievements, socialLinks } = defaultContent;
  await prisma.profile.upsert({ where: { id: 1 }, update: profile, create: profile });
  await prisma.siteStat.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.service.deleteMany();
  await prisma.timelineItem.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.siteStat.createMany({ data: stats.map(({ id: _id, ...item }) => item) });
  await prisma.project.createMany({ data: projects.map(({ id: _id, ...item }) => item) });
  await prisma.skill.createMany({ data: skills.map(({ id: _id, ...item }) => item) });
  await prisma.service.createMany({ data: services.map(({ id: _id, ...item }) => item) });
  await prisma.timelineItem.createMany({ data: timeline.map(({ id: _id, ...item }) => item) });
  await prisma.certification.createMany({ data: certifications.map(({ id: _id, ...item }) => item) });
  await prisma.achievement.createMany({ data: achievements.map(({ id: _id, ...item }) => item) });
  await prisma.socialLink.createMany({ data: socialLinks.map(({ id: _id, ...item }) => item) });
}

main().finally(() => prisma.$disconnect());
