import { useEffect, useMemo, useState } from "react";
import { Linkedin, Loader2 } from "lucide-react";

export default function LinkedInConnect() {
  const backendBase = useMemo(() => import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, ""), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    async function handleCallback() {
      if (!backendBase) return; // nothing to do without backend
      if (!code || !state) return;
      try {
        setLoading(true);
        const res = await fetch(`${backendBase}/api/auth/linkedin/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`);
        if (!res.ok) throw new Error(`Callback failed (${res.status})`);
        const data = await res.json();
        setProfile(data);
        // Clean the URL
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState({}, "", url.toString());
      } catch (e) {
        console.error(e);
        setError("We couldn't complete LinkedIn sign-in. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    handleCallback();
  }, [backendBase]);

  async function startLinkedIn() {
    setError("");
    if (!backendBase) {
      setError("Backend URL is not configured. Please set VITE_BACKEND_URL.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${backendBase}/api/auth/linkedin/login`);
      if (!res.ok) throw new Error("Failed to start LinkedIn login");
      const { auth_url } = await res.json();
      if (auth_url) window.location.href = auth_url;
    } catch (e) {
      console.error(e);
      setError("Unable to connect to LinkedIn right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="connect" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Connect your LinkedIn</h3>
            <p className="mt-2 text-gray-600">Sign in securely to import your name, photo, and headline. We never post on your behalf.</p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={startLinkedIn}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-5 py-3 text-white font-medium shadow hover:brightness-110 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Linkedin size={18} />}
                {loading ? "Connecting..." : "Sign in with LinkedIn"}
              </button>
              {!backendBase && (
                <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-md">Set VITE_BACKEND_URL to enable OAuth</span>
              )}
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h4 className="font-semibold text-gray-900">Your profile</h4>
            {!profile ? (
              <p className="mt-2 text-gray-600">No LinkedIn profile connected yet. Connect to preview your imported details instantly.</p>
            ) : (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={profile.avatar_url || "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(profile.full_name || profile.first_name || "User")}
                  alt={profile.full_name || "LinkedIn avatar"}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{profile.full_name}</div>
                  {profile.headline && <div className="text-sm text-gray-600">{profile.headline}</div>}
                  {profile.email && <div className="text-sm text-gray-600 mt-1">{profile.email}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
