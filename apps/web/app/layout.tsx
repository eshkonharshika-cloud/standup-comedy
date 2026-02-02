import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // explicit font-display
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://standup-comedy-web-m2g6.vercel.app/"),
  title: {
    default: "Standup Comedy Platform | Comedians, Shows & Tours",
    template: "%s | Standup Comedy",
  },
  description:
    "Discover standup comedians, live comedy shows, tours, and exclusive performances.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link rel="preconnect" href="https://www.youtube.com" />
      </Head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Structured Data */}
        <Script
          id="schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Standup Comedy Platform",
              url: "https://standup-comedy-web-m2g6.vercel.app/",
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
