import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: "Subhash Chandra Yadav | Civil Engineer",
  description: "Civil engineer specializing in site supervision, quality control, structural design, and safe construction delivery.",
  keywords: ["civil engineer", "site engineering", "quality control", "residential design", "Nepal civil engineer"],
  authors: [{ name: "Subhash Chandra Yadav" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: { canonical: "/" },
  icons: { icon: "/subhash-photo.jpeg", apple: "/subhash-photo.jpeg" },
  openGraph: { title: "Subhash Chandra Yadav | Civil Engineer", description: "Engineering precision from drawing board to site.", url: "/", siteName: "Subhash Chandra Yadav Portfolio", images: [{ url: "/subhash-photo.jpeg", width: 1200, height: 630, alt: "Subhash Chandra Yadav" }], type: "website" },
  twitter: { card: "summary_large_image", title: "Subhash Chandra Yadav | Civil Engineer", description: "Engineering precision from drawing board to site.", images: ["/subhash-photo.jpeg"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}><body>{children}</body></html>;
}
