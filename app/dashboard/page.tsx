import { Suspense } from "react";
import { redirect } from "next/navigation";
import AnnouncementsList from "@/components/dashboard/announcements-list";
import LogoutButton from "@/components/dashboard/logout-button";
import { createClient } from "@/utils/supabase/server";
import { logoutAction } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/70">
              Portal Karyawan
            </p>
            <h1 className="text-3xl font-semibold">Halo, {user.email}</h1>
            <p className="text-sm text-white/70">
              Kelola identitas Anda dan pantau pengumuman terbaru perusahaan.
            </p>
          </div>
          <form action={logoutAction}>
            <LogoutButton />
          </form>
        </header>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/60">
              Pengumuman
            </p>
            <h2 className="text-2xl font-semibold">Info terbaru untuk Anda</h2>
          </div>
          <Suspense fallback={<AnnouncementsSkeleton />}>
            <AnnouncementsList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

function AnnouncementsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-2xl bg-white/10"
        />
      ))}
    </div>
  );
}
