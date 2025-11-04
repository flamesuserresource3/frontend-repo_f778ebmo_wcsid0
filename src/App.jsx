import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import AggregationDemo from "./components/AggregationDemo";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <AggregationDemo />
      </main>
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Job Nexus. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <a href="#privacy" className="hover:text-slate-900">Privacy</a>
              <a href="#terms" className="hover:text-slate-900">Terms</a>
              <a href="#contact" className="hover:text-slate-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
