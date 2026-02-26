import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import localFont from "next/font/local";

const msSansSerif = localFont({
  src: "./fonts/ms-sans-serif.otf",
  variable: "--font-ms-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KeyRush",
  description: "Improve typing speed and accuracy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const linkClasses =
    "inline-flex items-center justify-center " +
    "px-4 sm:px-6 py-1 " +
    "bg-[#C0C0C0] text-black text-xl sm:text-2xl 3xl:text-5xl " +
    "border-t-2 border-l-2 border-t-white border-l-white " +
    "border-b-2 border-r-2 border-[#808080] " +
    "shadow-[1px_1px_0_#000] " +
    "select-none " +
    "active:border-t-2 active:border-l-2 active:border-t-[#808080] active:border-l-[#808080] " +
    "active:border-b-2 active:border-r-2 active:border-b-white active:border-r-white " +
    "active:shadow-none " +
    "active:translate-x-px active:translate-y-px " +
    "cursor-pointer " +
    "hover:brightness-[1.03] " +
    "hover:shadow-[1px_1px_0_#000,inset_1px_1px_0_#fff] " +
    "hover:underline";

  return (
    <html lang="en" className={msSansSerif.variable}>
      <body className={`${msSansSerif.className} min-h-screen bg-[#008080]`}>
        <header className="w-full">
          <nav className="mx-auto max-w-5xl px-4 sm:px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10">
              <Link className={linkClasses} href="/">
                Home
              </Link>
              <Link className={linkClasses} href="/leaderboard">
                Leaderboard
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}