import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "WeddingHub - Platform Wedding Kalimantan",
    template: "%s | WeddingHub",
  },
  description:
    "Temukan vendor wedding terbaik di Kalimantan. Venue, katering, MUA, dekorasi, dan banyak lagi. Hubungi langsung via WhatsApp!",
  keywords: [
    "wedding",
    "vendor wedding",
    "pernikahan",
    "Kalimantan",
    "Banjarmasin",
    "Samarinda",
    "Pontianak",
  ],
  authors: [{ name: "WeddingHub" }],
  creator: "WeddingHub",
  publisher: "WeddingHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "WeddingHub",
    title: "WeddingHub - Platform Wedding Kalimantan",
    description:
      "Temukan vendor wedding terbaik di Kalimantan. Hubungi langsung via WhatsApp!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WeddingHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}