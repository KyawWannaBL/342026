// @ts-nocheck
import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline" | "danger";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition border";
  const v =
    variant === "ghost"
      ? "bg-transparent border-white/10 text-white hover:bg-white/5"
      : variant === "outline"
      ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
      : variant === "danger"
      ? "bg-rose-500/10 border-rose-500/20 text-rose-200 hover:bg-rose-500/15"
      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-200 hover:bg-emerald-500/15";
  return <button ref={ref} className={cn(base, v, className)} {...props} />;
});
