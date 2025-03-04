import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Shop",
  description: "3D Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-stone-950">
      <body>{children}</body>
    </html>
  );
}
