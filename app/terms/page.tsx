import Link from "next/link";

export const metadata = {
  title: "Terms of Service — knwn.to",
  description: "The terms governing your use of knwn.to and the First Read, operated by Mettle Performance, Inc.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-[#6B6560]">
            Mettle Performance, Inc. &nbsp;·&nbsp; Effective March 2, 2026
          </p>
        </div>

        {/* Body */}
        <div className="space-y-0">

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">1. Agreement to These Terms</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              By accessing or using knwn.to (the &ldquo;Site&rdquo;) or any related services (the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Site or Services.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              These Terms constitute a binding agreement between you and Mettle Performance, Inc. (&ldquo;Mettle Performance,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a company incorporated in the United States.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              If you are under 18, a parent or guardian must review and agree to these Terms on your behalf before you access any paid Services. Use of the free First Read intake by users ages 13&ndash;17 is permitted as described in Section 4.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">2. Who Can Use knwn.to</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">To use knwn.to you must:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Be at least 13 years old</li>
              <li>Provide accurate information when completing the intake</li>
              <li>Use the Services only for lawful, personal purposes</li>
            </ul>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              Users under 13 are not permitted to use the Site or submit any information. If we discover a user is under 13, we will delete their information and terminate access immediately.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              Users ages 13&ndash;17 may complete the First Read intake and receive their athlete profile. Access to paid features requires verified parental or guardian consent before any transaction is processed.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">3. The First Read</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              The First Read is a guided intake experience that produces a personalized athlete profile (&ldquo;athlete.md&rdquo;) based on your responses. It is provided for informational and developmental purposes only.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              The First Read is not a clinical assessment, psychological evaluation, or medical service. It does not replace professional coaching, sports psychology, therapy, or medical advice. Results are based solely on the information you provide and are intended to support self-reflection, not to diagnose, treat, or prescribe anything.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We make no guarantee that the First Read will produce a specific outcome or result in improved athletic performance.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">4. Minor Users (Ages 13&ndash;17)</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              Athletes ages 13&ndash;17 may complete the First Read intake and receive their athlete profile at no charge. By completing the intake, you represent that you are at least 13 years old.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              <strong className="text-[#1A1A1A]">Paid services are not available to users under 18 without parental consent.</strong> If you are under 18 and wish to access any paid feature, coaching service, or subscription, a parent or guardian must provide verified consent before any payment is processed.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              Parents and guardians: by providing consent, you agree to these Terms on behalf of your minor child and take responsibility for their use of paid Services.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">5. Your Content</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              When you complete the First Read intake, you provide responses to a series of questions (&ldquo;Your Content&rdquo;). You retain ownership of Your Content.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              By submitting Your Content, you grant Mettle Performance a limited, non-exclusive license to use it solely to deliver your athlete profile and related Services. We do not use Your Content for advertising, sell it to third parties, or share it with coaches, parents, or anyone else without your explicit direction.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We may use aggregated, anonymized data derived from intake responses to improve the quality of the First Read. This data cannot be used to identify you.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">6. Intellectual Property</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              All content on knwn.to &mdash; including the First Read questions, athlete profile format, design, copy, and methodology &mdash; is the property of Mettle Performance, Inc. and is protected by copyright and other intellectual property laws.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              You may not reproduce, distribute, modify, or create derivative works from any part of the Site or Services without our written permission.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              Your athlete profile (athlete.md) is yours. You may use it, share it, or keep it private as you choose.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">7. Paid Services</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">Certain features of knwn.to may require payment. When you purchase a paid service, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 font-body text-[#3D3935]">
              <li>Provide accurate billing information</li>
              <li>Pay all applicable fees</li>
              <li>Authorize us to charge your payment method</li>
            </ul>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              All fees are stated in US dollars. We use third-party payment processors and do not store your full payment card details.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              <strong className="text-[#1A1A1A]">Refunds.</strong> If you are unsatisfied with a paid service, contact us at{" "}
              <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a> within 14 days of purchase. We will review refund requests on a case-by-case basis.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              Users under 18 may not purchase paid services without verified parental or guardian consent.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">8. Prohibited Conduct</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 font-body text-[#3D3935]">
              <li>Use the Site for any unlawful purpose</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Attempt to gain unauthorized access to any part of the Site or Services</li>
              <li>Scrape, copy, or reproduce the First Read questions or methodology</li>
              <li>Use the Services in any way that could harm Mettle Performance or other users</li>
            </ul>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">9. Disclaimers</h2>
            <div className="bg-[#EDE8DF] rounded-md px-5 py-4">
              <p className="text-sm font-body text-[#3D3935] leading-relaxed mb-3">
                THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. METTLE PERFORMANCE DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
              </p>
              <p className="text-sm font-body text-[#3D3935] leading-relaxed">
                THE FIRST READ IS FOR INFORMATIONAL AND DEVELOPMENTAL PURPOSES ONLY. IT IS NOT A SUBSTITUTE FOR PROFESSIONAL COACHING, PSYCHOLOGICAL COUNSELING, OR MEDICAL ADVICE.
              </p>
            </div>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">10. Limitation of Liability</h2>
            <div className="bg-[#EDE8DF] rounded-md px-5 py-4">
              <p className="text-sm font-body text-[#3D3935] leading-relaxed mb-3">
                TO THE FULLEST EXTENT PERMITTED BY LAW, METTLE PERFORMANCE, INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-sm font-body text-[#3D3935] leading-relaxed">
                OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>
            </div>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">11. Indemnification</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              You agree to indemnify and hold harmless Mettle Performance, Inc. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&rsquo; fees) arising out of your use of the Services, your violation of these Terms, or your violation of any third-party rights.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">12. Governing Law and Disputes</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              These Terms are governed by the laws of the State of California, without regard to its conflict of law principles.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              Any dispute arising out of or related to these Terms or the Services that cannot be resolved informally shall be submitted to binding arbitration under the rules of the American Arbitration Association, conducted in Los Angeles County, California. You waive any right to a jury trial or class action proceeding.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              Nothing in this section prevents either party from seeking injunctive or other equitable relief in a court of competent jurisdiction.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">13. Changes to These Terms</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page with a new effective date. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">14. Termination</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">
              We reserve the right to suspend or terminate your access to the Services at any time, for any reason, with or without notice &mdash; including if we believe you have violated these Terms.
            </p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              You may stop using the Services at any time. To request deletion of your account or data, contact{" "}
              <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a>.
            </p>
          </section>

          <section className="pb-10 mb-10 border-b border-[#D4C9B8]">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">15. Entire Agreement</h2>
            <p className="font-body text-[#3D3935] leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Mettle Performance, Inc. regarding your use of the Services and supersede any prior agreements.
            </p>
          </section>

          <section className="pb-10 mb-10">
            <h2 className="font-display text-xl text-[#1A1A1A] mb-5">16. Contact</h2>
            <p className="font-body text-[#3D3935] leading-relaxed mb-4">For questions about these Terms, contact us at:</p>
            <p className="font-body text-[#3D3935] leading-relaxed">
              <a href="mailto:privacy@knwn.to" className="text-[#B8821A] hover:underline">privacy@knwn.to</a><br />
              Mettle Performance, Inc.
            </p>
          </section>

        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#D4C9B8] flex gap-8">
          <Link
            href="/privacy"
            className="font-mono text-xs tracking-widest uppercase text-[#B8821A] hover:opacity-70 transition-opacity"
          >
            Privacy Policy →
          </Link>
        </div>

      </div>
    </main>
  );
}
