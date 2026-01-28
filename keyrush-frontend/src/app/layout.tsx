import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import localFont from "next/font/local"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const msSansSerif = localFont({
  src: "./fonts/ms-sans-serif.otf",
  variable: "--font-ms-sans",
  display: "swap",
})

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
    <html lang="en" className={msSansSerif.variable}>
      <body className={`${msSansSerif.className} min-h-screen bg-[#008080]`}>
        <header>
        <nav className="flex items-center justify-center py-4 text-black gap-24">
          
          <Link 
          className=" inline-flex items-center justify-center
      px-6 py-1
      bg-[#C0C0C0] text-black text-30px
      border-t-2 border-l-2 border-t-white border-l-white
      border-b-2 border-r-2 border-[#808080]
      shadow-[1px_1px_0_#000]
      select-none
      active:border-t-2 active:border-l-2 active:border-t-[#808080] active:border-l-[#808080]
      active:border-b-2 active:border-r-2 active:border-b-white active:border-r-white
      active:shadow-none
      active:translate-x-px active:translate-y-px" 
          href="/">Home</Link>
          <Link
          className=" inline-flex items-center justify-center
      px-6 py-1
      bg-[#C0C0C0] text-black text-30px
      border-t-2 border-l-2 border-t-white border-l-white
      border-b-2 border-r-2 border-[#808080]
      shadow-[1px_1px_0_#000]
      select-none
      active:border-t-2 active:border-l-2 active:border-t-[#808080] active:border-l-[#808080]
      active:border-b-2 active:border-r-2 active:border-b-white active:border-r-white
      active:shadow-none
      active:translate-x-px active:translate-y-px
          " href="/leaderboard">Leaderboard</Link>
    

          
         
        </nav>
        </header>
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}
