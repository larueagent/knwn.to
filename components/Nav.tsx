"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="px-6 py-5 flex items-center justify-between border-b border-[#E0D9CE] bg-parchment relative z-50">
        <Link href="/">
          <Image
            src="/knwn.to%20logo%20black.png"
            alt="knwn.to"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            Field Notes
          </Link>
          <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            The Book
          </Link>
          <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            by LaRue
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#8A8178] transition-all duration-200 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#8A8178] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#8A8178] transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden bg-parchment border-b border-[#E0D9CE] px-6 py-4 flex flex-col gap-4 z-40">
          <Link
            href="/field-notes"
            className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase"
            onClick={() => setOpen(false)}
          >
            Field Notes
          </Link>
          <Link
            href="/book"
            className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase"
            onClick={() => setOpen(false)}
          >
            The Book
          </Link>
          <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            by LaRue
          </span>
        </div>
      )}
    </>
  );
}
