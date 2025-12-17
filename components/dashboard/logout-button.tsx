"use client";

import { useFormStatus } from "react-dom";

export default function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-white/50 bg-white/20 px-6 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30 disabled:cursor-wait"
    >
      {pending ? "Keluar..." : "Logout"}
    </button>
  );
}
