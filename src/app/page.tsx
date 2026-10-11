import Link from "next/link";
import { LinkedInLink, ResumeLink } from "@/components/profile-links";
import { ProjectCard } from "@/components/project-card";
import { profile } from "@/data/profile";
import { experience, skills, workflow } from "@/data/experience";
import { projects } from "@/data/projects";

function DashboardPreview() {
  return (
    <div className="hero-preview">
      <div className="preview-header">
        <span className="text-sm font-semibold">Portfolio overview</span>
        <span className="tag">PRODUCT DEMO</span>
      </div>
      <p className="eyebrow">A clearer picture of your investments</p>
      <p className="preview-value">See the whole portfolio.</p>
      <p className="accent text-xs">Performance. Allocation. Every holding.</p>
      <svg
        className="preview-chart"
        viewBox="0 0 400 140"
        role="img"
        aria-label="Illustrative portfolio chart. Explore the demo for fictional values and accessible data."
      >
        <defs>
          <linearGradient id="preview-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9fe4c5" stopOpacity=".24" />
            <stop offset="100%" stopColor="#9fe4c5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 35H400M0 75H400M0 115H400"
          stroke="#2a383f"
          strokeDasharray="3 5"
        />
        <path
          d="M0 110 L25 98 L55 105 L85 85 L115 88 L145 67 L170 75 L205 48 L240 59 L275 33 L300 42 L340 20 L370 29 L400 10 L400 140 L0 140Z"
          fill="url(#preview-fill)"
        />
        <path
          d="M0 110 L25 98 L55 105 L85 85 L115 88 L145 67 L170 75 L205 48 L240 59 L275 33 L300 42 L340 20 L370 29 L400 10"
          fill="none"
          stroke="#9fe4c5"
          strokeWidth="2"
        />
      </svg>
      <div className="preview-holding">
        <span>Holdings explorer</span>
        <span className="muted">Search & filter</span>
      </div>
      <div className="preview-holding">
        <span>Financial formatting</span>
        <span className="muted">Locale-aware</span>
      </div>
      <div className="preview-caption">
        <span className="muted text-xs">
          Illustrative preview · fictional data
        </span>
        <Link href="/fintech" className="accent text-xs">
          Open demo ↗
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="shell hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">
            <span className="status-dot" />
            Sree Manikanta / Singapore
          </p>
          <h1 id="hero-title">
            Thoughtful fintech.
            <br />
            Considered <span className="accent">engineering.</span>
          </h1>
          <p className="text-sm mb-4">{profile.title}</p>
          <p className="muted intro">
            Building user-focused fintech products and maintainable software. 9+
            years of software development experience, bringing frontend
            ownership and full-stack capabilities to customer-facing products.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="button button-primary">
              Explore My Work <span aria-hidden="true">↗</span>
            </Link>
            <ResumeLink />
          </div>
          <div className="hero-tech">
            <span>Vue.js</span>
            <span>React.js</span>
            <span>JavaScript</span>
            <span>PHP / Laravel</span>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="muted text-xs inline-block mt-6 hover:text-accent"
          >
            Let’s talk about your next product ↗
          </a>
        </div>
        <DashboardPreview />
      </section>
      <div className="shell">
        <div className="credentials">
          <div>
            <strong>9+ years</strong>
            <p>Software development experience</p>
          </div>
          <div>
            <strong>Product first</strong>
            <p>Fintech & customer-facing software</p>
          </div>
          <div>
            <strong>Frontend → full-stack</strong>
            <p>Vue.js, React.js & PHP</p>
          </div>
          <div>
            <strong>Singapore</strong>
            <p>Based in a global fintech hub</p>
          </div>
        </div>
      </div>
      <section id="about" className="section shell">
        <div className="about-grid">
          <div>
            <div className="initials" aria-label="Sree Manikanta initials">
              SM
            </div>
            <p className="eyebrow">01 / About</p>
            <h2 className="mt-4">
              Software with
              <br />a product perspective.
            </h2>
          </div>
          <div>
            <p className="muted text-lg">
              My work sits where product requirements meet frontend systems. I
              build interfaces that make useful software understandable,
              reusable, and maintainable.
            </p>
            <p className="muted mt-5">
              At Hatcher, I joined a predominantly backend-focused team as its
              sole frontend developer. I established frontend architecture and
              implementation practices, progressed to Senior Frontend Engineer,
              and expanded into full-stack development using Vue.js and PHP.
            </p>
            <p className="muted mt-5">
              I collaborate with Product Managers and Subject Matter Experts on
              customer-facing fintech features—from data-heavy portfolio
              interfaces and application modernization to localization and
              privacy-related functionality.
            </p>
            <div className="principles">
              <div>
                <span className="accent text-xs">01</span>
                <h3>Start with the user</h3>
                <p className="muted">
                  Translate product requirements into useful application
                  functionality.
                </p>
              </div>
              <div>
                <span className="accent text-xs">02</span>
                <h3>Build a shared foundation</h3>
                <p className="muted">
                  Reusable components and established patterns support
                  consistent delivery.
                </p>
              </div>
              <div>
                <span className="accent text-xs">03</span>
                <h3>Modernize thoughtfully</h3>
                <p className="muted">
                  Improve existing software without losing its product context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="experience" className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Professional journey</p>
            <h2>Experience that compounds.</h2>
          </div>
          <p className="muted text-sm">
            Frontend foundations, customer-facing fintech, and a growing
            full-stack perspective.
          </p>
        </div>
        {experience.map((role) => (
          <article key={role.company} className="timeline-item">
            <div>
              <p className="eyebrow">{role.dates}</p>
              {role.location && (
                <p className="muted text-xs mt-2">{role.location}</p>
              )}
              <p className="accent text-sm mt-4">{role.company}</p>
            </div>
            <div>
              <h3>{role.title}</h3>
              <p className="muted text-sm">{role.summary}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {role.technologies.map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
              <details>
                <summary>Explore contributions at {role.company}</summary>
                <ul className="contribution-list">
                  {role.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
              </details>
            </div>
          </article>
        ))}
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Selected work</p>
            <h2>Engineering, in context.</h2>
          </div>
          <Link href="/projects" className="button button-secondary">
            All case studies ↗
          </Link>
        </div>
        <div className="project-grid">
          {[projects[0], projects[2], projects[5]].map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / Interactive demonstrations</p>
            <h2>Don’t just read. Explore.</h2>
          </div>
          <p className="muted text-sm">
            Original React & TypeScript implementations demonstrating
            transferable engineering skills.
          </p>
        </div>
        <div className="lab-grid">
          <Link href="/fintech" className="project-card">
            <span className="eyebrow">Product showcase / 01</span>
            <h3>Investment dashboard ↗</h3>
            <p className="muted">
              Explore fictional portfolio performance, allocation, holdings,
              transactions, and financial formatting in a working product
              interface.
            </p>
            <span className="accent text-xs mt-6">Launch Fintech Demo →</span>
          </Link>
          <Link href="/lab" className="project-card">
            <span className="eyebrow">Frontend systems / 02</span>
            <h3>Component & localization lab ↗</h3>
            <p className="muted">
              Interact with reusable components, validation, locale-aware
              formatting, and realistic feedback states.
            </p>
            <span className="accent text-xs mt-6">Open Component Lab →</span>
          </Link>
        </div>
        <p className="muted text-xs mt-6">
          Demonstrations use fictional local data. They do not reproduce
          employer systems or connect to financial accounts.
        </p>
      </section>
      <section id="engineering" className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / Engineering approach</p>
            <h2>
              Good tools. Clear guardrails.
              <br />
              Human judgment.
            </h2>
          </div>
          <p className="muted text-sm">
            AI assistance supports my broader engineering practice. It does not
            replace product understanding, maintainability, or review.
          </p>
        </div>
        <p className="muted max-w-3xl">
          I use Claude Code with repository-specific coding rules to keep
          generated implementation aligned with existing architecture, reusable
          components, and product patterns. My GitHub frontend PR review
          workflow checks standards, common mistakes, syntax, builds, and
          required QA test IDs.
        </p>
        <ol
          className="workflow"
          aria-label="Illustrative AI-assisted engineering workflow"
        >
          {workflow.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p className="muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="panel flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3>Sample review checklist</h3>
            <p className="muted text-sm mt-3">
              An illustrative checklist—not a copy of confidential production
              configuration. Automated checks support engineering review rather
              than guarantee error-free code.
            </p>
          </div>
          <ul className="muted text-sm space-y-2 list-disc pl-5">
            <li>Requirements and established product patterns respected</li>
            <li>Existing reusable components considered</li>
            <li>Syntax, standards, and common mistakes checked</li>
            <li>Build and required QA test IDs verified</li>
            <li>Changes reviewed and findings addressed</li>
          </ul>
        </div>
      </section>
      <section id="skills" className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">06 / Toolkit</p>
            <h2>
              Depth in the fundamentals.
              <br />
              Range in the implementation.
            </h2>
          </div>
          <p className="muted text-sm">
            Professional technologies and practices, organized by how they
            contribute to product development.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="panel" key={group.category}>
              <h3>{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="panel mt-6">
          <p className="eyebrow">Demonstrated in this portfolio</p>
          <p className="muted text-sm mt-3">
            Next.js App Router · React · strict TypeScript · Tailwind CSS ·
            Recharts · Playwright
          </p>
          <p className="muted text-xs mt-2">
            This new implementation demonstrates these tools; it does not imply
            extensive production experience with Next.js.
          </p>
        </div>
      </section>
      <section id="contact" className="shell py-16">
        <div className="contact">
          <div>
            <p className="eyebrow">07 / Let’s connect</p>
            <h2>
              Have a thoughtful product
              <br />
              to build?
            </h2>
            <p className="muted text-sm">
              Let’s discuss frontend, full-stack, and product engineering
              opportunities.
            </p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="accent">
              {profile.email} ↗
            </a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>
              {profile.phone}
            </a>
            <LinkedInLink />
            <ResumeLink />
          </div>
        </div>
      </section>
    </>
  );
}
