import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebCraft Studio — Creative Web Developer",
  description: "Crafting immersive digital experiences. From 3D interactive worlds to sleek modern web apps.",
  openGraph: {
    title: "WebCraft Studio",
    description: "Creative web developer portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
