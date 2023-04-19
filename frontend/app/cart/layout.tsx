"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="layout">
      <style jsx>{`
        .layout {
          padding: 0 20px;
          margin: var(--space-big) auto var(--space-med);
          max-width: 400px;
          width: auto;
        }
      `}</style>

      {children}
    </article>
  );
}
