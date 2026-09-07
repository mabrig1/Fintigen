import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import AgenticCoachLauncher from "@/components/AgenticCoachLauncher";
import AccountLearningSync from "@/components/AccountLearningSync";
import PromoterReferralCapture from "@/components/PromoterReferralCapture";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  applicationName: brand.name,
  creator: brand.company,
  publisher: brand.company,
  title: {
    default: `${brand.domain} | Digital Skills & ICT Services`,
    template: `%s | ${brand.domain}`,
  },
  description:
    `${brand.domain}, a subsidiary of ${brand.company}, offers practical digital skills training and ICT business services. ${brand.credit}.`,
  openGraph: {
    siteName: brand.domain,
    type: "website",
    locale: "en_NG",
  },
};

const themeInitScript = `
try {
  const stored = localStorage.getItem("fintigen-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <PromoterReferralCapture />
        {children}
        <AccountLearningSync />
        <AgenticCoachLauncher />
      </body>
    </html>
  );
}
