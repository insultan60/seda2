import { ImageResponse } from "next/og";
import { AGENT } from "./site";

/* The card that renders when the site is shared to iMessage, WhatsApp, Slack,
   LinkedIn or Facebook. Generated rather than a static file so it stays on
   brand automatically and needs no design asset to exist — swap in a real
   photograph here once Alexandra has one she wants leading every share. */

export const alt = `${AGENT.name} — Los Angeles Real Estate`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#4F5847",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              border: "2px solid #CBBBA0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F5F0E1",
              fontSize: 30,
            }}
          >
            AK
          </div>
          <div
            style={{
              color: "#CBBBA0",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            {`${AGENT.brokerage} · Los Angeles`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#F5F0E1", fontSize: 82, lineHeight: 1.05 }}>
            Luxury Real Estate,
          </div>
          <div style={{ color: "#F5F0E1", fontSize: 82, lineHeight: 1.05, fontStyle: "italic" }}>
            Thoughtfully Guided
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(203,187,160,.45)",
            paddingTop: 28,
            color: "#DED2BD",
            fontSize: 24,
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ color: "#F5F0E1", fontSize: 34, fontFamily: "Georgia, serif" }}>
              {AGENT.name}
            </div>
            <div style={{ fontSize: 20 }}>REALTOR® · Estates Director</div>
          </div>
          <div style={{ fontSize: 20 }}>{`DRE# ${AGENT.license}`}</div>
        </div>
      </div>
    ),
    size
  );
}
