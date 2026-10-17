import fallbackWorks from "@/content/works.json";
import { createServerSupabase } from "@/lib/supabase";
import type { Work } from "@/lib/types";

type FallbackRow = { slug: string; cat: string; title: string; body: string; local: string };
type DbRow = { slug: string; cat: string; title: string; body: string; image_path: string };

export function resolveImagePath(imagePath: string): string {
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  const name = imagePath.replace(/^\/+/, "").replace(/^works\//, "");
  return `/works/${name}`;
}

export function getFallbackWorks(): Work[] {
  return (fallbackWorks as FallbackRow[]).map((w) => ({
    slug: w.slug,
    cat: w.cat,
    title: w.title,
    body: w.body,
    img: w.local,
  }));
}

export async function getWorks(): Promise<Work[]> {
  const supabase = createServerSupabase();
  if (!supabase) return getFallbackWorks();
  try {
    const { data, error } = await supabase
      .from("works")
      .select("slug,cat,title,body,image_path")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) {
      if (error) console.error("[works] supabase read failed, using fallback:", error.message);
      return getFallbackWorks();
    }
    return (data as DbRow[]).map((r) => ({
      slug: r.slug,
      cat: r.cat,
      title: r.title,
      body: r.body,
      img: resolveImagePath(r.image_path),
    }));
  } catch (e) {
    console.error("[works] supabase read threw, using fallback:", e);
    return getFallbackWorks();
  }
}
