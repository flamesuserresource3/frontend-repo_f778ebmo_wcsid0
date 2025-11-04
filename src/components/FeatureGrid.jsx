import { Brain, BarChart3, Shield, Globe, Zap } from "lucide-react";

const features = [
  {
    title: "AI‑powered matching",
    desc: "Semantic analysis scores each role on skills, experience, and intent for 95%+ fit.",
    icon: Brain,
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Predictive insights",
    desc: "Forecast trends by location and industry to guide your next move.",
    icon: BarChart3,
    color: "bg-amber-50 text-amber-700",
  },
  {
    title: "Privacy by design",
    desc: "GDPR/CCPA aligned with secure partner APIs — your data, your control.",
    icon: Shield,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Global & multilingual",
    desc: "From USAJOBS to Naukri and Seek — translate and localize in real time.",
    icon: Globe,
    color: "bg-sky-50 text-sky-700",
  },
  {
    title: "Auto‑apply & autofill",
    desc: "One profile, many portals. Smart cover letters for every application.",
    icon: Zap,
    color: "bg-violet-50 text-violet-700",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for the modern job search
          </h2>
          <p className="mt-3 text-slate-600">
            A unified profile, intelligent matching, and actionable insights — all in one place.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc, icon: Icon, color }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color} ring-1 ring-slate-200`}>
                <Icon size={18} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-100/60 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
