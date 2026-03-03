import * as React from "react";
type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string };
export function UserIcon({ title = "User", ...rest }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...rest}>
      <title>{title}</title>
      <path fill="currentColor" d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2c-4.4 0-8 2.2-8 4.9V21h16v-2.1C20 16.2 16.4 14 12 14Z" />
    </svg>
  );
}
export function ChevronDown({ title = "Open", ...rest }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...rest}>
      <title>{title}</title>
      <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}
