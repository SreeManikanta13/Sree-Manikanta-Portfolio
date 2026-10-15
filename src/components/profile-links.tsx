import { profile } from "@/data/profile";

export function ResumeLink({
  className = "button button-secondary",
}: {
  className?: string;
}) {
  return profile.resumePath ? (
    <a
      className={className}
      href={profile.resumePath}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Resume ↗
    </a>
  ) : (
    <span
      className={`${className} unavailable`}
      aria-disabled="true"
      title="Resume PDF has not been supplied"
    >
      View Resume · coming soon
    </span>
  );
}

export function LinkedInLink() {
  return profile.linkedInUrl ? (
    <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer">
      LinkedIn ↗
    </a>
  ) : (
    <span className="muted">LinkedIn · awaiting profile URL</span>
  );
}
