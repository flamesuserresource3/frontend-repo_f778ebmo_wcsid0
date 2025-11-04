import { useMemo, useState } from "react";
import { Search, Filter, ArrowRight } from "lucide-react";

const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "LinkedIn",
    location: "Remote • US",
    tags: ["React", "TypeScript", "Accessibility"],
    match: 92,
  },
  {
    id: 2,
    title: "Data Scientist, NLP",
    company: "Indeed",
    location: "Austin, TX",
    tags: ["Python", "NLP", "HuggingFace"],
    match: 88,
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Seek (AU)",
    location: "Sydney, AU",
    tags: ["AWS", "Kubernetes", "Terraform"],
    match: 84,
  },
  {
    id: 4,
    title: "Full‑stack Developer",
    company: "Naukri (IN)",
    location: "Bengaluru, IN",
    tags: ["Node.js", "MongoDB", "Next.js"],
    match: 90,
  },
  {
    id: 5,
    title: "AI Product Manager",
    company: "Glassdoor",
    location: "San Francisco, CA",
    tags: ["Product", "AI", "Strategy"],
    match: 86,
  },
];

const TAGS = [
  "Remote",
  "React",
  "Python",
  "AI",
  "AWS",
  "NLP",
  "Kubernetes",
  "Product",
];

export default function AggregationDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(["Remote"]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return JOBS.filter((j) => {
      const matchesQuery =
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      const matchesTags = selected.every((t) =>
        [j.location, ...j.tags].join(" ").toLowerCase().includes(t.toLowerCase())
      );
      return matchesQuery && matchesTags;
    }).sort((a, b) => b.match - a.match);
  }, [query, selected]);

  return (
    <section id="explore" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <label className="sr-only" htmlFor="query">Search</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search roles, companies, or locations…"
                    className="w-full rounded-lg border border-slate-300 bg-white px-10 py-3 text-sm outline-none ring-indigo-300 placeholder:text-slate-400 focus:border-indigo-400 focus:ring"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
                  <Filter size={16} /> Filters
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((t) => {
                const active = selected.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setSelected((prev) =>
                        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                      )
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                        : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 divide-y divide-slate-200">
              {filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-500">No results. Try a different query or tag.</p>
              )}
              {filtered.map((job) => (
                <article key={job.id} className="py-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-600">{job.company} • {job.location}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.tags.map((tg) => (
                          <span key={tg} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                        {job.match}% match
                      </span>
                      <button className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        View details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p id="how" className="mt-4 text-center text-xs text-slate-500">
            Demo data shown for illustration. Real app connects securely to partner APIs.
          </p>
        </div>
      </div>
    </section>
  );
}
