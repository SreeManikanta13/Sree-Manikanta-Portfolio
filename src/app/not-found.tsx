import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24">
      <p className="eyebrow">404 / Not found</p>
      <h1 className="my-6">A page not in the portfolio.</h1>
      <p className="muted mb-8">
        That destination isn’t available. Explore the projects or return home.
      </p>
      <Link href="/" className="button button-primary">
        Back to home
      </Link>
    </div>
  );
}
