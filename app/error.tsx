"use client";

import { useEffect } from "react";
import { business } from "@/src/content/site-content";

interface ErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center bg-brand-surface px-6 text-brand-text-primary">
      <main className="mx-auto max-w-2xl">
        <p className="brand-subtitle">Temporary interruption</p>
        <h1 className="brand-heading mt-3 text-4xl font-semibold text-brand-black sm:text-5xl">
          We hit a small bump on the way to the bar.
        </h1>
        <p className="mt-5 text-lg leading-8 text-brand-text-muted">
          Please try again. If the problem continues, contact Ambu Bar directly and we will help you from there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="brand-button" onClick={unstable_retry}>
            Try Again
          </button>
          <a href={business.emailHref} className="brand-button brand-button--secondary">
            Email Ambu Bar
          </a>
        </div>
      </main>
    </div>
  );
}
