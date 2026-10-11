export type ProjectCategory =
  "Modernization" | "Frontend systems" | "Fintech" | "Engineering";
export type CaseStudy = {
  slug: string;
  title: string;
  category: ProjectCategory;
  illustration: string;
  summary: string;
  context: string;
  role: string;
  approach: string;
  decisions: string;
  tradeoffs: string;
  outcome: string;
  technologies: string[];
  demo?: { href: string; label: string };
  pending?: boolean;
};

export const projects: CaseStudy[] = [
  {
    slug: "vue-migration",
    title: "Modernizing FAAST: Vue 2 → Vue 3",
    category: "Modernization",
    illustration: "Vue 2  →  Vue 3",
    summary: "End-to-end ownership of a production application migration.",
    context:
      "FAAST was an existing fintech application built with Vue 2. Modernizing its frontend required working within an established product rather than starting from a blank canvas.",
    role: "I led the end-to-end migration of FAAST from Vue 2 to Vue 3 at Hatcher.",
    approach:
      "The contribution combined technical modernization with the broader frontend architecture and implementation practices I established at Hatcher. Exact migration mechanics are not published here.",
    decisions:
      "The public emphasis is on maintaining a coherent frontend system while moving the application to Vue 3. Production implementation details remain private.",
    tradeoffs:
      "Application modernization involves compatibility, existing product behavior, and maintainability considerations. Specific migration blockers and release sequencing have not been supplied.",
    outcome:
      "The verified contribution is ownership of the end-to-end Vue 2 to Vue 3 migration. No component counts, timings, or measured performance gains are claimed.",
    technologies: ["Vue 2", "Vue 3", "JavaScript"],
  },
  {
    slug: "frontend-architecture",
    title: "A frontend foundation for a backend-focused team",
    category: "Frontend systems",
    illustration: "tokens / UI / product",
    summary:
      "Architecture, reusable patterns, and practical implementation standards.",
    context:
      "I joined Hatcher as the sole frontend developer in a predominantly backend-focused team.",
    role: "I established frontend architecture, development standards, reusable component patterns, and implementation practices, and supported teammates with technical guidance.",
    approach:
      "My work included reusable UI, chart, and graph components, alongside product implementation with Product Managers and Subject Matter Experts.",
    decisions:
      "Reusable components and established product patterns provided a shared basis for frontend implementation. The Component Lab illustrates these ideas in a new React codebase.",
    tradeoffs:
      "Reusable foundations need to serve product delivery without becoming an unnecessary abstraction layer. The demo architecture is illustrative, not a reproduction of confidential production code.",
    outcome:
      "Established frontend architecture and reusable patterns while progressing into a broader senior engineering role.",
    technologies: ["Vue.js", "JavaScript", "SCSS", "PHP"],
    demo: { href: "/lab", label: "Explore shared components" },
  },
  {
    slug: "fintech-reporting",
    title: "Making portfolio data useful",
    category: "Fintech",
    illustration: "value ↗ / allocation",
    summary: "Reusable charts, graphs, and data-heavy portfolio interfaces.",
    context:
      "Customer-facing fintech products require useful interfaces for data-heavy portfolio information.",
    role: "At Hatcher, I built reusable UI, chart, and graph components and optimized portfolio pages.",
    approach:
      "I worked on customer-facing fintech features in collaboration with Product Managers and Subject Matter Experts, building reusable visual components.",
    decisions:
      "This portfolio pairs that experience with an original fictional investment dashboard. Its holdings, charts, and interactions were created for this demonstration.",
    tradeoffs:
      "Visual density must be balanced with readability and accessible alternatives. These are design considerations demonstrated here, not claims about unpublished production decisions.",
    outcome:
      "Contributed reusable visualization components and portfolio-page improvements. No measured performance or business impact is claimed.",
    technologies: ["Vue.js", "ApexCharts", "JavaScript", "PHP"],
    demo: { href: "/fintech", label: "Explore fictional investment dashboard" },
  },
  {
    slug: "localization",
    title: "One product, different languages and currencies",
    category: "Frontend systems",
    illustration: "1,234.56 ↔ 1.234,56",
    summary: "Internationalization and locale-aware financial formatting.",
    context:
      "Language and financial formatting needs were part of customer-facing product development at Hatcher.",
    role: "I implemented internationalization capabilities, language-specific SCSS, dynamic language discovery, and multi-currency number formatting.",
    approach:
      "The work covered language support, presentation styles, and number formatting. The new Component Lab uses the JavaScript Intl APIs to demonstrate locale-aware output.",
    decisions:
      "Formatting a nominal amount in a different currency is explicitly separated from exchange-rate conversion in this demonstration.",
    tradeoffs:
      "Locale differences affect separators, currency placement, dates, and display precision. Confidential production configuration is not included.",
    outcome:
      "Implemented the supplied internationalization and multi-currency formatting capabilities. The public demo demonstrates the concepts independently in React.",
    technologies: ["Vue.js", "Vue I18n", "SCSS", "JavaScript"],
    demo: { href: "/lab", label: "Try the localization playground" },
  },
  {
    slug: "transaction-workflows",
    title: "Transaction workflows & bulk operations",
    category: "Fintech",
    illustration: "validate → preview",
    summary:
      "An original workflow demonstration; professional specifics awaiting verification.",
    context:
      "The supplied profile establishes customer-facing fintech development, but does not verify specific transaction or bulk-operation responsibilities.",
    role: "No specific production ownership is claimed. The linked example is a newly built portfolio demonstration.",
    approach:
      "The Component Lab demonstrates a fictional transaction workflow with input validation and useful feedback, independent of any employer system.",
    decisions:
      "Demo inputs stay local. There is no real account connection, transaction processing, or confidential data.",
    tradeoffs:
      "Client-side validation improves feedback but is not a substitute for server-side controls in a real financial application.",
    outcome:
      "A functional illustrative workflow. Add verified professional implementation details before presenting this as an employment case study.",
    technologies: ["React (demo)", "TypeScript (demo)"],
    demo: { href: "/lab", label: "Try the fictional transaction workflow" },
    pending: true,
  },
  {
    slug: "ai-assisted-quality",
    title: "AI assistance, with engineering guardrails",
    category: "Engineering",
    illustration: "rules → checks → review",
    summary: "Claude Code guardrails and GitHub frontend PR quality checks.",
    context:
      "AI-generated implementation needs to align with existing architecture, reusable components, and established product patterns.",
    role: "I used Claude Code with coding rules and guardrails and created a GitHub-based frontend PR review workflow/agent.",
    approach:
      "The workflow checks coding standards, syntax issues, common mistakes, established patterns, build failures, and required QA test IDs.",
    decisions:
      "Explicit constraints help keep generated code aligned with existing implementation practices. The workflow shown here is illustrative, not the confidential production configuration.",
    tradeoffs:
      "Automation can help identify issues but does not guarantee error-free code. Engineering review remains necessary.",
    outcome:
      "Introduced repository-aware AI guardrails and automated frontend PR checks to support consistent implementation and review.",
    technologies: ["Claude Code", "GitHub", "Git", "Frontend PR checks"],
    demo: { href: "/#engineering", label: "View the illustrative workflow" },
  },
  {
    slug: "gdpr-dsar",
    title: "Translating DSAR requirements into functionality",
    category: "Engineering",
    illustration: "request → application",
    summary:
      "A key implementation role in privacy-related application functionality.",
    context:
      "GDPR Data Subject Access Request functionality needed to be introduced into the Hatcher codebase.",
    role: "I took a key implementation role in DSAR functionality.",
    approach:
      "The contribution focused on translating privacy and compliance requirements into application functionality. Sensitive implementation details are not disclosed.",
    decisions:
      "This case study describes the engineering contribution without publishing internal data flows or customer information.",
    tradeoffs:
      "Specific compliance decisions and implementation trade-offs have not been supplied. No legal or compliance guarantee is made.",
    outcome:
      "Contributed to introducing DSAR functionality into the codebase. This does not imply sole ownership or legal accountability.",
    technologies: ["Vue.js", "PHP"],
  },
  {
    slug: "customer-product",
    title: "Customer-facing product improvements & KYC",
    category: "Fintech",
    illustration: "needs → useful software",
    summary:
      "Verified product collaboration, with space for future KYC details.",
    context:
      "Hatcher product development involved customer-facing fintech features and collaboration with Product Managers and Subject Matter Experts.",
    role: "I developed customer-facing fintech features and expanded into broader full-stack work using Vue.js and PHP.",
    approach:
      "The verified emphasis is turning product requirements into application functionality and supporting frontend implementation across the team.",
    decisions:
      "KYC and onboarding implementation details have not been supplied. They are intentionally left open rather than inferred from the fintech domain.",
    tradeoffs:
      "Specific KYC responsibilities, data flows, and outcomes require verification before publication.",
    outcome:
      "Verified customer-facing product contributions. Detailed KYC and onboarding content remains pending.",
    technologies: ["Vue.js", "PHP", "JavaScript"],
    pending: true,
  },
];
