"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { AuthFormState } from "@/lib/auth/types";

type AuthFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  alternateCta: {
    label: string;
    linkLabel: string;
    href: string;
  };
  action: (
    prevState: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  initialState: AuthFormState;
};

export default function AuthForm({
  title,
  description,
  submitLabel,
  alternateCta,
  action,
  initialState,
}: AuthFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/70 p-8 shadow-xl backdrop-blur dark:bg-zinc-900/80">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </header>
      <form action={formAction} className="mt-8 space-y-5">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@perusahaan.com"
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Minimal 6 karakter"
        />

        {state.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        ) : null}

        <SubmitButton label={submitLabel} />
      </form>
      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {alternateCta.label}{" "}
        <Link href={alternateCta.href} className="font-medium text-indigo-600 hover:text-indigo-500">
          {alternateCta.linkLabel}
        </Link>
      </p>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
};

function Field({ label, name, type, placeholder, autoComplete }: FieldProps) {
  return (
    <label className="block text-sm">
      <span className="text-zinc-700 dark:text-zinc-200">{label}</span>
      <input
        className="mt-1 w-full rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 text-base text-zinc-900 shadow-sm outline-none ring-2 ring-transparent transition focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-white"
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Memproses..." : label}
    </button>
  );
}
