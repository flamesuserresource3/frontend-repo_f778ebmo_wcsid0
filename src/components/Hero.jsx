import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(99,102,241,0.25),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-16 sm:py-20 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              The ultimate hub for every job, everywhere
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Job Nexus unifies listings from the world’s top job sites and uses AI to match you with high‑fit roles. Build once, apply everywhere.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                "Universal profile and one‑click apply",
                "AI scoring for best‑fit roles",
                "Real‑time aggregation from 20+ platforms",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-indigo-600" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Start exploring <ArrowRight size={16} />
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-12 -z-0 bg-gradient-to-tr from-indigo-100 via-white to-violet-100 blur-3xl" />
            <div className="relative z-10 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "Indeed", c: "bg-blue-50 text-blue-700" },
                  { k: "LinkedIn", c: "bg-sky-50 text-sky-700" },
                  { k: "Glassdoor", c: "bg-emerald-50 text-emerald-700" },
                  { k: "Monster", c: "bg-fuchsia-50 text-fuchsia-700" },
                  { k: "ZipRecruiter", c: "bg-lime-50 text-lime-700" },
                  { k: "Dice", c: "bg-orange-50 text-orange-700" },
                ].map((b) => (
                  <span
                    key={b.k}
                    className={`inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-6 text-sm font-semibold ${b.c}`}
                  >
                    {b.k}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-slate-500">
                Secure, real‑time integrations with global platforms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
