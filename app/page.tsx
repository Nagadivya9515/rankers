import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StatBar from "@/components/StatBar";
import BatchCard from "@/components/BatchCard";
import TestimonialCard from "@/components/TestimonialCard";
import AppEcosystemSection from "@/components/AppEcosystemSection";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import { getBatches, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "RankersPro — GATE, ESE & State AE/JE Coaching",
  description:
    "RankersPro brings together three master mentors with 22+ years of combined experience and 1,00,000+ students mentored — for GATE, ESE, PSU, APPSC/TGPSC, SSC JE, RRB JE and state AE/JE exams.",
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "tiranga",
    imageSrc: "/images/hero/tiranga.webp",
    imageAlt: "RankersPro Tiranga Batch — one course for GATE, ESE, PSUs, SSC JE, AE, JE and AEE",
    eyebrow: "GATE 2028 & 2029",
    title: "Tiranga Batch — one course, every exam",
    description:
      "Full Technical + Maths + Aptitude syllabus for GATE, ESE, PSUs, SSC JE, AE, JE and AEE — with crash, revision and test-series courses included.",
    ctaLabel: "View Tiranga Batch",
    ctaHref: "/batches/gate-and-ese-tiranga-batch",
  },
  {
    id: "acharya-batch",
    imageSrc: "/images/hero/acharya-batch.webp",
    imageAlt: "RankersPro Acharya Batch — GATE 2027 crash course and question practice",
    eyebrow: "GATE 2027 Aspirants",
    title: "Acharya Batch — crash + question practice",
    description:
      "A 100-day question-practice course paired with a 50-day complete Technical + Maths + Aptitude crash and revision course, with test series included.",
    ctaLabel: "View Acharya Batch",
    ctaHref: "/batches/acharya-batch-gate-2027-crash-question-practice",
  },
  {
    id: "kp-sir-subjects",
    imageSrc: "/images/hero/herobanner2.webp",
    imageAlt: "RankersPro KP Sir Subjects Course banner",
    eyebrow: "GATE, ESE, PCB, PSUs, SSC & State AE/JE/AEE",
    title: "All of KP Sir's subjects, one course",
    description:
      "Environmental Engineering, Hydrology, Geotechnical Engineering, Irrigation Engineering, Fluid Mechanics, OCF and CPM/PERT — at launching-offer pricing.",
    ctaLabel: "View KP Sir Subjects Course",
    ctaHref: "/batches/kp-sir-subjects-course-gate-ese-and-all-exams",
  },
  {
    id: "explore-all",
    imageSrc: "/images/hero/herobanner1.webp",
    imageAlt: "RankersPro banner — GATE, ESE, PSU and state engineering exam coaching",
    eyebrow: "GATE · ESE · PSU · State AE/JE",
    title: "Your Success, Our Mission",
    description:
      "Learn from three master mentors who have themselves cleared the exams they teach — 22+ years of combined experience, 1,00,000+ students mentored.",
    ctaLabel: "Explore All Batches",
    ctaHref: "/batches",
  },
];

export default function HomePage() {
  const featuredBatches = getBatches().slice(0, 6);
  const featuredTestimonials = getTestimonials().slice(0, 3);

  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} />

      <StatBar />

      {/* Featured Batches */}
      <section aria-labelledby="featured-batches-heading" className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Batches"
              title="Featured Batches"
              description="A snapshot of our most-enrolled programs across GATE & ESE, state PSC, SSC JE, RRB JE, and state AE/JE exams."
              headingId="featured-batches-heading"
            />
            <Link href="/batches" className="btn-outline hidden sm:inline-flex">
              View All Batches
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/batches" className="btn-outline">
              View All Batches
            </Link>
          </div>
        </div>
      </section>

      <AppEcosystemSection />

      {/* Testimonial Snippet */}
      <section aria-labelledby="testimonials-heading" className="bg-brand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Results"
            title="What Our Students Say"
            description="A few voices from the 1,00,000+ students who've studied with RankersPro's faculty team."
            headingId="testimonials-heading"
          />
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/achievers" className="btn-primary">
              See All Achievers & Results
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
