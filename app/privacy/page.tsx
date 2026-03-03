import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — knwn.to",
  description: "How Mettle Performance, Inc. collects, uses, and protects your information on knwn.to.",
};

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
        <div className="space-y-0">

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">1. Who We Are</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              knwn.to is a product of Mettle Performance, Inc. (&ldquo;Mettle Performance,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a company dedicated to helping athletes develop self-knowledge and perform at their highest level. This Privacy Policy explains how we collect, use, and protect information when you use knwn.to (the &ldquo;Site&rdquo;) and its related services (the &ldquo;Services&rdquo;).
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              If you have questions about this policy or want to exercise any of your rights, contact us at{" "}
              <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a>.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">2. Information We Collect</h2>

            <h3 className="font-display text-base font-bold text-[#1A1A1A] mt-6 mb-3">Information you provide directly</h3>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">When you complete the First Read intake, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Your first name</li>
              <li>Your email address</li>
              <li>Your date of birth (used solely to determine age eligibility)</li>
              <li>Your responses to the intake questions (sport, competitive history, performance experiences, goals, and related reflections)</li>
            </ul>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">When a parent or guardian completes the parental consent flow, we additionally collect:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Parent or guardian name</li>
              <li>Parent or guardian email address</li>
              <li>Relationship to the athlete</li>
            </ul>

            <h3 className="font-display text-base font-bold text-[#1A1A1A] mt-6 mb-3">Information collected automatically</h3>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We collect standard technical data when you visit the Site, including IP address, browser type, device type, pages visited, and time spent. We use this data to operate and improve the Site. We do not sell this data.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">3. How We Use Your Information</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Deliver your First Read and athlete profile (athlete.md)</li>
              <li>Send you the communications you requested</li>
              <li>Notify a parent or guardian when you choose to invite one</li>
              <li>Improve the quality and relevance of our Services</li>
              <li>Comply with legal obligations</li>
              <li>Respond to data access, correction, or deletion requests</li>
            </ul>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We do not use your intake responses for advertising. We do not sell, rent, or share your personal information with third parties for their own marketing purposes.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">4. Children&rsquo;s Privacy &mdash; Users Under 13 (COPPA)</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              knwn.to is not directed to children under the age of 13. We do not knowingly collect personal information from anyone under 13.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              If you are under 13, you may not use this Site or submit any information. If we learn that we have inadvertently collected information from a child under 13, we will delete it promptly.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              <strong className="text-[#1A1A1A]">Parents and guardians:</strong> If you believe your child under 13 has submitted information to knwn.to without your consent, please contact us immediately at{" "}
              <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a>. We will verify the request and delete the information within a reasonable time.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">5. Users Ages 13&ndash;17</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              Athletes between the ages of 13 and 17 may complete the First Read intake and receive their athlete profile. We collect only the information described in Section 2 and use it only to deliver the Services.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              We do not charge users under 18 or enter them into paid service agreements without verified parental or guardian consent. If a minor user wishes to access paid features, a parent or guardian consent step is required before any transaction is processed.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">Parents and guardians may contact us at <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a> to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Request a description of the information we hold about their minor child</li>
              <li>Request correction of that information</li>
              <li>Request deletion of that information</li>
            </ul>
            <p className="font-body text-[#3D3935] leading-relaxed">We will respond to verified parental requests within 30 days.</p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">6. Data Sharing</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">We share personal information only in the following limited circumstances:</p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              <strong className="text-[#1A1A1A]">Service providers.</strong> We use trusted third-party services to operate knwn.to, including email delivery (SendGrid) and subscriber management (Kit). These providers process data on our behalf under confidentiality obligations and are not permitted to use your data for their own purposes.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              <strong className="text-[#1A1A1A]">Legal requirements.</strong> We may disclose information if required by law, regulation, legal process, or governmental request.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              <strong className="text-[#1A1A1A]">Business transfers.</strong> If Mettle Performance, Inc. is acquired, merges, or transfers its assets, user information may be transferred as part of that transaction. We will notify users via email or a prominent notice on the Site before any such transfer.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed font-bold text-[#1A1A1A]">We do not sell personal information. Ever.</p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">7. Data Retention</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              We retain your information for as long as your account is active or as needed to provide Services. If you request deletion of your account or data, we will remove your personal information within 30 days, except where we are required to retain it for legal or compliance purposes.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              Intake responses are retained to deliver and improve the First Read. You may request deletion of your responses at any time by contacting <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a>.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">8. Security</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We use reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. No method of transmission over the internet is completely secure, but we take reasonable precautions and are committed to responsible data handling.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">9. Your Rights</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">Depending on where you live, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of certain communications</li>
            </ul>
            <p className="font-body text-[#3D3935] leading-relaxed">
              To exercise any of these rights, contact us at <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a>. We will respond within 30 days.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">10. Cookies</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We use minimal cookies necessary to operate the Site (session management, security). We do not use advertising or tracking cookies. You can control cookie settings through your browser.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">11. Third-Party Links</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              The Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">12. Changes to This Policy</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a new effective date. For significant changes, we will send an email notification to registered users.
            </p>
          </section>

          {/* Section */}
          <section className="pb-10 mb-10">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">13. Contact</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              For any privacy-related questions, data requests, or concerns &mdash; including COPPA requests from parents or guardians &mdash; contact us at:
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a><br />
              Mettle Performance, Inc.
            </p>
          </section>

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
