"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { EmptyState } from "./ui";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Modernization",
  "Frontend systems",
  "Fintech",
  "Engineering",
];

export function ProjectExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const visible = projects.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      `${project.title} ${project.summary} ${project.technologies.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="demo-toolbar">
        <div className="segmented" aria-label="Project categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="field">
          Search projects
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, topic, or technology"
          />
        </label>
      </div>
      <p role="status" className="muted text-xs mb-5">
        {visible.length} case {visible.length === 1 ? "study" : "studies"}
      </p>
      {visible.length ? (
        <div className="project-grid">
          {visible.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      ) : (
        <EmptyState title="No matching case studies">
          Try a different topic or select All.
        </EmptyState>
      )}
    </>
  );
}
