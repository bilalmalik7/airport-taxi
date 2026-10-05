import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: fixed-price airport taxis in Glasgow`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the site is shared on WhatsApp, Facebook, etc.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0b1b3a 0%, #1f3d7a 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#ffb703", fontWeight: 700 }}>✈ {site.name}</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>Glasgow airport taxis</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#ffb703", lineHeight: 1.05 }}>at fixed prices</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 32, color: "#c5d0e6" }}>Glasgow · Prestwick · Edinburgh · Book online 24/7</div>
      </div>
    ),
    size,
  );
}
