"use client";

import { useMemo, useState } from "react";
import type { Batch, BatchCategory } from "@/lib/types";
import BatchCard from "./BatchCard";

interface BatchCategoryFilterProps {
  categories: BatchCategory[];
  batches: Batch[];
}

const ALL = "All" as const;

/**
 * Client-side category filter for the Batches listing page. All batch data
 * is already statically rendered on the server (see app/batches/page.tsx);
 * this component only toggles visibility, so the page stays static-export
 * friendly with no data fetching.
 */
export default function BatchCategoryFilter({ categories, batches }: BatchCategoryFilterProps) {
  const [active, setActive] = useState<BatchCategory | typeof ALL>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? batches : batches.filter((b) => b.category === active)),
    [active, batches]
  );

  const tabs: (BatchCategory | typeof ALL)[] = [ALL, ...categories];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter batches by exam category"
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab)}
              className={`link-focus rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "border-brand-500 bg-brand-500 text-white shadow-card"
                  : "border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-900"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-brand-600">No batches in this category yet — check back soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      )}
    </div>
  );
}
