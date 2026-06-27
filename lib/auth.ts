import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseAuthClient } from "@/lib/supabase";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "development-secret-change-before-production");
const cookieName = "portfolio-admin-session";
const accessCookieName = "portfolio-supabase-access-token";
const refreshCookieName = "portfolio-supabase-refresh-token";

export async function createSession(userId: string, supabaseSession?: Pick<Session, "access_token" | "refresh_token" | "expires_in">) {
  const token = await new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
  const store = await cookies();
  store.set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  if (supabaseSession?.access_token) store.set(accessCookieName, supabaseSession.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: supabaseSession.expires_in || 60 * 60 });
  if (supabaseSession?.refresh_token) store.set(refreshCookieName, supabaseSession.refresh_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function getSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.userId) redirect("/admin/login");
  const supabase = getSupabaseAuthClient();
  const accessToken = (await cookies()).get(accessCookieName)?.value;
  const refreshToken = (await cookies()).get(refreshCookieName)?.value;
  if (!supabase) redirect("/admin/login");
  if (accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (!error && data.user) return session;
  }
  if (refreshToken) {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (!error && data.user && data.session) {
      await createSession(data.user.id, data.session);
      return { userId: data.user.id };
    }
  }
  await clearSession();
  redirect("/admin/login");
}

export async function clearSession() {
  const store = await cookies();
  store.delete(cookieName);
  store.delete(accessCookieName);
  store.delete(refreshCookieName);
}
