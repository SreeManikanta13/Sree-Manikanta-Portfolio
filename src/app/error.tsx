"use client";

import { Button } from "@/components/ui";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="shell py-24">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="my-6">Let’s try that again.</h1>
      <p className="muted mb-8">
        This page could not be displayed. No financial action has been
        performed.
      </p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
