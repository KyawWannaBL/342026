// @ts-nocheck
import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-12 rounded-xl bg-[#0B0E17] border border-white/10 px-4 text-white outline-none focus:border-emerald-500",
          className
        )}
        {...props}
      />
    );
  }
);
