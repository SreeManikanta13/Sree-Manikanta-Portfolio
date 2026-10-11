import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";

export const metadata: Metadata = {
  title: "Projects & engineering case studies",
  description:
    "Verified engineering contributions, modernization, reusable frontend systems, and original product demonstrations.",
};

export default function ProjectsPage() {
  return (
    <div className="shell pb-20">
      <div className="page-heading">
        <p className="eyebrow">Selected work / Engineering in context</p>
        <h1>Beyond the interface.</h1>
        <p className="muted">
          The context, decisions, and contributions behind my work. Professional
          experience is kept separate from newly created, fictional
          demonstrations.
        </p>
      </div>
      <ProjectExplorer />
    </div>
  );
}
