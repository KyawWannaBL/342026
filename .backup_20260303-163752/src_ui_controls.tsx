import * as React from "react";
import { Link } from "react-router-dom";
import type { AppPath } from "../routes/paths";

export function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type BtnBase = {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

type BtnLink = BtnBase & { to: AppPath; onClick?: never };
type BtnButton = BtnBase & { to?: never; onClick: React.MouseEventHandler<HTMLButtonElement> };

export function AppButton(props: BtnLink | BtnButton) {
  if ("to" in props) {
    const disabled = !!props.disabled;
    return (
      <Link
        className={cx("btn", props.className, disabled && "btnDisabled")}
        to={props.to}
        aria-disabled={disabled ? "true" : "false"}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cx("btn", props.className, props.disabled && "btnDisabled")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export function IconPill(props: { children: React.ReactNode; className?: string }) {
  return <span className={cx("pill", props.className)}>{props.children}</span>;
}
