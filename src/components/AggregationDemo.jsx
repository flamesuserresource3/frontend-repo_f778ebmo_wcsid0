import { useEffect, useMemo, useState } from "react";
import { Search, Filter, ArrowRight } from "lucide-react";

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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    let cancelled = false;
    async function fetchJobs() {
      if (!backend) return;
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (selected.length) params.set("tags", selected.join(","));
        const res = await fetch(`${backend}/api/jobs?${params.toString()}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setJobs(Array.isArray(data.items) ? data.items : []);
        }
      } catch (e) {
        if (!cancelled) setError("Could not load jobs. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, [backend, query, selected]);

  const display = useMemo(() => {
    // Fallback: if backend not configured, show empty list
    const list = Array.isArray(jobs) ? jobs : [];
    // Already sorted by backend; ensure stable sort
    return [...list].sort((a, b) => (b.match || 0) - (a.match || 0));
  }, [jobs]);

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
              {error && (
                <p className="py-4 text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md">{error}</p>
              )}
              {loading && (
                <p className="py-6 text-center text-sm text-slate-500">Loading jobs…</p>
              )}
              {!loading && display.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-500">No results. Try a different query or tag.</p>
              )}
              {display.map((job) => (
                <article key={job.id} className="py-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-600">{job.company} • {job.location}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {Array.isArray(job.tags) && job.tags.map((tg) => (
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
            Live data powered by the backend and database. Secure integrations in production.
          </p>
        </div>
      </div>
    </section>
  );
}
