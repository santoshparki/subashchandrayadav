import { redirect } from "next/navigation";
import { Building2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  return <main className="grid min-h-screen place-items-center bg-ink px-5"><div className="w-full max-w-md bg-concrete p-8 shadow-premium sm:p-11"><Building2 className="text-copper" size={38} /><p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-copper">Portfolio CMS</p><h1 className="mt-3 font-display text-5xl font-semibold">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-ink/55">Sign in with Supabase Auth to manage profile, work, enquiries, uploads, and contact content.</p><LoginForm /><a href="/" className="mt-7 block text-center text-xs text-ink/45 hover:text-copper">Return to portfolio</a></div></main>;
}
