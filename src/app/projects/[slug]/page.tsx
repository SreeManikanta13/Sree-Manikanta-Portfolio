import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  return {
    title: project?.title ?? "Case study not found",
    description: project?.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const sections = [
    ["Context / problem", project.context],
    ["My role", project.role],
    ["Technical approach", project.approach],
    ["Implementation decisions", project.decisions],
    ["Challenges & trade-offs", project.tradeoffs],
    ["Verified contribution / lessons", project.outcome],
  ];
  return (
    <article className="shell pb-20">
      <div className="page-heading">
        <Link href="/projects" className="accent text-xs">
          ← All case studies
        </Link>
        <p className="eyebrow mt-8">{project.category} / Case study</p>
        <h1>{project.title}</h1>
        <p className="muted">{project.summary}</p>
      </div>
      {project.pending && (
        <div className="demo-banner">
          Specific professional details are awaiting verification. Demo
          functionality is not evidence of production responsibilities.
        </div>
      )}
      <div className="case-layout">
        <div className="case-content">
          {sections.map(([heading, body]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
        <aside className="panel case-aside">
          <p className="eyebrow">Technologies</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((technology) => (
              <span className="tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
          {project.demo && (
            <>
              <p className="eyebrow mt-8 mb-4">Related demonstration</p>
              <Link
                href={project.demo.href}
                className="button button-secondary"
              >
                {project.demo.label} ↗
              </Link>
            </>
          )}
          <p className="muted text-xs mt-8">
            No confidential code, customer data, or unverified metrics are
            published.
          </p>
        </aside>
      </div>
    </article>
  );
}
