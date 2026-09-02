import type { Metadata } from "next";
import AgenticCoachLauncher from "@/components/AgenticCoachLauncher";
import AccountLearningSync from "@/components/AccountLearningSync";
import PromoterReferralCapture from "@/components/PromoterReferralCapture";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FINTIGEN Academy – Building Africa's Digital Future",
    template: "%s | FINTIGEN Academy",
  },
  description:
    "Master digital skills, technology, and innovation from anywhere in the world. Learn from experts, earn certificates, and launch your tech career with FINTIGEN Academy.",
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
