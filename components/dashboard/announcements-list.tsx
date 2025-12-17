import { createClient } from "@/utils/supabase/server";
import type { AnnouncementRow } from "@/types/supabase";

export default async function AnnouncementsList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, content, created_at")
    .returns<AnnouncementRow[]>()
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 text-sm text-red-700">
        Gagal memuat pengumuman: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        Belum ada pengumuman. Tambahkan data pada tabel announcements di Supabase Anda.
      </p>
    );
  }

  return (
    <ol className="space-y-4">
      {data.map((item) => (
        <AnnouncementCard key={item.id} announcement={item} />
      ))}
    </ol>
  );
}

function AnnouncementCard({ announcement }: { announcement: AnnouncementRow }) {
  const timestamp = new Date(announcement.created_at);
  const formatted = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(timestamp);

  return (
    <li className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        {formatted}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
        {announcement.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {announcement.content}
      </p>
    </li>
  );
}
