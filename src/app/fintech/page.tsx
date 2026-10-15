import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Investment dashboard · Fictional demo",
  description:
    "An interactive investment dashboard with original fictional data, accessible charts, and a fixed September 2026 snapshot.",
};

export default function FintechPage() {
  return <Dashboard />;
}
