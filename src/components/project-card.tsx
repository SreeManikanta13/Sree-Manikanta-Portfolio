import Link from "next/link";
import type { CaseStudy } from "@/data/projects";

export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{project.category}</span>
        <span className="muted" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="project-art mt-5" aria-hidden="true">
        {project.illustration}
      </div>
      <h3>{project.title}</h3>
      <p className="muted flex-1">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((technology) => (
          <span className="tag" key={technology}>
            {technology}
          </span>
        ))}
      </div>
      {project.pending && (
        <p className="accent mt-4 text-xs">
          Professional details pending verification
        </p>
      )}
      <span className="mt-6 text-xs accent">Read case study →</span>
    </Link>
  );
}
