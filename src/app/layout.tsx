import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer, Header, JsonLd, StickyCall } from "@/components/Chrome";
import { BackToTop, ScrollProgress, WhatsAppFab } from "@/components/Extras";
import { businessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Glasgow Airport Taxi & Transfers | Fixed Prices from £15 | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Book a fixed-price airport taxi from anywhere in Glasgow to Glasgow, Prestwick or Edinburgh Airport. Licensed local drivers, flight tracking, meet & greet, pay online. 24/7.",
  keywords: ["Glasgow airport taxi", "Glasgow airport transfers", "taxi to Glasgow Airport", "Prestwick airport taxi", "Edinburgh airport taxi from Glasgow", "airport transfer Glasgow"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_GB", siteName: site.name, url: site.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b1b3a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={font.variable}>
      <body>
        <JsonLd data={businessSchema()} />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCall />
        <WhatsAppFab />
        <BackToTop />
      </body>
    </html>
  );
}
