import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: profile.siteUrl ? new URL(profile.siteUrl) : undefined,
  title: {
    default: "Sree Manikanta — Product-focused software engineer",
    template: "%s | Sree Manikanta",
  },
  description:
    "Senior Frontend Engineer / Full-Stack Developer in Singapore. Explore 9+ years of experience, engineering case studies, and interactive fintech demos.",
  openGraph: {
    title: "Sree Manikanta — Product-focused software engineer",
    description:
      "Thoughtful fintech products. Maintainable software. Explore my experience and interactive product demos.",
    type: "website",
    locale: "en_SG",
    siteName: "Sree Manikanta",
  },
  twitter: {
    card: "summary",
    title: "Sree Manikanta — Software Engineer",
    description: "Fintech, frontend systems, and full-stack development.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <footer className="site-footer shell">
          <Link href="/" className="brand-mark">
            sm<span>.</span>
          </Link>
          <p>Thoughtful products. Considered engineering.</p>
          <p>© Sree Manikanta · Singapore</p>
        </footer>
      </body>
    </html>
  );
}
