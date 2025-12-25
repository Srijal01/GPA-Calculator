import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPA Calculator - Nepali Universities",
  description: "Calculate CGPA and SGPA for Nepali University grading system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
