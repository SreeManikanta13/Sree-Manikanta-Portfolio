import type { Metadata } from "next";
import ComponentLab from "@/components/lab/ComponentLab";

export const metadata: Metadata = {
  title: "Component Lab",
  description:
    "A newly created, interactive UI playground with fictional transactions, accessible forms, and local-only bulk entry.",
};

export default function LabPage() {
  return <ComponentLab />;
}
