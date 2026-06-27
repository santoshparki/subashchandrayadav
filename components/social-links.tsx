import { ArrowUpRight, Facebook, Github, Globe, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";

const icons = { ArrowUpRight, Facebook, Github, Globe, Instagram, Linkedin, Mail, Phone, Twitter };

type Social = {
  id: string;
  platform: string;
  url: string;
  icon: string;
};

export function SocialLinks({ links, compact = false }: { links: Social[]; compact?: boolean }) {
  if (!links.length) return null;
  return <div className="flex flex-wrap items-center gap-3">
    {links.map((link) => {
      const Icon = icons[link.icon as keyof typeof icons] || Globe;
      return <a key={link.id} href={link.url} target={link.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={link.platform} className={compact ? "social-icon compact" : "social-icon"}>
        <Icon size={compact ? 16 : 18} />
      </a>;
    })}
  </div>;
}
