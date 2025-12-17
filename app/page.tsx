import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 px-4 py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <span className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
          Employee Portal
        </span>
        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          Semua informasi karyawan, profil, dan pengumuman penting dalam satu portal yang aman.
        </h1>
        <p className="text-pretty text-lg text-white/75 sm:text-xl">
          Nikmatilah kemudahan akses informasi karyawan dan pengumuman penting kapan saja.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-full bg-white px-8 py-3 text-base font-semibold text-indigo-950 shadow-lg shadow-indigo-500/40 transition hover:-translate-y-0.5 hover:bg-indigo-100"
          >
            Masuk Portal
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Daftar Karyawan Baru
          </Link>
        </div>
      </div>
    </main>
  );
}
