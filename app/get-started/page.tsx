"use client";

import React, { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import TagPickerWithAdd from "@/components/TagPickerWithAdd";
import KeywordsInput from "@/components/Keywordsinput";

const FIELDS: string[] = [
  "Machine Learning",
  "Human Factors",
  "Bioinformatics",
  "Law",
  "Biology",
  "Healthcare",
  "Health Sciences",
  "Chemistry",
  "Molecular Science",
  "Biomedicine",
];

const LEVELS: string[] = ["Undergraduated", "Masters", "PHD", "Post-Graduated", "Alumni"];
const PAID: string[] = ["Paid", "Unpaid", "Enter Estimated Pay Range"];
const LOCATION: string[] = ["Remote", "Onsite", "Hybrid"];
const HOURS: string[] = ["<5", "5-10", "10-15", "15-20", "20+"];

export default function GetStartedPage() {
  const router = useRouter();

  const [college, setCollege] = useState<string>("");
  const [fields, setFields] = useState<string[]>([]);
  const [level, setLevel] = useState<string>("");
  const [paid, setPaid] = useState<string>("Either");
  const [location, setLocation] = useState<string>("Remote");
  const [hours, setHours] = useState<string>("5-10");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (college) params.set("college", college);
    if (fields.length) params.set("fields", fields.join(","));
    if (level) params.set("level", level);
    if (paid) params.set("paid", paid);
    if (location) params.set("location", location);
    if (hours) params.set("hours", hours);
    if (keywords.length) params.set("keywords", keywords.join(","));
    if (comment.trim()) params.set("note", comment.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold">Get started</h1>
        <p className="mt-2 text-[color:var(--muted)]">
          Tell us what you are looking for. We will use this to find good matches.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-5">
          <div>
            <label className="block text-sm mb-2">College or University</label>
            <input
              className="input"
              placeholder="Penn State, Purdue, Virginia Tech"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Fields of interest</label>
            <TagPickerWithAdd
              options={FIELDS}
              value={fields}
              onChange={setFields}
              placeholder="Add your own research field..."
            />
            <p className="mt-2 text-xs text-[color:var(--muted)]">
              Select existing fields or click + to add your own.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm mb-2">Research level</label>
              <select
                className="input"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Select level</option>
                {LEVELS.map((lv) => (
                  <option key={lv} value={lv}>
                    {lv}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Compensation</label>
              <select
                className="input"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
              >
                {PAID.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Location</label>
              <select
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {LOCATION.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-2">Availability per week</label>
              <select
                className="input"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Keywords</label>
              <KeywordsInput
                value={keywords}
                onChange={setKeywords}
                placeholder="Lab work, Mathematics, etc"
              />
              <p className="mt-2 text-xs text-[color:var(--muted)]">
                Press Enter to add each one.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Notes for matching</label>
            <textarea
              className="input"
              rows={4}
              placeholder="Share constraints, labs, shifts, or goals."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button className="btn w-full" type="submit">
            Find matches
          </button>
        </form>
      </section>
    </main>
  );
}
