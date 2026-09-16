/** HopChat mark: two peers, one hop, nothing in between. */
export function HopMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 16.5C4.5 9.6 8.1 6 12 6s7.5 3.6 7.5 10.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx="4.5" cy="17.5" r="2.6" fill="currentColor" />
      <circle cx="19.5" cy="17.5" r="2.6" fill="currentColor" />
    </svg>
  );
}
