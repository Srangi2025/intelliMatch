"use client";

import React, { useState, type KeyboardEvent } from "react";

type KeywordsInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export default function KeywordsInput({
  value,
  onChange,
  placeholder,
}: KeywordsInputProps) {
  const [draft, setDraft] = useState<string>("");

  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

  const add = () => {
    const raw = normalize(draft);
    if (!raw) return;
    const exists = value.some((v) => v.toLowerCase() === raw.toLowerCase());
    if (!exists) onChange([...value, raw]);
    setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    }
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl text-sm border border-[color:var(--border)] bg-[var(--surface)]"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              aria-label={`Remove ${tag}`}
              className="rounded-full px-2 leading-none border border-[color:var(--border)] hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder ?? "Type a keyword, then press Enter or +"}
        />
        <button type="button" onClick={add} className="btn" aria-label="Add keyword">
          +
        </button>
      </div>
    </div>
  );
}
