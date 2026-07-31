import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Navbar } from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EDNO | Premium Luxury Real Estate Registry",
  description: "EDNO curates the world's most significant architectural landmarks and residential sanctuaries for discerning portfolios.",
  keywords: ["luxury real estate", "premium properties", "malibu villas", "aspen mansions", "penthouses", "architectural registry"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "EDNO | Premium Luxury Real Estate Registry",
    description: "EDNO curates the world's most significant architectural landmarks and residential sanctuaries.",
    type: "website",
    locale: "en_US",
    url: "https://edno.luxury",
    siteName: "EDNO Luxury",
  },
  twitter: {
    card: "summary_large_image",
    title: "EDNO | Premium Luxury Real Estate Registry",
    description: "EDNO curates the world's most significant architectural landmarks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0B1120] text-zinc-900 dark:text-zinc-50 font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
