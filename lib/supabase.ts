import { createClient } from "@supabase/supabase-js";

export const SUPABASE_SCHEMA = "hank";

export function getSupabaseEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url: url.replace(/\/+$/, ""), anonKey };
}

/**
 * Server 端唯讀 client。
 * fetch 明確帶 next.revalidate = 300：資料快取上限 5 分鐘，與頁面 ISR 同步，
 * 不會落入 Next Data Cache 預設的長效快取（見 README / revalidate 說明）。
 */
export function createServerSupabase() {
  const env = getSupabaseEnv();
  if (!env) return null;
  return createClient(env.url, env.anonKey, {
    db: { schema: SUPABASE_SCHEMA },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: 300 } } as RequestInit),
    },
  });
}
