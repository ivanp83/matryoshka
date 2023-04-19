"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="layout">
      <style jsx>{`
        .layout {
          width: 80rem;
          margin: 0 auto;
          margin-top: var(--space-med);
          padding: 0 20px var(--space-med);
        }
        @media all and (max-width: 1024px) {
          .layout {
            width: 100%;
          }
        }
      `}</style>

      {children}
    </article>
  );
}
