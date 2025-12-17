"use client";

import { useTransition } from "react";

type LogoutButtonProps = {
  action: () => Promise<void>;
};

export default function LogoutButton({ action }: LogoutButtonProps) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await action();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-full border border-white/50 bg-white/20 px-6 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30 disabled:cursor-wait"
    >
      {pending ? "Keluar..." : "Logout"}
    </button>
  );
}
