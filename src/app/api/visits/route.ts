import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// A small global visit counter backed by Upstash Redis. GET reads the total;
// POST increments it (called once per session by the homepage widget after a
// visitor has scrolled). If Upstash isn't configured yet, both return
// { count: null } so the UI simply hides — the site never errors.
//
// Setup: in Vercel → Storage → add Upstash Redis (or the Redis Marketplace
// integration). It injects UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
// automatically; no code change needed.

export const dynamic = "force-dynamic"; // never cache the count
export const runtime = "nodejs";

const KEY = "visits:total";

// Find the Upstash REST credentials regardless of how Vercel named them. The
// Marketplace integration may add a prefix (e.g. STORAGE_KV_REST_API_URL), so we
// try the common explicit names first, then fall back to matching any
// "...REST[_API]_URL" / "...REST[_API]_TOKEN" pair that points at Upstash.
function findCreds(): { url: string; token: string } | null {
  const env = process.env;
  const url =
    env.UPSTASH_REDIS_REST_URL ??
    env.KV_REST_API_URL ??
    Object.entries(env).find(
      ([k, v]) => /REST(_API)?_URL$/.test(k) && !!v && v.includes("upstash.io"),
    )?.[1];
  const token =
    env.UPSTASH_REDIS_REST_TOKEN ??
    env.KV_REST_API_TOKEN ??
    Object.entries(env).find(([k, v]) => /REST(_API)?_TOKEN$/.test(k) && !!v)?.[1];
  if (!url || !token) return null;
  return { url, token };
}

function getRedis(): Redis | null {
  const creds = findCreds();
  return creds ? new Redis(creds) : null;
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ count: null });
  try {
    const count = (await redis.get<number>(KEY)) ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}

export async function POST() {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ count: null });
  try {
    const count = await redis.incr(KEY);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}
