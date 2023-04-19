"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  categoryId?: number;
};

export default function SubNav({ categoryId }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    (async () => {
      if (categoryId) {
        const data = await fetch(
          `http://localhost:8000/api/categories/${categoryId}`
        ).then((res) => res.json());

        setCategory(data[0]);
      }
    })();
  }, [categoryId]);

  return (
    <nav aria-label="Дополнительная навигация">
      <style jsx>{`
        nav {
          margin: 5rem 0 1rem 0;
        }
        ul {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 10px;
          width: fit-content;
        }
        li {
          display: grid;
          grid-auto-flow: column;
          align-items: end;
          font-size: 16px;
          color: var(--main-gray);
          display: flex;
          align-items: flex-end;
          line-height: 1;
        }

        li svg {
          display: block;
          width: 14px;
          height: 14px;
        }
      `}</style>
      <ul>
        <li>
          <Link href="/">
            <span> Главная</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g id="Complete">
                <g id="F-Chevron">
                  <polyline
                    fill="none"
                    id="Right"
                    points="8.5 5 15.5 12 8.5 19"
                    stroke="var(--main-gray)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </g>
              </g>
            </svg>
          </Link>
        </li>

        {!!category && (
          <li>
            <Link href={`category/${category.id}`}>
              <span>{category.name}</span>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g id="Complete">
                  <g id="F-Chevron">
                    <polyline
                      fill="none"
                      id="Right"
                      points="8.5 5 15.5 12 8.5 19"
                      stroke="var(--main-gray)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </g>
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
