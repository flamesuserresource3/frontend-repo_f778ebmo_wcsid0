import Spline from "@splinetool/react-spline";

export default function Hero3D() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Smart job matching
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Find your next role with AI-powered insights
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Job Nexus connects your professional profile to roles across the market and highlights the best matches instantly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#connect" className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-white font-medium shadow hover:bg-black">Connect LinkedIn</a>
              <a href="#features" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-gray-900 font-medium shadow border border-gray-200 hover:bg-gray-50">Explore features</a>
            </div>
          </div>
          <div className="h-[420px] w-full rounded-2xl overflow-hidden shadow border border-black/5">
            <Spline scene="https://prod.spline.design/5QzqM2d8lVPO6f0L/scene.splinecode" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
