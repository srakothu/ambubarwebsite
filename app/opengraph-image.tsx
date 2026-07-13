import { ImageResponse } from "next/og";

export const alt = "Ambu Bar Thirst Responders mobile beverage bar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#122f5b",
          color: "white",
          display: "flex",
          height: "100%",
          padding: "58px 72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "3px solid #ffd154",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "44px",
            width: "100%",
          }}
        >
          <div style={{ color: "#ffd154", display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 3 }}>
            AMBU BAR LLC
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.02 }}>
              The Thirst
            </div>
            <div style={{ color: "#ffd154", display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 0.98 }}>
              Responders
            </div>
            <div style={{ display: "flex", fontSize: 30, lineHeight: 1.3, maxWidth: 760 }}>
              A retired ambulance turned into Pennsylvania&apos;s most memorable mobile beverage bar.
            </div>
          </div>
          <div style={{ color: "#fff4b3", display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: 1.5 }}>
            WEDDINGS · FESTIVALS · PRIVATE PARTIES · CORPORATE EVENTS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
