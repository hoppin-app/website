import { HopMark } from "./HopMark";

/* ==========================================================================
   iPhone shell
   ========================================================================== */

export function Phone({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative shrink-0 rounded-[2.6rem] p-[3px] ${className}`}
      style={{
        background:
          "linear-gradient(160deg, rgba(180,180,190,0.9), rgba(90,90,100,0.85) 42%, rgba(160,160,172,0.9))",
        boxShadow: "var(--shadow-phone)",
      }}
    >
      <div className="relative h-[560px] w-[268px] overflow-hidden rounded-[2.45rem] bg-background">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[9px] z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col pt-[6px]">{children}</div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-[34px] items-center justify-between px-6 pt-1 text-[11px] font-semibold tracking-[-0.01em]">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 4}
              y={7 - i * 2.2}
              width="2.6"
              height={3 + i * 2.2}
              rx="0.8"
              fill="currentColor"
            />
          ))}
        </svg>
        <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
          <rect
            x="0.5"
            y="0.5"
            width="13"
            height="9"
            rx="2.6"
            stroke="currentColor"
            strokeOpacity="0.4"
            fill="none"
          />
          <rect x="2" y="2" width="9.5" height="6" rx="1.5" fill="currentColor" />
          <path
            d="M15 3.6v2.8a1.6 1.6 0 0 0 0-2.8Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </span>
    </div>
  );
}

function Avatar({
  initials,
  color,
  size = 36,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}

/* ==========================================================================
   Screen 1 — conversation list, with the app's floating tab bar
   ========================================================================== */

const conversations = [
  {
    name: "Ana Ribeiro",
    initials: "AR",
    color: "#5856d6",
    preview: "Boa, então até amanhã!",
    time: "9:38",
    unread: 2,
    online: true,
  },
  {
    name: "Miguel",
    initials: "M",
    color: "#ff9500",
    preview: "Sent you the build",
    time: "8:12",
    unread: 0,
    online: true,
  },
  {
    name: "Sofia Matos",
    initials: "SM",
    color: "#34c759",
    preview: "Perfeito 👌",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    name: "Tiago",
    initials: "T",
    color: "#ff2d55",
    preview: "Vamos testar na LAN",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

export function ChatListScreen() {
  return (
    <>
      <StatusBar />
      <div className="min-h-0 flex-1 overflow-hidden bg-surface">
        <div className="px-5 pb-3 pt-2">
          <h3 className="text-[26px] font-bold tracking-[-0.03em]">Messages</h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-muted">
            <span className="h-[6px] w-[6px] rounded-full bg-ios-green" />
            Online
          </p>
        </div>

        <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl bg-surface-raised px-3 py-2 text-[13px] text-muted">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          Search
        </div>

        <ul>
          {conversations.map((c) => (
            <li
              key={c.name}
              className="flex items-center gap-3 px-4 py-[10px]"
            >
              <div className="relative">
                <Avatar initials={c.initials} color={c.color} size={42} />
                {c.online && (
                  <span className="absolute -bottom-px -right-px h-[11px] w-[11px] rounded-full border-2 border-surface bg-ios-green" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[14px] font-semibold tracking-[-0.01em]">
                    {c.name}
                  </span>
                  <span className="shrink-0 text-[10.5px] text-muted">
                    {c.time}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`truncate text-[12.5px] ${
                      c.unread ? "font-medium text-foreground" : "text-muted"
                    }`}
                  >
                    {c.preview}
                  </span>
                  {c.unread > 0 && (
                    <span className="flex h-[17px] min-w-[17px] shrink-0 items-center justify-center rounded-full bg-ios-blue px-1 text-[10px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating tab bar — same component the app ships */}
      <div className="px-6 pb-4">
        <div
          className="flex items-center justify-around rounded-full border border-hairline px-2 py-2.5"
          style={{
            background: "var(--nav-bg)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 8px 26px rgba(0,0,0,0.13)",
          }}
        >
          {[
            { label: "Chats", active: true, badge: 2 },
            { label: "People", active: false, badge: 0 },
            { label: "Settings", active: false, badge: 0 },
          ].map((tab) => (
            <div
              key={tab.label}
              className={`flex flex-1 flex-col items-center gap-[3px] ${
                tab.active ? "text-accent" : "text-muted"
              }`}
            >
              <div className="relative">
                <TabGlyph name={tab.label} active={tab.active} />
                {tab.badge > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#ff3b30] px-[3px] text-[8.5px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-semibold">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TabGlyph({ name, active }: { name: string; active: boolean }) {
  const common = {
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: active ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    "aria-hidden": true as const,
  };
  if (name === "Chats") {
    return (
      <svg {...common}>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16a1.5 1.5 0 0 1-1.5-1.5z" />
      </svg>
    );
  }
  if (name === "People") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M18 6l-1.4 1.4M7.4 16.6 6 18M18 18l-1.4-1.4M7.4 7.4 6 6" />
    </svg>
  );
}

/* ==========================================================================
   Screen 2 — the conversation
   ========================================================================== */

const thread = [
  { from: "them", text: "Estou a receber isto direto do teu telemóvel?" },
  { from: "me", text: "Sim, estamos no mesmo Wi-Fi.", time: "9:36" },
  { from: "them", text: "E se eu ficar offline?" },
  { from: "me", text: "Fica selado no relay até voltares.", time: "9:38" },
];

export function ChatRoomScreen() {
  return (
    <>
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-hairline px-3 pb-2.5 pt-1">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
          aria-hidden="true"
        >
          <path d="M14.5 5 8 12l6.5 7" />
        </svg>
        <Avatar initials="AR" color="#5856d6" size={32} />
        <div className="min-w-0">
          <div className="truncate text-[13.5px] font-semibold tracking-[-0.01em]">
            Ana Ribeiro
          </div>
          <div className="flex items-center gap-1 text-[10.5px] text-ios-green">
            <span className="h-[5px] w-[5px] rounded-full bg-ios-green" />
            Verified · on this network
          </div>
        </div>
      </div>

      {/* Encryption notice */}
      <div className="mx-auto mt-3 flex max-w-[210px] items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 text-center text-[9.5px] leading-tight text-muted">
        <HopMark className="h-3 w-3 shrink-0 text-muted" />
        Messages in this chat are end-to-end encrypted. Only you and Ana can
        read them.
      </div>

      {/* Messages */}
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-2">
        {thread.map((m, i) => (
          <div
            key={m.text}
            className={`animate-bubble flex flex-col ${
              m.from === "me" ? "items-end" : "items-start"
            }`}
            style={{ animationDelay: `${400 + i * 550}ms` }}
          >
            <div
              className={`max-w-[80%] rounded-[17px] px-3 py-[7px] text-[12.5px] leading-snug ${
                m.from === "me"
                  ? "bg-ios-blue text-white"
                  : "bg-ios-bubble text-foreground"
              }`}
            >
              {m.text}
            </div>
            {m.time && (
              <span className="mr-1 mt-[3px] flex items-center gap-1 text-[9px] text-muted">
                {m.time}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  className="text-ios-blue"
                  aria-hidden="true"
                >
                  <path d="m4 13 4 4 8-10" />
                  <path d="m12 15.5 1.5 1.5 8-10" />
                </svg>
              </span>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        <div
          className="animate-bubble flex w-fit items-center gap-[3px] rounded-[17px] bg-ios-bubble px-3 py-[9px]"
          style={{ animationDelay: "2600ms" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="typing-dot h-[5px] w-[5px] rounded-full bg-muted"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-hairline px-3 py-2.5">
        <div className="flex-1 rounded-full border border-hairline px-3 py-[7px] text-[12.5px] text-muted">
          Message…
        </div>
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ios-blue">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </div>
      </div>
    </>
  );
}
