"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = { tags: string[] };

export default function Tags({ tags }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("tag");

  const go = (tag: string) => {
    if (active === tag) router.push("/search");
    else router.push(`/search?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = active === tag;
        return (
          <button
            key={tag}
            onClick={() => go(tag)}
            className={`px-3 py-1 rounded-2xl text-sm border transition-colors
              ${
                isActive
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "bg-[var(--surface)] border-[color:var(--border)] hover:bg-[var(--accent)] hover:text-white"
              }
            `}
            aria-pressed={isActive}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
