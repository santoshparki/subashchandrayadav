import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { getSupabaseAdminClient, getSupabaseStorageBucket } from "@/lib/supabase";

export async function saveManagedFile(file: File, prefix: string) {
  const ext = path.extname(file.name).toLowerCase();
  const filename = `${prefix}-${Date.now()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const bucket = getSupabaseStorageBucket();
    const storagePath = `${prefix}/${filename}`;
    const { error } = await supabase.storage.from(bucket).upload(storagePath, bytes, {
      contentType: file.type || undefined,
      upsert: false
    });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    return data.publicUrl;
  }

  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), bytes);
  return `/uploads/${filename}`;
}

export async function deleteManagedFile(url?: string | null) {
  if (!url) return;
  const supabase = getSupabaseAdminClient();
  const bucket = getSupabaseStorageBucket();
  if (supabase && url.includes(`/storage/v1/object/public/${bucket}/`)) {
    const storagePath = decodeURIComponent(url.split(`/storage/v1/object/public/${bucket}/`)[1] || "");
    if (storagePath) await supabase.storage.from(bucket).remove([storagePath]);
    return;
  }
  if (url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", url));
    } catch {
      // The database should not fail because an old local file is already gone.
    }
  }
}
