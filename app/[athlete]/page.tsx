import { Metadata } from "next";

type Props = { params: Promise<{ athlete: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { athlete } = await params;
  return {
    title: `${athlete} - knwn.to`,
    description: `Athlete profile for ${athlete} on knwn.to`,
  };
}

export default async function AthletePage({ params }: Props) {
  const { athlete } = await params;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-[#0a0a0a]">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="mb-16">
          <a href="/" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
            Back to knwn.to
          </a>
        </div>
        <div className="space-y-4">
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <p className="text-sm text-gray-400 font-mono">/{athlete}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Profile coming soon
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
            We are building something special. Athlete profiles will showcase your complete story — performance data, readiness metrics, and growth over time.
          </p>
        </div>
        <div className="pt-8">
          <a href="/" className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all">
            Join the waitlist
          </a>
        </div>
      </div>
    </main>
  );
}
