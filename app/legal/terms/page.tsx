import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the RankersPro website and enrolling in RankersPro batches.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" effectiveDate="[To be finalized by RankersPro before launch]">
      <p>
        These Terms & Conditions (&ldquo;Terms&rdquo;) govern your use of the
        rankerspro.com website (&ldquo;Site&rdquo;) operated by RankersPro. By
        accessing or using the Site, you agree to be bound by these Terms.
      </p>

      <h2>1. About This Site</h2>
      <p>
        rankerspro.com is a marketing and information website for RankersPro&apos;s
        coaching programs. It does not host live classes, process payments, or
        provide a student login/dashboard. Batch purchases are completed on our
        AppX storefront, which has its own applicable terms.
      </p>

      <h2>2. Use of Content</h2>
      <ul>
        <li>
          All course descriptions, faculty profiles, results, and stats published
          on this Site are for informational purposes and are reviewed for
          accuracy before publishing.
        </li>
        <li>
          Content on this Site — including text, graphics, and course
          materials referenced from it — may not be copied, reproduced, or
          redistributed without written permission from RankersPro.
        </li>
      </ul>

      <h2>3. Batch Enrollment</h2>
      <p>
        Clicking &ldquo;Buy Now on AppX&rdquo; or a similar call-to-action on a batch
        page will take you to our external AppX/Razorpay checkout to complete
        enrollment and payment. RankersPro is not responsible for the
        availability or uptime of third-party checkout providers.
      </p>

      <h2>4. Accuracy of Information</h2>
      <p>
        We take reasonable care to keep faculty credentials, results, and
        batch details accurate and current. If you notice an error, please
        contact our partnership desk so we can correct it promptly.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        RankersPro provides this Site &ldquo;as is&rdquo; and makes no guarantee of
        specific exam outcomes. Past results shown on the Achievers page
        reflect individual student outcomes and do not guarantee similar
        results for every student.
      </p>

      <h2>6. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the
        Site after changes are posted constitutes acceptance of the revised
        Terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these Terms can be directed to our partnership desk
        via the contact details in the site footer.
      </p>

      <p className="mt-8 rounded-lg bg-gold-50 p-4 text-sm text-gold-800">
        Placeholder notice: this page is a draft template generated for the
        RankersPro site build. It must be reviewed and fact-checked by
        RankersPro before publishing, per the SRS accuracy requirement.
      </p>
    </LegalPageLayout>
  );
}
