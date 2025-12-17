import AuthForm from "@/components/auth/auth-form";
import { AUTH_FORM_INITIAL_STATE } from "@/lib/auth/types";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-4 py-10">
      <AuthForm
        title="Masuk ke Portal"
        description="Gunakan kredensial perusahaan Anda untuk melihat data karyawan dan pengumuman terbaru."
        submitLabel="Masuk"
        alternateCta={{
          label: "Belum punya akun?",
          linkLabel: "Daftar",
          href: "/register",
        }}
        action={loginAction}
        initialState={AUTH_FORM_INITIAL_STATE}
      />
    </main>
  );
}
