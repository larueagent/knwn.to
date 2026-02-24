"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-[#0a0a0a]">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
          Your story, all of it.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          knwn.to is the athlete identity platform. Not just your highlights — your readiness, your composure, your growth.
        </p>
        <div className="pt-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={submitted}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={submitted}
              className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {submitted ? "Added to waitlist" : "Get early access"}
            </button>
          </form>
        </div>
        <div className="pt-16">
          <p className="text-sm text-gray-600">Built for athletes who know there is more to the story.</p>
        </div>
      </div>
    </main>
  );
}
