"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });
  return <form action={action} className="mt-9 grid gap-5">
    <label className="admin-label">Email<input className="admin-input" type="email" name="email" required autoComplete="email" /></label>
    <label className="admin-label">Password<input className="admin-input" type="password" name="password" required autoComplete="current-password" /></label>
    {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    <button className="admin-button" disabled={pending}>{pending ? "Signing in..." : "Sign in"}</button>
  </form>;
}
