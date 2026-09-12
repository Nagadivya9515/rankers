import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RankersPro collects, uses, and protects your information, including data submitted through the Notify Me form.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" effectiveDate="[To be finalized by RankersPro before launch]">
      <p>
        This Privacy Policy explains what information RankersPro collects
        through rankerspro.com, how it is used, and the choices you have.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        The only personal information collected directly on this Site is
        through the Notify Me / Contact form, where we ask for:
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>WhatsApp number</li>
        <li>Exam category of interest</li>
      </ul>
      <p>
        We do not require account creation, and the Site does not use
        payment processing directly — batch payments are completed on our
        AppX/Razorpay storefront, which has its own privacy practices.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To notify you when a batch matching your exam category launches or reopens.</li>
        <li>To follow up with you via email, phone, or WhatsApp about relevant RankersPro programs.</li>
        <li>To understand which pages and campaigns generate interest, so we can improve the Site.</li>
      </ul>

      <h2>3. Where Your Information Is Stored</h2>
      <p>
        Notify Me submissions are stored in our database (MongoDB Atlas) and
        mirrored to an internal Google Sheet for manual review by the
        RankersPro team. We do not sell your information to third parties.
      </p>

      <h2>4. Data Security</h2>
      <p>
        Form submissions are transmitted over HTTPS. We apply reasonable
        technical safeguards, including basic validation and rate-limiting,
        to reduce spam and unauthorized access.
      </p>

      <h2>5. Your Choices</h2>
      <p>
        You can ask us to stop contacting you or to delete your submitted
        information at any time by reaching out to our partnership desk
        using the contact details in the site footer.
      </p>

      <h2>6. Cookies & Analytics</h2>
      <p>
        This Site may use standard web analytics and Google Ads conversion
        tracking to understand traffic and campaign performance. This does
        not collect information beyond standard browser/usage data.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The effective
        date at the top of this page will reflect the latest revision.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy-related questions or requests, contact our partnership
        desk via the details in the site footer.
      </p>

      <p className="mt-8 rounded-lg bg-gold-50 p-4 text-sm text-gold-800">
        Placeholder notice: this page is a draft template generated for the
        RankersPro site build. It must be reviewed and fact-checked by
        RankersPro before publishing, per the SRS accuracy requirement.
      </p>
    </LegalPageLayout>
  );
}
