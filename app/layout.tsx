import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import MusicPlayer from "@/components/MusicPlayer";
import ScrollToTop from "@/components/ScrollToTop";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarvesh Sajan Pottangadi — Racing Driver",
  description: "Professional DD2 karting driver. Team CRG. Abu Dhabi, U.A.E. 2nd in DD2 Abu Dhabi Sports Council Championship 2024–2025.",
  keywords: ["karting", "DD2", "CRG", "racing driver", "Abu Dhabi", "UAE", "Sarvesh Sajan"],
  openGraph: {
    title: "Sarvesh Sajan Pottangadi — Racing Driver",
    description: "Professional DD2 karting driver. Team CRG. Abu Dhabi, U.A.E.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <BackgroundCanvas />
        <ScrollToTop />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
