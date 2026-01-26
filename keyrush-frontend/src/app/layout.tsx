import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "KeyRush",
  description: "Improve typing speed and accuracy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
        <nav className="flex items-center justify-center py-4 gap-24">
          
          <Link href="/">Home</Link>
          <Link href="/leaderboard">Leaderboard</Link>
         
        </nav>
        </header>
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}
