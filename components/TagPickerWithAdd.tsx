"use client";

import React, { useState, type KeyboardEvent, useMemo } from "react";

type Props = {
  options: string[];                 // base options shown as toggleable chips
  value: string[];                   // currently selected tags (includes customs)
  onChange: (next: string[]) => void;
  label?: string;
  placeholder?: string;
};

export default function TagPickerWithAdd({
  options,
  value,
  onChange,
  label,
  placeholder,
}: Props) {
  const [draft, setDraft] = useState<string>("");

  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

  // Any selected tags that are NOT in the base options are "custom" tags
  const customSelected = useMemo(
    () => value.filter((tag) => !options.includes(tag)),
    [value, options]
  );

  // Render list = base options + any custom selected tags
  const allRenderTags = useMemo(
    () => [...options, ...customSelected],
    [options, customSelected]
  );

  const toggle = (tag: string) => {
    if (value.includes(tag)) onChange(value.filter((t) => t !== tag));
    else onChange([...value, tag]);
  };

  // Add custom and AUTO-SELECT it (turn blue)
  const addCustom = () => {
    const raw = normalize(draft);
    if (!raw) return;

    // already selected? do nothing to avoid duplicates
    const existsSelected = value.some((t) => t.toLowerCase() === raw.toLowerCase());
    if (existsSelected) {
      setDraft("");
      return;
    }

    // Add to selected value so it shows as blue (active)
    onChange([...value, raw]);
    setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  };

  return (
    <div className="grid gap-3">
      {label && <label className="block text-sm">{label}</label>}

      {/* All tags (base + custom) as toggleable chips */}
      <div className="flex flex-wrap gap-2">
        {allRenderTags.map((tag) => {
          const active = value.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={`px-3 py-1 rounded-2xl text-sm border transition-colors ${
                active
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "bg-[var(--surface)] border-[color:var(--border)] hover:bg-[var(--accent)] hover:text-white"
              }`}
              aria-pressed={active}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Input + plus button to add custom field */}
      <div className="flex items-center gap-2">
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder ?? "Add your own field..."}
        />
        <button
          type="button"
          onClick={addCustom}
          className="btn"
          aria-label="Add field"
          title="Add field"
        >
          +
        </button>
      </div>
    </div>
  );
}
