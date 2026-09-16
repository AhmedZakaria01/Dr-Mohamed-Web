import { ImageResponse } from "next/og";

import { getPageContent } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }) {
  const { locale } = await params;
  const home = getPageContent(locale, "home");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: locale === "ar" ? "flex-end" : "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c5652 0%, #0f6e6a 55%, #14b8a6 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 16 }}>{home.hero.tagline}</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{home.hero.title}</div>
        <div style={{ fontSize: 32, marginTop: 16, color: "#F2A93B" }}>{home.hero.subtitle}</div>
      </div>
    ),
    { ...size },
  );
}
