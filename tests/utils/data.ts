import fs from "node:fs";
import path from "node:path";

/**
 * Shared test-data loaders and types.
 *
 * Reads the site's own `data/*.json` files straight off disk (rather than
 * importing them as TS modules) so this suite works regardless of the
 * consuming project's `resolveJsonModule` / bundler settings, and never
 * throws a hard import error if a file is temporarily missing or renamed —
 * callers get `null`/`[]` and can skip gracefully instead of crashing the
 * whole run.
 *
 * Path assumption: this file lives at `tests/utils/data.ts`, and the
 * Next.js app's `data/` directory is a sibling of `tests/` at the repo
 * root. Adjust REPO_ROOT below if your test suite is nested differently.
 */
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const DATA_DIR = path.join(REPO_ROOT, "data");

export interface Batch {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryRaw?: string;
  price: number | null;
  discountPrice: number | null;
  discountPercent: number | null;
  summary: string;
  description?: string;
  validity: string;
  appxUrl: string;
}

export interface AppLink {
  platform?: string;
  label?: string;
  url?: string;
  [key: string]: unknown;
}

function readJsonIfExists<T>(filename: string): T | null {
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    // A JSON.parse failure here *is* one of the edge cases this suite
    // cares about — surface it as an empty result rather than throwing,
    // so the calling test can assert on graceful handling instead of
    // Playwright aborting the whole run with an unrelated stack trace.
    return null;
  }
}

export function loadBatches(): Batch[] {
  return readJsonIfExists<Batch[]>("batches.json") ?? [];
}

export function loadAppLinks(): AppLink[] {
  return readJsonIfExists<AppLink[]>("apps.json") ?? [];
}

/** True absolute http(s) URL — not "#", not empty, not a relative path. */
export function isAbsoluteHttpUrl(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    const u = new URL(href);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Text that signals a deliberately-disabled/pending CTA rather than a dead link. */
export const PENDING_LINK_TEXT = /coming soon|link pending|notify me|pending/i;
