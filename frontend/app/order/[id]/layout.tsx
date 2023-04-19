"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="layout">
      <style jsx>{`
        .layout {
          margin-top: var(--space-med);
          padding: 0 20px;
          margin: var(--space-big) auto 0;
          max-width: 400px;
          width: auto;
        }
      `}</style>

      {children}
    </article>
  );
}
