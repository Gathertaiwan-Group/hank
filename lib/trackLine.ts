import type { LineSource } from "@/lib/site";

/**
 * Fire-and-forget：寫一筆 LINE 點擊到 hank.line_clicks。
 * 用 fetch keepalive（sendBeacon 不能帶自訂 header），永不 await、永不拋錯，不阻擋跳轉。
 * env 缺值時 no-op。
 */
export function trackLine(source: LineSource, workSlug?: string): void {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || typeof window === "undefined") return;
  try {
    void fetch(`${url.replace(/\/+$/, "")}/rest/v1/line_clicks`, {
      method: "POST",
      keepalive: true,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Content-Profile": "hank",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        source,
        work_slug: workSlug ?? null,
        referrer: document.referrer ? document.referrer.slice(0, 500) : null,
        user_agent: navigator.userAgent.slice(0, 500),
      }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}
