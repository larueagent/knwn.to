import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — knwn.to",
  description: "How Mettle Performance, Inc. collects, uses, and protects your information on knwn.to.",
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-xl text-[#1A1A1A] mt-12 mb-3">{children}</h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display text-base font-bold text-[#1A1A1A] mt-6 mb-2">{children}</h3>
);

const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[#3D3935] leading-relaxed font-body mb-4 ${className}`}>{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-outside pl-5 mb-4 space-y-1">{children}</ul>
);

const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="text-[#3D3935] font-body leading-relaxed">{children}</li>
);

const HR = () => (
  <hr className="border-t border-[#D4C9B8] mt-12 mb-10" />
);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-[#B8821A] hover:underline">{children}</a>
);

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="inline-block font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-12 hover:opacity-70 transition-opacity"
        >
          ← knwn.to
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">
            Legal
          </p>
          <h1 className="font-display text-4xl text-[#1A1A1A] mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-[#6B6560]">
            Mettle Performance, Inc. &nbsp;·&nbsp; Effective March 2, 2026
          </p>
        </div>

        {/* Body */}
        <div>

          <H2>1. Who We Are</H2>
          <P>
            knwn.to is a product of Mettle Performance, Inc. (&ldquo;Mettle Performance,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a company dedicated to helping athletes develop self-knowledge and perform at their highest level. This Privacy Policy explains how we collect, use, and protect information when you use knwn.to (the &ldquo;Site&rdquo;) and its related services (the &ldquo;Services&rdquo;).
          </P>
          <P>
            If you have questions about this policy or want to exercise any of your rights, contact us at{" "}
            <A href="mailto:privacy@knwn.to">privacy@knwn.to</A>.
          </P>

          <HR />

          <H2>2. Information We Collect</H2>
          <H3>Information you provide directly</H3>
          <P>When you complete the First Read intake, we collect:</P>
          <UL>
            <LI>Your first name</LI>
            <LI>Your email address</LI>
            <LI>Your date of birth (used solely to determine age eligibility)</LI>
            <LI>Your responses to the intake questions (sport, competitive history, performance experiences, goals, and related reflections)</LI>
          </UL>
          <P>When a parent or guardian completes the parental consent flow, we additionally collect:</P>
          <UL>
            <LI>Parent or guardian name</LI>
            <LI>Parent or guardian email address</LI>
            <LI>Relationship to the athlete</LI>
          </UL>
          <H3>Information collected automatically</H3>
          <P>
            We collect standard technical data when you visit the Site, including IP address, browser type, device type, pages visited, and time spent. We use this data to operate and improve the Site. We do not sell this data.
          </P>

          <HR />

          <H2>3. How We Use Your Information</H2>
          <P>We use the information we collect to:</P>
          <UL>
            <LI>Deliver your First Read and athlete profile (athlete.md)</LI>
            <LI>Send you the communications you requested</LI>
            <LI>Notify a parent or guardian when you choose to invite one</LI>
            <LI>Improve the quality and relevance of our Services</LI>
            <LI>Comply with legal obligations</LI>
            <LI>Respond to data access, correction, or deletion requests</LI>
          </UL>
          <P>
            We do not use your intake responses for advertising. We do not sell, rent, or share your personal information with third parties for their own marketing purposes.
          </P>

          <HR />

          <H2>4. Children&rsquo;s Privacy &mdash; Users Under 13 (COPPA)</H2>
          <P>
            knwn.to is not directed to children under the age of 13. We do not knowingly collect personal information from anyone under 13.
          </P>
          <P>
            If you are under 13, you may not use this Site or submit any information. If we learn that we have inadvertently collected information from a child under 13, we will delete it promptly.
          </P>
          <P>
            <strong className="text-[#1A1A1A]">Parents and guardians:</strong> If you believe your child under 13 has submitted information to knwn.to without your consent, please contact us immediately at{" "}
            <A href="mailto:privacy@knwn.to">privacy@knwn.to</A>. We will verify the request and delete the information within a reasonable time.
          </P>

          <HR />

          <H2>5. Users Ages 13&ndash;17</H2>
          <P>
            Athletes between the ages of 13 and 17 may complete the First Read intake and receive their athlete profile. We collect only the information described in Section 2 and use it only to deliver the Services.
          </P>
          <P>
            We do not charge users under 18 or enter them into paid service agreements without verified parental or guardian consent. If a minor user wishes to access paid features, a parent or guardian consent step is required before any transaction is processed.
          </P>
          <P>Parents and guardians may contact us at <A href="mailto:privacy@knwn.to">privacy@knwn.to</A> to:</P>
          <UL>
            <LI>Request a description of the information we hold about their minor child</LI>
            <LI>Request correction of that information</LI>
            <LI>Request deletion of that information</LI>
          </UL>
          <P>We will respond to verified parental requests within 30 days.</P>

          <HR />

          <H2>6. Data Sharing</H2>
          <P>We share personal information only in the following limited circumstances:</P>
          <P>
            <strong className="text-[#1A1A1A]">Service providers.</strong> We use trusted third-party services to operate knwn.to, including email delivery (SendGrid) and subscriber management (Kit). These providers process data on our behalf under confidentiality obligations and are not permitted to use your data for their own purposes.
          </P>
          <P>
            <strong className="text-[#1A1A1A]">Legal requirements.</strong> We may disclose information if required by law, regulation, legal process, or governmental request.
          </P>
          <P>
            <strong className="text-[#1A1A1A]">Business transfers.</strong> If Mettle Performance, Inc. is acquired, merges, or transfers its assets, user information may be transferred as part of that transaction. We will notify users via email or a prominent notice on the Site before any such transfer.
          </P>
          <P><strong className="text-[#1A1A1A]">We do not sell personal information. Ever.</strong></P>

          <HR />

          <H2>7. Data Retention</H2>
          <P>
            We retain your information for as long as your account is active or as needed to provide Services. If you request deletion of your account or data, we will remove your personal information within 30 days, except where we are required to retain it for legal or compliance purposes.
          </P>
          <P>
            Intake responses are retained to deliver and improve the First Read. You may request deletion of your responses at any time by contacting <A href="mailto:privacy@knwn.to">privacy@knwn.to</A>.
          </P>

          <HR />

          <H2>8. Security</H2>
          <P>
            We use reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. No method of transmission over the internet is completely secure, but we take reasonable precautions and are committed to responsible data handling.
          </P>

          <HR />

          <H2>9. Your Rights</H2>
          <P>Depending on where you live, you may have the right to:</P>
          <UL>
            <LI>Access the personal information we hold about you</LI>
            <LI>Correct inaccurate information</LI>
            <LI>Request deletion of your information</LI>
            <LI>Opt out of certain communications</LI>
          </UL>
          <P>
            To exercise any of these rights, contact us at <A href="mailto:privacy@knwn.to">privacy@knwn.to</A>. We will respond within 30 days.
          </P>

          <HR />

          <H2>10. Cookies</H2>
          <P>
            We use minimal cookies necessary to operate the Site (session management, security). We do not use advertising or tracking cookies. You can control cookie settings through your browser.
          </P>

          <HR />

          <H2>11. Third-Party Links</H2>
          <P>
            The Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.
          </P>

          <HR />

          <H2>12. Changes to This Policy</H2>
          <P>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a new effective date. For significant changes, we will send an email notification to registered users.
          </P>

          <HR />

          <H2>13. Contact</H2>
          <P>
            For any privacy-related questions, data requests, or concerns &mdash; including COPPA requests from parents or guardians &mdash; contact us at:
          </P>
          <P>
            <A href="mailto:privacy@knwn.to">privacy@knwn.to</A><br />
            Mettle Performance, Inc.
          </P>

        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#D4C9B8] flex gap-8">
          <Link
            href="/terms"
            className="font-mono text-xs tracking-widest uppercase text-[#B8821A] hover:opacity-70 transition-opacity"
          >
            Terms of Service →
          </Link>
        </div>

      </div>
    </main>
  );
}
