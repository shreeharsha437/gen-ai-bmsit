import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Major_Mono_Display, Press_Start_2P } from "next/font/google";
import "./globals.css";

// Load fonts with Next.js optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pixel-style fonts
const majorMono = Major_Mono_Display({
  weight: "400",
  variable: "--font-major-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start-2p",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brinhack",
  description:
    "Brinhack 2025: Innovate Beyond Boundaries! Join the 24-hour hackathon.",
  icons: {
    icon: "./favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* --- Load Fonts --- */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Add Bytesized font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${majorMono.variable} 
          ${pressStart2P.variable}
          antialiased
          relative
          bg-black
        `}
      >
        {/* Main content that scrolls normally */}
        {children}
      </body>
    </html>
  );
}
