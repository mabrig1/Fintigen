import type { Metadata } from "next";
import ReferralWorkstation from "@/components/referral/ReferralWorkstation";

export const metadata: Metadata = {
  title: "Referral Growth Workstation",
  description:
    "Your FINTIGEN promoter workspace with smart links, social copy, posters, video scripts, campaign planning, lead tracking, earnings modelling and referral analytics.",
};

export default function ReferralWorkstationPage() {
  return <ReferralWorkstation />;
}
