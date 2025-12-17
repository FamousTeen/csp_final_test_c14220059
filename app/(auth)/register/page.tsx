import AuthForm from "@/components/auth/auth-form";
import { AUTH_FORM_INITIAL_STATE } from "@/lib/auth/types";
import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-10 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900">
      <AuthForm
        title="Buat Akun Portal"
        description="Daftarkan email perusahaan Anda untuk mulai mengakses Portal Karyawan."
        submitLabel="Daftar"
        alternateCta={{
          label: "Sudah punya akun?",
          linkLabel: "Masuk",
          href: "/login",
        }}
        action={registerAction}
        initialState={AUTH_FORM_INITIAL_STATE}
      />
    </main>
  );
}
