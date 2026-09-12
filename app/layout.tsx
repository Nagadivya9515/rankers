import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://rankerspro.com";
const SITE_NAME = "RankersPro";
const DEFAULT_DESCRIPTION =
  "RankersPro is a results-driven GATE, ESE, PSU and state AE/JE coaching platform led by master mentors with 22+ years of combined experience and 1,00,000+ students mentored.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RankersPro — GATE, ESE & State AE/JE Coaching",
    template: "%s | RankersPro",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "RankersPro — GATE, ESE & State AE/JE Coaching",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankersPro — GATE, ESE & State AE/JE Coaching",
    description: DEFAULT_DESCRIPTION,
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
