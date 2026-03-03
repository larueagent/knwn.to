import Link from "next/link";

export const metadata = {
  title: "Terms of Service — knwn.to",
  description: "The terms governing your use of knwn.to and the First Read, operated by Mettle Performance, Inc.",
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
        <div>

          <H2>1. Agreement to These Terms</H2>
          <P>
            By accessing or using knwn.to (the &ldquo;Site&rdquo;) or any related services (the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Site or Services.
          </P>
          <P>
            These Terms constitute a binding agreement between you and Mettle Performance, Inc. (&ldquo;Mettle Performance,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a company incorporated in the United States.
          </P>
          <P>
            If you are under 18, a parent or guardian must review and agree to these Terms on your behalf before you access any paid Services. Use of the free First Read intake by users ages 13&ndash;17 is permitted as described in Section 4.
          </P>

          <HR />

          <H2>2. Who Can Use knwn.to</H2>
          <P>To use knwn.to you must:</P>
          <UL>
            <LI>Be at least 13 years old</LI>
            <LI>Provide accurate information when completing the intake</LI>
            <LI>Use the Services only for lawful, personal purposes</LI>
          </UL>
          <P>
            Users under 13 are not permitted to use the Site or submit any information. If we discover a user is under 13, we will delete their information and terminate access immediately.
          </P>
          <P>
            Users ages 13&ndash;17 may complete the First Read intake and receive their athlete profile. Access to paid features requires verified parental or guardian consent before any transaction is processed.
          </P>

          <HR />

          <H2>3. The First Read</H2>
          <P>
            The First Read is a guided intake experience that produces a personalized athlete profile (&ldquo;athlete.md&rdquo;) based on your responses. It is provided for informational and developmental purposes only.
          </P>
          <P>
            The First Read is not a clinical assessment, psychological evaluation, or medical service. It does not replace professional coaching, sports psychology, therapy, or medical advice. Results are based solely on the information you provide and are intended to support self-reflection, not to diagnose, treat, or prescribe anything.
          </P>
          <P>
            We make no guarantee that the First Read will produce a specific outcome or result in improved athletic performance.
          </P>

          <HR />

          <H2>4. Minor Users (Ages 13&ndash;17)</H2>
          <P>
            Athletes ages 13&ndash;17 may complete the First Read intake and receive their athlete profile at no charge. By completing the intake, you represent that you are at least 13 years old.
          </P>
          <P>
            <strong className="text-[#1A1A1A]">Paid services are not available to users under 18 without parental consent.</strong> If you are under 18 and wish to access any paid feature, coaching service, or subscription, a parent or guardian must provide verified consent before any payment is processed.
          </P>
          <P>
            Parents and guardians: by providing consent, you agree to these Terms on behalf of your minor child and take responsibility for their use of paid Services.
          </P>

          <HR />

          <H2>5. Your Content</H2>
          <P>
            When you complete the First Read intake, you provide responses to a series of questions (&ldquo;Your Content&rdquo;). You retain ownership of Your Content.
          </P>
          <P>
            By submitting Your Content, you grant Mettle Performance a limited, non-exclusive license to use it solely to deliver your athlete profile and related Services. We do not use Your Content for advertising, sell it to third parties, or share it with coaches, parents, or anyone else without your explicit direction.
          </P>
          <P>
            We may use aggregated, anonymized data derived from intake responses to improve the quality of the First Read. This data cannot be used to identify you.
          </P>

          <HR />

          <H2>6. Intellectual Property</H2>
          <P>
            All content on knwn.to &mdash; including the First Read questions, athlete profile format, design, copy, and methodology &mdash; is the property of Mettle Performance, Inc. and is protected by copyright and other intellectual property laws.
          </P>
          <P>
            You may not reproduce, distribute, modify, or create derivative works from any part of the Site or Services without our written permission.
          </P>
          <P>
            Your athlete profile (athlete.md) is yours. You may use it, share it, or keep it private as you choose.
          </P>

          <HR />

          <H2>7. Paid Services</H2>
          <P>Certain features of knwn.to may require payment. When you purchase a paid service, you agree to:</P>
          <UL>
            <LI>Provide accurate billing information</LI>
            <LI>Pay all applicable fees</LI>
            <LI>Authorize us to charge your payment method</LI>
          </UL>
          <P>
            All fees are stated in US dollars. We use third-party payment processors and do not store your full payment card details.
          </P>
          <P>
            <strong className="text-[#1A1A1A]">Refunds.</strong> If you are unsatisfied with a paid service, contact us at <A href="mailto:privacy@knwn.to">privacy@knwn.to</A> within 14 days of purchase. We will review refund requests on a case-by-case basis.
          </P>
          <P>Users under 18 may not purchase paid services without verified parental or guardian consent.</P>

          <HR />

          <H2>8. Prohibited Conduct</H2>
          <P>You agree not to:</P>
          <UL>
            <LI>Use the Site for any unlawful purpose</LI>
            <LI>Submit false, misleading, or fraudulent information</LI>
            <LI>Attempt to gain unauthorized access to any part of the Site or Services</LI>
            <LI>Scrape, copy, or reproduce the First Read questions or methodology</LI>
            <LI>Use the Services in any way that could harm Mettle Performance or other users</LI>
          </UL>

          <HR />

          <H2>9. Disclaimers</H2>
          <div className="bg-[#EDE8DF] border border-[#D4C9B8] rounded px-5 py-4 mb-4">
            <P className="mb-2">
              The services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind, express or implied. Mettle Performance does not warrant that the services will be uninterrupted, error-free, or free of harmful components.
            </P>
            <P className="mb-0">
              The First Read is for informational and developmental purposes only. It is not a substitute for professional coaching, psychological counseling, or medical advice.
            </P>
          </div>

          <HR />

          <H2>10. Limitation of Liability</H2>
          <div className="bg-[#EDE8DF] border border-[#D4C9B8] rounded px-5 py-4 mb-4">
            <P className="mb-2">
              To the fullest extent permitted by law, Mettle Performance, Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the services, even if we have been advised of the possibility of such damages.
            </P>
            <P className="mb-0">
              Our total liability to you for any claim arising out of these terms or the services shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
            </P>
          </div>

          <HR />

          <H2>11. Indemnification</H2>
          <P>
            You agree to indemnify and hold harmless Mettle Performance, Inc. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&rsquo; fees) arising out of your use of the Services, your violation of these Terms, or your violation of any third-party rights.
          </P>

          <HR />

          <H2>12. Governing Law and Disputes</H2>
          <P>
            These Terms are governed by the laws of the State of California, without regard to its conflict of law principles.
          </P>
          <P>
            Any dispute arising out of or related to these Terms or the Services that cannot be resolved informally shall be submitted to binding arbitration under the rules of the American Arbitration Association, conducted in Los Angeles County, California. You waive any right to a jury trial or class action proceeding.
          </P>
          <P>
            Nothing in this section prevents either party from seeking injunctive or other equitable relief in a court of competent jurisdiction.
          </P>

          <HR />

          <H2>13. Changes to These Terms</H2>
          <P>
            We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page with a new effective date. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.
          </P>

          <HR />

          <H2>14. Termination</H2>
          <P>
            We reserve the right to suspend or terminate your access to the Services at any time, for any reason, with or without notice &mdash; including if we believe you have violated these Terms.
          </P>
          <P>
            You may stop using the Services at any time. To request deletion of your account or data, contact <A href="mailto:privacy@knwn.to">privacy@knwn.to</A>.
          </P>

          <HR />

          <H2>15. Entire Agreement</H2>
          <P>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Mettle Performance, Inc. regarding your use of the Services and supersede any prior agreements.
          </P>

          <HR />

          <H2>16. Contact</H2>
          <P>For questions about these Terms, contact us at:</P>
          <P>
            <A href="mailto:privacy@knwn.to">privacy@knwn.to</A><br />
            Mettle Performance, Inc.
          </P>

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
