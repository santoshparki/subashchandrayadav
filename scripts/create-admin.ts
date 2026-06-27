import { getSupabaseAdminClient } from "../lib/supabase";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const supabase = getSupabaseAdminClient();

  if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
  if (password.length < 10) throw new Error("ADMIN_PASSWORD must be at least 10 characters.");
  if (!supabase) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env first.");

  const normalizedEmail = email.toLowerCase();
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) throw listError;

  const existing = users.users.find((user) => user.email?.toLowerCase() === normalizedEmail);
  const result = existing
    ? await supabase.auth.admin.updateUserById(existing.id, { password, email_confirm: true })
    : await supabase.auth.admin.createUser({ email: normalizedEmail, password, email_confirm: true });

  if (result.error) throw result.error;
  console.log(`Supabase admin user ready: ${normalizedEmail}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
