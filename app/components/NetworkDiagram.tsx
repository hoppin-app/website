const RELAY_PATH = "M34 96 C 78 58, 116 50, 150 50 C 184 50, 222 58, 266 96";
const DIRECT_PATH = "M40 96 Q 150 30 260 96";

function DeviceNode({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x - 13}
        y={y - 21}
        width="26"
        height="42"
        rx="6"
        fill="var(--surface-raised)"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <rect
        x={x - 9}
        y={y - 17}
        width="18"
        height="30"
        rx="3"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <text
        x={x}
        y={y + 36}
        textAnchor="middle"
        fontSize="10"
        fill="currentColor"
        fillOpacity="0.55"
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  );
}

/** The relayed path: the sealed message waits on the relay until it is fetched. */
export function RelayDiagram() {
  return (
    <svg
      viewBox="0 0 300 150"
      className="w-full text-foreground"
      role="img"
      aria-label="Diagram: an encrypted message from one phone waits on the hoppin relay until the other phone fetches it."
    >
      <path
        d={RELAY_PATH}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <DeviceNode x={34} y={96} label="You" />
      <DeviceNode x={266} y={96} label="Them" />

      {/* Server */}
      <g>
        <rect
          x={126}
          y={32}
          width="48"
          height="36"
          rx="7"
          fill="var(--surface-raised)"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />
        <path
          d="M136 44h28M136 56h28"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx={166} cy={44} r="1.8" fill="currentColor" fillOpacity="0.4" />
        <circle cx={166} cy={56} r="1.8" fill="currentColor" fillOpacity="0.4" />
        <text
          x={150}
          y={82}
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
          fillOpacity="0.55"
          fontWeight="500"
        >
          Relay · sealed
        </text>
      </g>

      {[0, 1.3].map((delay) => (
        <circle
          key={delay}
          r="4"
          fill="currentColor"
          fillOpacity="0.45"
          className="packet"
          style={
            {
              "--path": `path("${RELAY_PATH}")`,
              "--duration": "2.6s",
              "--delay": `${delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}

/** The local path: on the same network, one hop and no intermediary. */
export function DirectDiagram() {
  return (
    <svg
      viewBox="0 0 300 150"
      className="w-full text-accent"
      role="img"
      aria-label="Diagram: on the same local network, an encrypted message travels directly from one phone to the other."
    >
      <path
        d={DIRECT_PATH}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      <g className="text-foreground">
        <DeviceNode x={40} y={96} label="You" />
        <DeviceNode x={260} y={96} label="Them" />
      </g>

      {/* Presence pulse on both ends */}
      {[40, 260].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy={96}
          r="16"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          className="pulse-ring"
          style={{ transformOrigin: `${cx}px 96px` }}
        />
      ))}

      <text
        x={150}
        y={26}
        textAnchor="middle"
        fontSize="10"
        fill="currentColor"
        fontWeight="600"
      >
        end-to-end encrypted
      </text>

      {[0, 1.1].map((delay) => (
        <circle
          key={delay}
          r="4.5"
          fill="currentColor"
          className="packet"
          style={
            {
              "--path": `path("${DIRECT_PATH}")`,
              "--duration": "2.2s",
              "--delay": `${delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
