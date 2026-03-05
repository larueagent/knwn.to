"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/knwn.to-logo-black.png" alt="knwn.to" width={80} height={24} priority />
      </Link>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-6">
        <Link href="/field-notes" className="font-inter text-sm font-medium text-[#1A1714] hover:opacity-70 transition-opacity">Field Notes</Link>
        <Link href="/book" className="font-inter text-sm font-medium text-[#1A1714] hover:opacity-70 transition-opacity">The Book</Link>
        <span className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">by LaRue</span>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-[#1A1714] transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-5 h-0.5 bg-[#1A1714] transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-[#1A1714] transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-[#F5F0E8] border-b border-[#E0D9CE] px-6 py-4 flex flex-col gap-4 z-50">
          <Link href="/field-notes" onClick={() => setOpen(false)} className="font-inter text-sm font-medium text-[#1A1714] hover:opacity-70 transition-opacity">Field Notes</Link>
          <Link href="/book" onClick={() => setOpen(false)} className="font-inter text-sm font-medium text-[#1A1714] hover:opacity-70 transition-opacity">The Book</Link>
          <span className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">by LaRue</span>
        </div>
      )}
    </nav>
  );
}
