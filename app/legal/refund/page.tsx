import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "RankersPro's refund and cancellation policy for batches purchased via the AppX/Razorpay storefront.",
};

export default function RefundPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      effectiveDate="[To be finalized by RankersPro before launch]"
    >
      <p>
        This policy explains how refunds and cancellations are handled for
        RankersPro batches. rankerspro.com is an information site only —
        all batch purchases are completed and processed through our AppX
        storefront and Razorpay payment gateway.
      </p>

      <h2>1. Where Purchases Are Made</h2>
      <p>
        Every &ldquo;Buy Now on AppX&rdquo; button on this Site takes you to our
        AppX storefront to complete payment via Razorpay. Your order
        confirmation, invoice, and access to purchased batch content are
        all managed within AppX, not on rankerspro.com.
      </p>

      <h2>2. Refund Eligibility</h2>
      <p>
        Refund requests are evaluated on a case-by-case basis and are
        subject to the terms shown at the time of purchase on the AppX
        checkout page. As a general principle:
      </p>
      <ul>
        <li>Requests must be raised within the window specified at checkout for the specific batch purchased.</li>
        <li>Batches with substantial content already accessed (recorded lectures viewed, live sessions attended) may be ineligible for a full refund.</li>
        <li>Approved refunds are processed back to the original payment method via Razorpay.</li>
      </ul>

      <h2>3. Cancellations</h2>
      <p>
        You may request to cancel an enrollment before the batch start date
        for a full refund, subject to any processing fee disclosed at
        checkout. Cancellations after the batch has started follow the
        refund eligibility terms above.
      </p>

      <h2>4. How to Request a Refund or Cancellation</h2>
      <p>
        Contact our partnership desk (details in the site footer) with your
        order details from AppX. We will guide you through the refund
        process with our payment partner.
      </p>

      <h2>5. Processing Time</h2>
      <p>
        Approved refunds are typically processed within a standard banking
        cycle after approval, though exact timelines depend on Razorpay and
        your bank/payment provider.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The version shown at
        the time of your purchase governs that transaction.
      </p>

      <p className="mt-8 rounded-lg bg-gold-50 p-4 text-sm text-gold-800">
        Placeholder notice: this page is a draft template generated for the
        RankersPro site build. Per the SRS, the previous site&apos;s refund
        policy contained inaccuracies — this draft must be reviewed and
        fact-checked against actual AppX/Razorpay practices before
        publishing.
      </p>
    </LegalPageLayout>
  );
}
