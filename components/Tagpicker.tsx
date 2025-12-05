"use client";

type Props = {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
};

export default function TagPicker({ options, value, onChange }: Props) {
  const toggle = (tag: string) => {
    if (value.includes(tag)) onChange(value.filter((t) => t !== tag));
    else onChange([...value, tag]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => {
        const active = value.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={`px-3 py-1 rounded-2xl text-sm border transition-colors
              ${
                active
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "bg-[var(--surface)] border-[color:var(--border)] hover:bg-[var(--accent)] hover:text-white"
              }
            `}
            aria-pressed={active}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
