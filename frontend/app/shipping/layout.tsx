"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="layout">
      <style jsx>{`
        .layout {
          margin-top: var(--space-med);
          padding: 0 20px;
          margin: var(--space-big) auto var(--space-med);
          max-width: 400px;
        }
      `}</style>

      {children}
    </article>
  );
}
