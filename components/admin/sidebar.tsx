import {
  BriefcaseBusiness,
  Contact,
  ExternalLink,
  Gauge,
  GraduationCap,
  LogOut,
  MailQuestion,
  Award,
  Share2,
  Settings2,
  UserRound
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const links = [
  [Gauge, "Dashboard", "#overview"],
  [UserRound, "Profile", "#profile"],
  [Contact, "Contact Info", "#contact-info"],
  [BriefcaseBusiness, "Projects", "#projects"],
  [Settings2, "Skills & Services", "#expertise"],
  [BriefcaseBusiness, "Experience", "#experience"],
  [GraduationCap, "Education", "#education"],
  [GraduationCap, "Certifications", "#certifications"],
  [Award, "Achievements", "#achievements"],
  [Share2, "Social Links", "#social-links"],
  [MailQuestion, "Enquiries", "#enquiries"]
] as const;

export function AdminSidebar() {
  return (
    <aside className="bg-ink p-6 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:overflow-y-auto lg:p-7">
      <a href="/" className="flex items-center gap-3 text-sm font-bold">
        <span className="grid size-10 shrink-0 place-items-center border border-copper text-copper">SC</span>
        Portfolio Admin
      </a>
      <nav className="mt-10 grid gap-2 text-sm text-white/60">
        {links.map(([Icon, label, href]) => (
          <a key={label} href={href} className="flex items-center gap-3 rounded-sm px-3 py-3 transition hover:translate-x-1 hover:bg-white/5 hover:text-white">
            <Icon size={17} />
            {label}
          </a>
        ))}
        <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-3 transition hover:translate-x-1 hover:text-white">
          <ExternalLink size={17} />
          View website
        </a>
      </nav>
      <form action={logoutAction} className="mt-8 lg:absolute lg:bottom-8">
        <button className="flex items-center gap-3 text-sm text-white/45 hover:text-copper">
          <LogOut size={17} />
          Sign out
        </button>
      </form>
    </aside>
  );
}
