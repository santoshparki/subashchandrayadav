"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { clearSession, createSession, requireAdmin } from "@/lib/auth";
import { getSupabaseAuthClient } from "@/lib/supabase";
import { deleteManagedFile, saveManagedFile } from "@/lib/storage";

const text = (data: FormData, key: string) => String(data.get(key) || "").trim();
const number = (data: FormData, key: string, fallback = 0) => Number(data.get(key) || fallback);

export async function loginAction(_state: { error: string }, data: FormData): Promise<{ error: string }> {
  const email = text(data, "email").toLowerCase();
  const password = text(data, "password");
  const supabase = getSupabaseAuthClient();
  if (!supabase) return { error: "Supabase Auth is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env." };

  const { data: auth, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !auth.user || !auth.session) {
    return { error: "Invalid email or password." };
  }
  await createSession(auth.user.id, auth.session);
  redirect("/admin");
}

export async function logoutAction() { await clearSession(); redirect("/admin/login"); }

export async function saveProfile(data: FormData) {
  await requireAdmin();
  await prisma.profile.upsert({
    where: { id: 1 },
    update: { name: text(data,"name"), title: text(data,"title"), heroHeading: text(data,"heroHeading"), tagline: text(data,"tagline"), summary: text(data,"summary"), aboutText: text(data,"aboutText"), contactHeading: text(data,"contactHeading"), contactIntro: text(data,"contactIntro"), location: text(data,"location"), email: text(data,"email"), phone: text(data,"phone"), availability: text(data,"availability"), yearsExperience: text(data,"yearsExperience") },
    create: { id: 1, name: text(data,"name"), title: text(data,"title"), heroHeading: text(data,"heroHeading"), tagline: text(data,"tagline"), summary: text(data,"summary"), aboutText: text(data,"aboutText"), contactHeading: text(data,"contactHeading"), contactIntro: text(data,"contactIntro"), location: text(data,"location"), email: text(data,"email"), phone: text(data,"phone"), availability: text(data,"availability"), yearsExperience: text(data,"yearsExperience") }
  });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveProject(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  let imageUrl = text(data, "existingImageUrl") || null;
  const image = data.get("image") as File;
  if (image?.size) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(image.type) || image.size > 8 * 1024 * 1024) return;
    if (imageUrl) await deleteManagedFile(imageUrl);
    imageUrl = await saveManagedFile(image, "projects");
  }
  const values = { title: text(data,"title"), category: text(data,"category"), description: text(data,"description"), location: text(data,"location") || null, year: text(data,"year") || null, duration: text(data,"duration") || null, role: text(data,"role") || null, responsibilities: text(data,"responsibilities") || null, technologies: text(data,"technologies") || null, imageUrl, featured: data.get("featured") === "on", sortOrder: number(data,"sortOrder") };
  if (id) await prisma.project.update({ where: { id }, data: values }); else await prisma.project.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveSkill(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  const levelLabel = text(data, "levelLabel") || "Advanced";
  const levelMap: Record<string, number> = { Expert: 95, Advanced: 82, Intermediate: 65 };
  const values = { name: text(data,"name"), category: text(data,"category"), level: levelMap[levelLabel] || 82, levelLabel, sortOrder: number(data,"sortOrder") };
  if (id) await prisma.skill.update({ where: { id }, data: values }); else await prisma.skill.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveService(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  const values = { title: text(data,"title"), description: text(data,"description"), icon: text(data,"icon") || "Building2", sortOrder: number(data,"sortOrder") };
  if (id) await prisma.service.update({ where: { id }, data: values }); else await prisma.service.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveTimeline(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  const values = { type: text(data,"type"), title: text(data,"title"), organization: text(data,"organization"), location: text(data,"location") || null, startDate: text(data,"startDate"), endDate: text(data,"endDate"), description: text(data,"description"), sortOrder: number(data,"sortOrder") };
  if (id) await prisma.timelineItem.update({ where: { id }, data: values }); else await prisma.timelineItem.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveStat(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  const values = { value: text(data,"value"), label: text(data,"label"), sortOrder: number(data,"sortOrder") };
  if (id) await prisma.siteStat.update({ where: { id }, data: values }); else await prisma.siteStat.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveSocialLink(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  const values = { platform: text(data,"platform"), url: text(data,"url"), icon: text(data,"icon") || "Globe", active: data.get("active") === "on", displayOrder: number(data,"displayOrder") };
  if (id) await prisma.socialLink.update({ where: { id }, data: values }); else await prisma.socialLink.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveCertification(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  let imageUrl = text(data, "existingImageUrl") || null;
  const image = data.get("image") as File;
  if (image?.size) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(image.type) || image.size > 8 * 1024 * 1024) return;
    if (imageUrl) await deleteManagedFile(imageUrl);
    imageUrl = await saveManagedFile(image, "certifications");
  }
  const values = { title: text(data,"title"), issuer: text(data,"issuer"), location: text(data,"location") || null, issuedDate: text(data,"issuedDate") || null, credentialUrl: text(data,"credentialUrl") || null, imageUrl, description: text(data,"description"), sortOrder: number(data,"sortOrder") };
  if (id) await prisma.certification.update({ where: { id }, data: values }); else await prisma.certification.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function saveAchievement(data: FormData) {
  await requireAdmin(); const id = text(data,"id");
  const values = { title: text(data,"title"), organization: text(data,"organization") || null, year: text(data,"year") || null, description: text(data,"description"), linkUrl: text(data,"linkUrl") || null, sortOrder: number(data,"sortOrder") };
  if (id) await prisma.achievement.update({ where: { id }, data: values }); else await prisma.achievement.create({ data: values });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function updateEnquiryStatus(data: FormData) {
  await requireAdmin();
  await prisma.enquiry.update({ where: { id: text(data, "id") }, data: { status: text(data, "status") as "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED" } });
  revalidatePath("/admin");
}

export async function deleteItem(data: FormData) {
  await requireAdmin(); const id = text(data,"id"); const type = text(data,"type");
  if (type === "project") await prisma.project.delete({ where: { id } });
  if (type === "skill") await prisma.skill.delete({ where: { id } });
  if (type === "service") await prisma.service.delete({ where: { id } });
  if (type === "timeline") await prisma.timelineItem.delete({ where: { id } });
  if (type === "stat") await prisma.siteStat.delete({ where: { id } });
  if (type === "social") await prisma.socialLink.delete({ where: { id } });
  if (type === "enquiry") await prisma.enquiry.delete({ where: { id } });
  if (type === "certification") {
    const item = await prisma.certification.findUnique({ where: { id } });
    await prisma.certification.delete({ where: { id } });
    await deleteManagedFile(item?.imageUrl);
  }
  if (type === "achievement") await prisma.achievement.delete({ where: { id } });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function uploadAsset(data: FormData) {
  await requireAdmin();
  const kind = text(data,"kind"); const file = data.get("file") as File;
  if (!file || file.size === 0 || file.size > 8 * 1024 * 1024) return;
  const allowed = kind === "photo" ? ["image/jpeg","image/png","image/webp"] : ["application/pdf","text/html","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowed.includes(file.type)) return;
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  const oldUrl = kind === "photo" ? profile?.photoUrl : profile?.cvUrl;
  const url = await saveManagedFile(file, kind);
  await prisma.profile.update({ where: { id: 1 }, data: kind === "photo" ? { photoUrl: url } : { cvUrl: url } });
  await deleteManagedFile(oldUrl);
  revalidatePath("/"); revalidatePath("/admin");
}
