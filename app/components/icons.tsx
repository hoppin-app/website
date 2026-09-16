/* Single icon family: 24×24 grid, 1.6 stroke, round caps/joins.
   Hand-rolled so the site keeps zero runtime dependencies. */

type IconProps = React.SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.15" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function NoServerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="4" width="17" height="6" rx="2" />
      <rect x="3.5" y="14" width="17" height="6" rx="2" />
      <path d="M7.5 7h.01M7.5 17h.01" />
      <path d="M4 20.5 20 3.5" />
    </Base>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="4.75" r="2.25" />
      <circle cx="4.75" cy="18" r="2.25" />
      <circle cx="19.25" cy="18" r="2.25" />
      <path d="M10.4 6.4 6.35 15.95M13.6 6.4l4.05 9.55M7 18h10" />
    </Base>
  );
}

export function PhoneIdIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M10.5 5.5h3" />
      <circle cx="12" cy="13" r="2.2" />
      <path d="M8.6 18.3a3.7 3.7 0 0 1 6.8 0" />
    </Base>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 9a14.5 14.5 0 0 1 19 0" />
      <path d="M6 12.6a9.3 9.3 0 0 1 12 0" />
      <path d="M9.3 16.2a4.4 4.4 0 0 1 5.4 0" />
      <circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function TranslateIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 6h8M7.5 4v2M9.6 6a9.6 9.6 0 0 1-6.1 8.6" />
      <path d="M5.6 10.4a9 9 0 0 0 5.2 4.2" />
      <path d="M12.5 20.5l4-9.5 4 9.5M14.1 17.2h4.8" />
    </Base>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2.9 19.5 6v6c0 4.2-3 7.8-7.5 9.1C7.5 19.8 4.5 16.2 4.5 12V6z" />
      <path d="m9.2 12.1 2 2 3.6-3.9" />
    </Base>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Base>
  );
}
