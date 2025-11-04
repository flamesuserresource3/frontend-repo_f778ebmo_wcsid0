import { Rocket, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center text-white shadow">
            <Rocket size={18} />
          </div>
          <span className="font-semibold text-gray-900 tracking-tight">Job Nexus</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#connect" className="hover:text-gray-900 transition">Connect</a>
          <a href="#about" className="hover:text-gray-900 transition">About</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <User size={16} />
          Sign in
        </button>
      </div>
    </header>
  );
}
