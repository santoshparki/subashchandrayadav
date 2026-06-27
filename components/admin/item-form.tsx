import { Trash2 } from "lucide-react";
import { deleteItem } from "@/app/admin/actions";

export function ItemShell({ title, subtitle, type, id, children }: { title: string; subtitle?: string | null; type: string; id?: string; children: React.ReactNode }) {
  return <div className="admin-card"><div className="mb-5 flex items-start justify-between gap-4"><div><h3 className="font-bold">{title}</h3>{subtitle && <p className="mt-1 text-xs text-ink/45">{subtitle}</p>}</div>{id && <form action={deleteItem}><input type="hidden" name="id" value={id} /><input type="hidden" name="type" value={type} /><button aria-label={`Delete ${title}`} className="text-ink/30 hover:text-red-600"><Trash2 size={17} /></button></form>}</div>{children}</div>;
}
