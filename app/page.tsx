import Image from "next/image";
import { ArrowDown, ArrowUpRight, Award, Building2, CheckCircle2, ClipboardCheck, DraftingCompass, Download, GraduationCap, HardHat, Mail, MapPin, Phone, Ruler, Sparkles } from "lucide-react";
import { getPortfolioContent } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SectionTitle } from "@/components/section-title";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { ScrollProgress } from "@/components/scroll-progress";

export const dynamic = "force-dynamic";

const serviceIcons = { HardHat, ClipboardCheck, DraftingCompass, Building2 };

function AboutHighlight({ icon: Icon, title, copy }: { icon: typeof MapPin; title: string; copy: string }) {
  return <div className="bg-white p-5 sm:p-6"><Icon size={24} strokeWidth={1.7} className="text-copper" /><h3 className="mt-5 text-sm font-bold uppercase tracking-[.14em] text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-ink/55">{copy}</p></div>;
}

export default async function Home() {
  const { profile, stats, skills, services, projects, timeline, certifications, achievements, socialLinks } = await getPortfolioContent();
  const experience = timeline.filter((item) => item.type === "experience");
  const education = timeline.filter((item) => item.type === "education");

  return <main className="overflow-hidden">
    <ScrollProgress />
    <SiteHeader name={profile.name} />
    <section id="home" className="relative min-h-screen bg-ink pt-20 text-white">
      <div className="blueprint-grid absolute inset-0 opacity-25" />
      <div className="hero-aurora absolute inset-0" />
      <div className="absolute -right-40 top-10 size-[34rem] rounded-full border border-copper/15 animate-slow-spin" />
      <div className="container-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[1.08fr_.72fr] lg:py-16">
        <div className="animate-fade-up">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.24em] text-copper"><span className="h-px w-10 bg-copper" />{profile.title}<span className="hidden h-px w-10 bg-copper/35 sm:block" />{profile.location.split(",").slice(-2).join(",").trim()}</div>
          <h1 className="max-w-4xl font-display text-6xl font-semibold leading-[.88] tracking-normal sm:text-7xl lg:text-8xl xl:text-9xl">{profile.heroHeading}</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{profile.summary}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="button-light">View projects <ArrowDown size={17} /></a>
            <a href={profile.cvUrl} download className="button-outline"><Download size={17} /> Download CV</a>
          </div>
          <div className="mt-10 grid max-w-2xl gap-px bg-white/10 sm:grid-cols-3">
            {stats.slice(0, 3).map((item) => <div key={item.id} className="bg-white/[.035] p-4"><strong className="block text-2xl text-white">{item.value}</strong><span className="mt-1 block text-[11px] font-bold uppercase tracking-[.14em] text-white/45">{item.label}</span></div>)}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:.18s]">
          <div className="absolute -inset-4 border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,.28)]" />
          <div className="portrait-frame relative aspect-[4/5] overflow-hidden bg-concrete">
            <Image src={profile.photoUrl} alt={`Portrait of ${profile.name}`} fill priority className="object-cover object-top grayscale-[15%]" sizes="(max-width: 1024px) 90vw, 35vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-7 pt-28">
              <p className="text-2xl font-bold">{profile.name}</p><p className="mt-1 text-sm text-white/55">{profile.location}</p>
            </div>
          </div>
          <div className="absolute -bottom-7 -left-7 bg-copper p-5 text-ink shadow-premium"><p className="text-3xl font-bold">{profile.yearsExperience}</p><p className="text-[10px] font-bold uppercase tracking-[.18em]">Years on site</p></div>
          <div className="absolute -right-4 top-8 max-w-48 border border-white/10 bg-ink/80 p-4 text-xs leading-6 text-white/60 shadow-premium backdrop-blur-md"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-copper">Available for</span>{profile.availability}</div>
        </div>
      </div>
    </section>

    <section id="about" className="section-pad relative bg-concrete">
      <div className="section-rule" />
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center"><p className="eyebrow">01 / About</p><h2 className="mt-5 font-display text-5xl font-semibold leading-[.98] tracking-normal sm:text-6xl">Practical field experience shaped by disciplined engineering study.</h2></div>
        <div className="mx-auto mt-12 max-w-6xl border border-ink/10 bg-white p-6 shadow-premium sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            <div className="space-y-6 text-base leading-8 text-ink/62 sm:text-lg">
              <p>I am <strong className="text-ink">{profile.name}</strong>, a <strong className="text-ink">{profile.title}</strong> based in <strong className="text-ink">{profile.location}</strong>.</p>
              <p>{profile.tagline} My work combines site supervision, quality control, construction coordination, and design support for residential and building projects.</p>
              <p>{profile.aboutText}</p>
            </div>
            <div className="grid gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-1">
              <AboutHighlight icon={MapPin} title="From" copy={profile.location} />
              <AboutHighlight icon={GraduationCap} title="Education" copy="Bachelor of Civil Engineering" />
              <AboutHighlight icon={HardHat} title="Focus" copy="Site supervision, quality control, design & drafting" />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
            {stats.map(({ id, value, label }) => <div key={id} className="bg-concrete p-5"><strong className="block text-3xl">{value}</strong><span className="mt-2 block text-xs text-ink/50">{label}</span></div>)}
          </div>
        </div>
      </div>
    </section>

    <section id="expertise" className="section-pad bg-white">
      <div className="container-shell"><SectionTitle eyebrow="02 / Expertise" title="From drawing board to active site." copy="Civil engineering support shaped by hands-on construction experience, careful coordination, and an uncompromising eye for quality." />
        <div className="mt-14 grid gap-px bg-ink/10 lg:grid-cols-3">
          {services.map((service, index) => { const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Building2; return <article key={service.id} className="premium-tile group bg-white p-8 transition hover:bg-blueprint hover:text-white sm:p-10">
            <div className="flex items-start justify-between"><Icon size={34} strokeWidth={1.4} className="text-copper" /><span className="font-display text-5xl text-ink/10 group-hover:text-white/10">0{index + 1}</span></div>
            <h3 className="mt-16 text-xl font-bold">{service.title}</h3><p className="mt-4 leading-7 text-ink/55 group-hover:text-white/55">{service.description}</p>
          </article>; })}
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[.55fr_1fr]">
          <div><p className="eyebrow">Technical toolkit</p><h3 className="mt-4 font-display text-4xl font-semibold">Capability, measured in practice.</h3></div>
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2">{skills.map((skill) => <div key={skill.id} className="bg-white p-5"><div className="flex items-start justify-between gap-4 text-sm font-bold"><span>{skill.name}</span><span className="shrink-0 text-xs uppercase tracking-[.12em] text-copper">{skill.levelLabel}</span></div><p className="mt-3 text-xs text-ink/45">{skill.category}</p></div>)}</div>
        </div>
      </div>
    </section>

    <section id="projects" className="section-pad relative bg-ink text-white">
      <div className="blueprint-grid absolute inset-0 opacity-10" />
      <div className="container-shell"><SectionTitle eyebrow="03 / Selected Work" title="Work defined by detail and delivery." copy="Representative project experience based on responsibilities documented in my CV. Replace these with named project photos as your portfolio grows." light />
        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">{projects.map((project, index) => <article key={project.id} className="project-card group bg-white/[.025]">
          <div className="blueprint-grid relative aspect-[4/3] overflow-hidden bg-blueprint">{project.imageUrl ? <Image src={project.imageUrl} alt={project.title} fill loading="lazy" className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw" /> : <div className="absolute inset-0"><Ruler className="absolute left-8 top-8 text-copper/80" size={38} strokeWidth={1} /><div className="absolute bottom-8 left-8 right-8 border-t border-copper/30 pt-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-copper">Representative work</p><p className="mt-2 text-sm text-white/55">{project.role || project.category}</p></div></div>}<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ink/75" /><span className="absolute bottom-5 right-6 font-display text-7xl text-white/10">0{index + 1}</span></div>
          <div className="border border-white/10 border-t-0 p-7"><div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[.16em] text-copper"><span>{project.category}</span><span className="shrink-0">{project.year}</span></div><h3 className="mt-5 text-xl font-bold">{project.title}</h3><p className="mt-4 text-sm leading-7 text-white/58">{project.description}</p><div className="mt-6 grid gap-3 text-xs text-white/50"><p className="flex items-center gap-2"><MapPin size={14} />{project.location}</p>{project.duration && <p>Duration: {project.duration}</p>}{project.role && <p>Role: {project.role}</p>}{project.technologies && <p>Tools: {project.technologies}</p>}</div>{project.responsibilities && <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-6 text-white/48">{project.responsibilities}</p>}</div>
        </article>)}</div>
      </div>
    </section>

    <section id="experience" className="section-pad bg-concrete">
      <div className="container-shell"><SectionTitle eyebrow="04 / Experience" title="Experience grounded in the field." />
        <div className="mt-14 grid gap-16">
          <div>{experience.map((item, index) => <article key={item.id} className="grid gap-4 border-t border-ink/15 py-8 sm:grid-cols-[130px_1fr]"><div className="text-xs font-bold uppercase tracking-wider text-copper">{item.startDate}<br />{item.endDate}</div><div><p className="text-xs text-ink/45">{item.organization} · {item.location}</p><h3 className="mt-2 text-2xl font-bold">{item.title}</h3><p className="mt-4 max-w-2xl leading-8 text-ink/58">{item.description}</p></div></article>)}</div>
          <aside id="education" className="scroll-mt-24 bg-blueprint p-8 text-white"><Sparkles className="text-copper" /><p className="mt-7 text-[11px] font-extrabold uppercase tracking-[.24em] text-copper">05 / Education</p><h3 className="mt-4 font-display text-3xl font-semibold">Education & training</h3>{education.map(item => <div key={item.id} className="mt-7 border-t border-white/10 pt-6"><p className="text-xs text-copper">{item.endDate}</p><h4 className="mt-2 font-bold">{item.title}</h4><p className="mt-1 text-sm text-white/50">{item.organization}{item.location ? `, ${item.location}` : ""}</p><p className="mt-3 text-sm leading-6 text-white/55">{item.description}</p></div>)}{certifications.length > 0 && <div className="mt-10"><p className="text-[11px] font-extrabold uppercase tracking-[.24em] text-copper">Certifications</p>{certifications.map(item => <div key={item.id} className="mt-6 border-t border-white/10 pt-5">{item.imageUrl && <div className="relative mb-5 aspect-[16/9] overflow-hidden bg-ink/35"><Image src={item.imageUrl} alt={`${item.title} certificate`} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 90vw, 38vw" /></div>}<p className="flex items-center gap-2 text-xs text-copper"><CheckCircle2 size={14} />{item.issuedDate || "Certified"}</p><h4 className="mt-2 font-bold">{item.title}</h4><p className="mt-1 text-sm text-white/50">{item.issuer}{item.location ? `, ${item.location}` : ""}</p><p className="mt-3 text-sm leading-6 text-white/55">{item.description}</p>{item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs text-copper">View credential <ArrowUpRight size={13} /></a>}</div>)}</div>}</aside>
        </div>
      </div>
    </section>

    {achievements.length > 0 && <section id="achievements" className="section-pad bg-white">
      <div className="container-shell"><SectionTitle eyebrow="06 / Achievements" title="Milestones earned through study and site work." copy="Academic highlights, professional progress, and notable accomplishments from civil engineering practice." />
        <div className="mt-14 grid gap-px bg-ink/10 md:grid-cols-2 xl:grid-cols-3">{achievements.map((item, index) => <article key={item.id} className="bg-white p-7 sm:p-8">
          <div className="flex items-start justify-between gap-6"><Award size={30} strokeWidth={1.4} className="shrink-0 text-copper" /><span className="font-display text-5xl text-ink/10">0{index + 1}</span></div>
          <p className="mt-10 text-xs font-bold uppercase tracking-[.16em] text-copper">{item.year || "Achievement"}</p>
          <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
          {item.organization && <p className="mt-2 text-sm text-ink/45">{item.organization}</p>}
          <p className="mt-4 leading-7 text-ink/58">{item.description}</p>
          {item.linkUrl && <a href={item.linkUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-copper">View more <ArrowUpRight size={13} /></a>}
        </article>)}</div>
      </div>
    </section>}

    <section id="contact" className="section-pad relative bg-ink text-white"><div className="blueprint-grid absolute inset-0 opacity-20" /><div className="container-shell relative grid gap-14 lg:grid-cols-2">
      <div><p className="eyebrow">07 / Contact</p><h2 className="mt-5 font-display text-5xl font-semibold leading-none tracking-normal sm:text-7xl">{profile.contactHeading}</h2><p className="mt-7 max-w-lg leading-8 text-white/60">{profile.contactIntro}</p><p className="mt-5 max-w-lg border-l-2 border-copper pl-5 text-sm font-bold uppercase tracking-[.14em] text-copper">{profile.availability}</p>
        <div className="mt-10 grid gap-4"><a href={`mailto:${profile.email}`} className="contact-link"><Mail size={18} />{profile.email}</a><a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="contact-link"><Phone size={18} />{profile.phone}</a><div className="contact-link"><MapPin size={18} />{profile.location}</div></div>
        <div className="mt-8"><SocialLinks links={socialLinks} /></div>
      </div><ContactForm email={profile.email} />
    </div></section>
    <footer className="border-t border-white/10 bg-ink py-8 text-white/40"><div className="container-shell flex flex-col gap-5 text-xs lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"><p>© {new Date().getFullYear()} {profile.name}</p><p>{profile.title} · Nepal</p><SocialLinks links={socialLinks} compact /></div><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"><p>Website by <span className="font-bold text-white/70">Santosh Technology</span></p><a href="https://wa.me/9779767439314?text=Hello%20Santosh%20Technology%2C%20I%20am%20interested%20in%20a%20website." target="_blank" rel="noreferrer" className="flex items-center gap-2 text-copper transition hover:text-white">Website enquiries: +977 9767439314 <ArrowUpRight size={14} /></a><a href={profile.cvUrl} download className="flex items-center gap-2 text-copper transition hover:text-white"><Download size={14} />Download CV</a></div></div></footer>
  </main>;
}
