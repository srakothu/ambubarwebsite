"use client";

import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({ unstable_retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#eff6ff",
          color: "#122f5b",
          fontFamily: "Arial, Helvetica, sans-serif",
          margin: 0,
        }}
      >
        <main
          style={{
            alignItems: "center",
            display: "flex",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ margin: "0 auto", maxWidth: "38rem" }}>
            <p style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.12em" }}>
              AMBU BAR
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 7vw, 4rem)", margin: "0.5rem 0 1rem" }}>
              We hit a speed bump.
            </h1>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.6, margin: "0 auto 2rem" }}>
              Please try again. If the problem continues, return home and contact the Thirst
              Responders.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={unstable_retry}
                style={{
                  background: "#1f65c1",
                  border: 0,
                  borderRadius: "999px",
                  color: "#ffffff",
                  cursor: "pointer",
                  font: "inherit",
                  fontWeight: 700,
                  padding: "0.8rem 1.25rem",
                }}
                type="button"
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  border: "2px solid #122f5b",
                  borderRadius: "999px",
                  color: "#122f5b",
                  fontWeight: 700,
                  padding: "0.7rem 1.25rem",
                  textDecoration: "none",
                }}
              >
                Return home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
