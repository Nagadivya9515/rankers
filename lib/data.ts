import type { AppLink, Batch, Faculty, Resource, Testimonial, Topper } from "./types";
import facultyData from "@/data/faculty.json";
import batchesData from "@/data/batches.json";
import toppersData from "@/data/toppers.json";
import testimonialsData from "@/data/testimonials.json";
import resourcesData from "@/data/resources.json";
import appsData from "@/data/apps.json";
import mentorshipData from "@/data/mentorship.json";

// Thin typed accessors over the static JSON content files. Centralizing the
// casts here keeps every page/component import fully-typed data with no
// `any` leaking out of app/**/*.tsx.

export function getFaculty(): Faculty[] {
  return facultyData as Faculty[];
}

export function getFacultyById(id: string): Faculty | undefined {
  return getFaculty().find((member) => member.id === id);
}

export function getBatches(): Batch[] {
  return batchesData as Batch[];
}

export function getBatchBySlug(slug: string): Batch | undefined {
  return getBatches().find((batch) => batch.slug === slug);
}

export function getBatchesByCategory(category: Batch["category"]): Batch[] {
  return getBatches().filter((batch) => batch.category === category);
}

export function getToppers(): Topper[] {
  // Most recent exam year first; entries with no confirmed year sort last.
  return [...(toppersData as Topper[])].sort((a, b) => (b.examYear ?? 0) - (a.examYear ?? 0));
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getResources(): Resource[] {
  return resourcesData as Resource[];
}

export function getAppLinks(): AppLink[] {
  return appsData as AppLink[];
}

export interface MentorshipPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export function getMentorshipPillars(): MentorshipPillar[] {
  return mentorshipData as MentorshipPillar[];
}

export const BATCH_CATEGORIES = [
  "GATE & ESE",
  "APPSC/TGPSC",
  "SSC JE",
  "RRB JE",
  "State AE/JE",
  "Mentorship",
  "Career Guidance",
] as const;
