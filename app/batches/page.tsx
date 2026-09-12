import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import BatchCard from "@/components/BatchCard";
import BatchCategoryFilter from "@/components/BatchCategoryFilter";
import { getBatches, BATCH_CATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Batches",
  description:
    "Browse RankersPro batches by category — GATE & ESE, APPSC/TGPSC, SSC JE, RRB JE, and State AE/JE — with pricing and full syllabus coverage.",
};

export default function BatchesPage() {
  const batches = getBatches();

  return (
    <>
      <section className="bg-brand-gradient">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            light
            eyebrow="Batches"
            title="Find the right batch for your exam"
            description="Every batch is taught live by our master mentor faculty team, with a recorded backup and a structured test series. Filter by exam category to find yours."
          />
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          <BatchCategoryFilter categories={[...BATCH_CATEGORIES]} batches={batches} />
        </div>
      </section>
    </>
  );
}
