import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import FeatureGrid from "./components/FeatureGrid";
import LinkedInConnect from "./components/LinkedInConnect";

function Footer() {
  return (
    <footer id="about" className="border-t border-black/5 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Job Nexus. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#connect" className="hover:text-gray-900">Connect</a>
          <a href="#about" className="hover:text-gray-900">About</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar />
      <Hero3D />
      <FeatureGrid />
      <LinkedInConnect />
      <Footer />
    </div>
  );
}
