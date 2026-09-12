import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import FacultyCard from "@/components/FacultyCard";
import { getFaculty } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Faculty",
  description:
    "Meet RankersPro's three master mentors: KP Sir (Civil & Environmental Engineering), RP Sir (Structures & Transportation), and Dr. Sandeep Sir (Engineering Mathematics).",
};

export default function FacultyPage() {
  const faculty = getFaculty();

  return (
    <>
      <section className="bg-brand-gradient">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            light
            eyebrow="Our Faculty"
            title="Three master mentors. One faculty team."
            description="Each of our mentors has cleared the very exams they now teach — bringing a combined 58+ years of experience to every batch."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {faculty.map((member) => (
              <FacultyCard key={member.id} faculty={member} variant="full" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
