import { Shield, Sparkles, Globe, LineChart } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Match Scoring",
    desc: "See how well each role aligns to your skills, seniority, and preferences with transparent scoring.",
  },
  {
    icon: Shield,
    title: "Private by Design",
    desc: "Your data is encrypted in transit. You control what gets shared when applying.",
  },
  {
    icon: LineChart,
    title: "Market Signals",
    desc: "Live insights on trending roles, hiring velocity, and compensation bands.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    desc: "Search roles across regions with location, visa, and remote filters built-in.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Purpose-built for modern job seekers</h2>
          <p className="mt-3 text-gray-600">Everything you need to discover roles, benchmark your profile, and apply with confidence.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:shadow transition">
              <div className="h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
