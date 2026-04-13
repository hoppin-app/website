'use client';

import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <>
      <Head>
        <title>MeshChat — Private P2P Messaging</title>
        <meta
          name="description"
          content="Truly private messaging. No servers. No data collection. Just you and the people you trust."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
 
      <div className="page">
        {/* Nav */}
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <div className="nav__inner">
            <span className="nav__logo">
              <span className="nav__logo-icon">💬</span>
              MeshChat
            </span>
            <a
              href="#download"
              className="btn btn--sm"
              onClick={(e) => {
                e.preventDefault();
                // document
                //   .getElementById("download")
                //   .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get the App
            </a>
          </div>
        </nav>
 
        {/* Hero */}
        <section className="hero">
          <div className="hero__badge">✨ Now available for iPhone</div>
          <h1 className="hero__title">
            Chat privately.
            <br />
            <span className="hero__title-accent">No middleman.</span>
          </h1>
          <p className="hero__sub">
            MeshChat connects you directly to the people you trust — device to
            device, no servers in between. Built on Kademlia DHT and encrypted
            TCP connections.
          </p>
          <div className="hero__cta">
            <a href="#download" className="btn btn--primary btn--lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download for iPhone
            </a>
            <a href="#how" className="btn btn--ghost btn--lg">
              How it works →
            </a>
          </div>
          <div className="hero__stores-note">
            Free on the App Store · iOS 16+
          </div>
 
          {/* Phone mockup */}
          <div className="hero__phone-wrap">
            <div className="phone">
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="chat">
                  <div className="chat__header">
                    <div className="chat__avatar">🧑‍💻</div>
                    <div>
                      <div className="chat__name">Alex</div>
                      <div className="chat__status">🟢 Connected directly</div>
                    </div>
                  </div>
                  <div className="chat__messages">
                    <div className="chat__msg chat__msg--them">
                      <span>Hey! No servers between us 👀</span>
                    </div>
                    <div className="chat__msg chat__msg--me">
                      <span>Pure P2P 🔒 feels great</span>
                    </div>
                    <div className="chat__msg chat__msg--them">
                      <span>Zero data on any server 🎉</span>
                    </div>
                    <div className="chat__msg chat__msg--me">
                      <span>Exactly how it should be ✅</span>
                    </div>
                  </div>
                  <div className="chat__input-row">
                    <div className="chat__input-box">Message…</div>
                    <div className="chat__send">↑</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="phone__glow" />
          </div>
        </section>
 
        {/* Features */}
        <section className="features" id="how">
          <div className="container">
            <div className="section-label">How it works</div>
            <h2 className="section-title">
              The internet the way it was meant to be
            </h2>
            <div className="features__grid">
              {[
                {
                  emoji: "🔗",
                  title: "Direct TCP connections",
                  desc: "Your messages travel over encrypted TCP links straight to the recipient — no cloud relay, no logging.",
                },
                {
                  emoji: "🕸️",
                  title: "Kademlia DHT routing",
                  desc: "Peers discover each other through a distributed hash table. No central directory. Censorship-resistant by design.",
                },
                {
                  emoji: "🔐",
                  title: "End-to-end privacy",
                  desc: "Messages never touch a server. If there's no server to hack, there's nothing to breach.",
                },
                {
                  emoji: "📡",
                  title: "Works offline-first",
                  desc: "On the same WiFi, MeshChat works without any internet connection at all.",
                },
                {
                  emoji: "⚡",
                  title: "Native iPhone speed",
                  desc: "Built for iOS from the ground up — fast, responsive, and designed to Apple's Human Interface Guidelines.",
                },
                {
                  emoji: "🫶",
                  title: "Open & free",
                  desc: "No subscription. No ads. No data to sell. MeshChat is free because privacy shouldn't cost anything.",
                },
              ].map(({ emoji, title, desc }) => (
                <div className="feature-card" key={title}>
                  <div className="feature-card__emoji">{emoji}</div>
                  <h3 className="feature-card__title">{title}</h3>
                  <p className="feature-card__desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* Download CTA */}
        <section className="download" id="download">
          <div className="container">
            <div className="download__inner">
              <div className="download__badge">📲 Ready for iPhone</div>
              <h2 className="download__title">Start chatting privately today</h2>
              <p className="download__sub">
                Free download · No account needed · No phone number required
              </p>
              <a
                href="https://apps.apple.com"
                className="btn btn--primary btn--xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </a>
              <div className="download__compat">
                Compatible with iPhone · iOS 16 or later
              </div>
            </div>
          </div>
        </section>
 
        {/* Footer */}
        <footer className="footer">
          <div className="container footer__inner">
            <span className="footer__logo">
              💬 MeshChat
            </span>
            <span className="footer__copy">
              © {new Date().getFullYear()} MeshChat · Built with ❤️ for privacy
            </span>
            <div className="footer__links">
              <a href="#">Privacy</a>
              <a href="#">Support</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
 
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }
 
        :root {
          --blue: #0071e3;
          --blue-dark: #0051a8;
          --text: #1d1d1f;
          --text-2: #6e6e73;
          --text-3: #aeaeb2;
          --bg: #ffffff;
          --bg-2: #f5f5f7;
          --bg-3: #fbfbfd;
          --border: rgba(0, 0, 0, 0.1);
          --radius: 18px;
          --radius-sm: 12px;
        }
 
        html {
          scroll-behavior: smooth;
        }
 
        body {
          font-family: "Mona Sans", -apple-system, BlinkMacSystemFont,
            "SF Pro Display", "Segoe UI", sans-serif;
          color: var(--text);
          background: var(--bg);
          line-height: 1.5;
        }
 
        .page {
          min-height: 100vh;
          overflow-x: hidden;
        }
 
        .container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }
 
        /* Nav */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 0;
          transition: background 0.25s, backdrop-filter 0.25s, box-shadow 0.25s;
        }
        .nav--scrolled {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          box-shadow: 0 0.5px 0 var(--border);
        }
        .nav__inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav__logo {
          font-size: 17px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav__logo-icon {
          font-size: 20px;
        }
 
        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s ease;
          border: none;
          outline: none;
          font-family: inherit;
        }
        .btn--sm {
          padding: 8px 18px;
          font-size: 14px;
          background: var(--blue);
          color: #fff;
        }
        .btn--sm:hover {
          background: var(--blue-dark);
        }
        .btn--lg {
          padding: 14px 28px;
          font-size: 16px;
        }
        .btn--xl {
          padding: 16px 36px;
          font-size: 18px;
        }
        .btn--primary {
          background: var(--blue);
          color: #fff;
        }
        .btn--primary:hover {
          background: var(--blue-dark);
          transform: translateY(-1px);
        }
        .btn--ghost {
          background: transparent;
          color: var(--blue);
        }
        .btn--ghost:hover {
          background: rgba(0, 113, 227, 0.06);
        }
 
        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 140px 24px 100px;
          background: var(--bg-3);
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 50% at 50% -10%,
            rgba(0, 113, 227, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .hero__badge {
          display: inline-block;
          background: rgba(0, 113, 227, 0.08);
          color: var(--blue);
          border-radius: 980px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 28px;
          letter-spacing: 0.01em;
        }
        .hero__title {
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--text);
          margin-bottom: 24px;
          max-width: 700px;
        }
        .hero__title-accent {
          background: linear-gradient(135deg, #0071e3, #34aadc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__sub {
          font-size: 19px;
          color: var(--text-2);
          max-width: 520px;
          line-height: 1.55;
          margin-bottom: 40px;
          font-weight: 300;
        }
        .hero__cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 16px;
        }
        .hero__stores-note {
          font-size: 13px;
          color: var(--text-3);
          margin-bottom: 80px;
        }
 
        /* Phone */
        .hero__phone-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .phone__glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 113, 227, 0.15),
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }
        .phone {
          width: 280px;
          height: 560px;
          background: #1c1c1e;
          border-radius: 48px;
          padding: 14px;
          position: relative;
          z-index: 1;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }
        .phone__notch {
          width: 80px;
          height: 26px;
          background: #1c1c1e;
          border-radius: 0 0 20px 20px;
          margin: 0 auto 8px;
          position: relative;
          z-index: 2;
        }
        .phone__screen {
          background: #000;
          border-radius: 36px;
          height: calc(100% - 48px);
          overflow: hidden;
          position: relative;
        }
 
        /* Chat UI */
        .chat {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fff;
        }
        .chat__header {
          padding: 14px 16px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        .chat__avatar {
          font-size: 28px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat__name {
          font-size: 14px;
          font-weight: 600;
          color: #1c1c1e;
        }
        .chat__status {
          font-size: 11px;
          color: #3c3c43;
          opacity: 0.6;
        }
        .chat__messages {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
        }
        .chat__msg {
          max-width: 80%;
          font-size: 13px;
          line-height: 1.4;
        }
        .chat__msg span {
          display: inline-block;
          padding: 8px 12px;
          border-radius: 18px;
        }
        .chat__msg--them {
          align-self: flex-start;
        }
        .chat__msg--them span {
          background: #f2f2f7;
          color: #1c1c1e;
          border-bottom-left-radius: 4px;
        }
        .chat__msg--me {
          align-self: flex-end;
        }
        .chat__msg--me span {
          background: #0071e3;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chat__input-row {
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 0.5px solid rgba(0, 0, 0, 0.08);
        }
        .chat__input-box {
          flex: 1;
          background: #f2f2f7;
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 12px;
          color: #aeaeb2;
        }
        .chat__send {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0071e3;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
        }
 
        /* Section common */
        .section-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--blue);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }
        .section-title {
          font-size: clamp(30px, 3.5vw, 48px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--text);
          max-width: 560px;
          margin-bottom: 60px;
        }
 
        /* Features */
        .features {
          padding: 120px 0;
          background: var(--bg);
        }
        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2px;
          background: var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .feature-card {
          background: var(--bg);
          padding: 36px 32px;
          transition: background 0.15s;
        }
        .feature-card:hover {
          background: var(--bg-2);
        }
        .feature-card__emoji {
          font-size: 32px;
          margin-bottom: 16px;
          display: block;
        }
        .feature-card__title {
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .feature-card__desc {
          font-size: 15px;
          color: var(--text-2);
          line-height: 1.55;
          font-weight: 300;
        }
 
        /* Download */
        .download {
          padding: 120px 0;
          background: var(--bg-2);
        }
        .download__inner {
          text-align: center;
        }
        .download__badge {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: var(--blue);
          background: rgba(0, 113, 227, 0.08);
          border-radius: 980px;
          padding: 6px 16px;
          margin-bottom: 24px;
        }
        .download__title {
          font-size: clamp(34px, 4vw, 56px);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: var(--text);
          margin-bottom: 18px;
        }
        .download__sub {
          font-size: 17px;
          color: var(--text-2);
          font-weight: 300;
          margin-bottom: 44px;
        }
        .download__compat {
          margin-top: 16px;
          font-size: 13px;
          color: var(--text-3);
        }
 
        /* Footer */
        .footer {
          padding: 40px 0;
          border-top: 0.5px solid var(--border);
        }
        .footer__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer__logo {
          font-size: 15px;
          font-weight: 600;
        }
        .footer__copy {
          font-size: 13px;
          color: var(--text-3);
        }
        .footer__links {
          display: flex;
          gap: 24px;
        }
        .footer__links a {
          font-size: 13px;
          color: var(--text-2);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer__links a:hover {
          color: var(--blue);
        }
 
        @media (max-width: 600px) {
          .hero__cta {
            flex-direction: column;
            align-items: stretch;
          }
          .hero__cta .btn {
            justify-content: center;
          }
          .footer__inner {
            flex-direction: column;
            text-align: center;
          }
          .footer__links {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}