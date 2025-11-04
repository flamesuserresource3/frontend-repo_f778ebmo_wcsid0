import { Rocket, Globe, Shield, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white">
              <Rocket size={18} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">Job Nexus</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a className="hover:text-slate-900 transition-colors inline-flex items-center gap-1" href="#features">
              <Sparkles size={16} /> Features
            </a>
            <a className="hover:text-slate-900 transition-colors inline-flex items-center gap-1" href="#global">
              <Globe size={16} /> Global
            </a>
            <a className="hover:text-slate-900 transition-colors inline-flex items-center gap-1" href="#privacy">
              <Shield size={16} /> Privacy
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign in</button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">
              Get started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
