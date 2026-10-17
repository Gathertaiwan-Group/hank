import type { NextConfig } from "next";

const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [
  { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl);
    if (!hostname.endsWith(".supabase.co")) {
      remotePatterns.push({ protocol: "https", hostname, pathname: "/storage/v1/object/public/**" });
    }
  } catch {
    // ignore malformed env; fallback content still works
  }
}

const nextConfig: NextConfig = {
  images: { remotePatterns },
};

export default nextConfig;
