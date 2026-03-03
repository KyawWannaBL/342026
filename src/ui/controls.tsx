import * as React from "react";
import { Link } from "react-router-dom";
import type { AppPath } from "../routes/paths";

export function cx(...parts: Array<string | false | undefined | null>) { 
  return parts.filter(Boolean).join(" "); 
}

type BtnBase = { className?: string; children: React.ReactNode; disabled?: boolean; };
type BtnLink = BtnBase & { to: AppPath; onClick?: never; type?: never };
type BtnButton = BtnBase & { to?: never; onClick?: React.MouseEventHandler<HTMLButtonElement>; type?: "button" | "submit" | "reset" };

export function AppButton(props: BtnLink | BtnButton) {
  if ("to" in props && props.to) {
    return (
      <Link className={cx("btn", props.className)} to={props.to} aria-disabled={props.disabled ? "true" : "false"}>
        {props.children}
      </Link>
    );
  }
  return (
    <button type={props.type || "button"} className={cx("btn", props.className)} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

export function IconPill(props: { children: React.ReactNode; className?: string }) {
  return <span className={cx("pill", props.className)}>{props.children}</span>;
}
