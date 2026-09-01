import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// createClient throws a bare "supabaseUrl is required" with no indication of
// WHY — almost always because VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
// aren't set for this environment (e.g. present in a local .env, which is
// gitignored, but never added to the host's env var settings — Vercel,
// etc. — so the production build never sees them).
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY " +
      "are not set. Locally, check your .env file. On a host (Vercel, etc.), " +
      "add them under the project's Environment Variables settings and redeploy " +
      "— .env is gitignored, so those values never reach the build unless set there too."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
