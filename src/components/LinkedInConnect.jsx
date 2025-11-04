import { useEffect, useState } from "react";
import { User, LogIn } from "lucide-react";

export default function LinkedInConnect() {
  const backend = import.meta.env.VITE_BACKEND_URL || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  // Handle OAuth callback (?code=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code || !backend) return;

    async function completeOAuth() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${backend}/api/auth/linkedin/callback?code=${encodeURIComponent(code)}`);
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `Callback failed: ${res.status}`);
        }
        const data = await res.json();
        setProfile(data);
        // Clean code from URL
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState({}, "", url.toString());
      } catch (e) {
        setError("Could not complete LinkedIn sign-in. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    completeOAuth();
  }, [backend]);

  const startLogin = async () => {
    if (!backend) {
      setError("Backend URL is not configured.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backend}/api/auth/linkedin/login`);
      const data = await res.json();
      if (data && data.auth_url) {
        window.location.href = data.auth_url;
      } else {
        throw new Error("Invalid auth URL");
      }
    } catch (e) {
      setError("Could not start LinkedIn sign-in. Check configuration.");
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-white" id="linkedin">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-slate-200">
              <User size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">Connect your LinkedIn</h3>
              <p className="mt-1 text-sm text-slate-600">Sign in with LinkedIn to pull your name, email and profile photo to bootstrap your universal profile.</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={startLogin}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 disabled:opacity-60"
                >
                  <LogIn size={16} /> {loading ? "Connecting…" : "Sign in with LinkedIn"}
                </button>
                {error && <span className="text-sm text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">{error}</span>}
              </div>

              {profile && (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt={profile.full_name || "LinkedIn avatar"} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">No photo</div>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-sm text-slate-700">
                      <div><span className="font-semibold">Name:</span> {profile.full_name || `${profile.first_name || ""} ${profile.last_name || ""}`}</div>
                      <div><span className="font-semibold">Email:</span> {profile.email || "—"}</div>
                      <div><span className="font-semibold">Headline:</span> {profile.headline || "—"}</div>
                      <div className="truncate"><span className="font-semibold">LinkedIn ID:</span> {profile.linkedin_id}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">Admin note: LinkedIn OAuth requires LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, and LINKEDIN_REDIRECT_URI to be set in the backend environment.</p>
      </div>
    </section>
  );
}
