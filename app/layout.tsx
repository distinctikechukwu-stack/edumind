import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "EduMind AI – Learn Smarter. Prepare Better. Achieve More.",
  description: "Intelligent academic companion for Nigerian students preparing for WAEC, NECO & JAMB. AI Tutor, Snap & Solve, Quizzes, Analytics & more.",
  keywords: ["AI education", "WAEC", "JAMB", "NECO", "AI tutor", "Snap & Solve", "Nigeria education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
