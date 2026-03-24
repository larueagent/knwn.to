"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavProps {
  variant?: "light" | "dark";
}

export default function Nav({ variant = "light" }: NavProps) {
  const [open, setOpen] = useState(false);

  const isDark = variant === "dark";

  const logoSrc = isDark ? "/knwn.to-logo-white.png" : "/knwn.to-logo-black.png";
  const textColor = isDark ? "text-[#E8E0D5]" : "text-[#1A1714]";
  const mutedColor = isDark ? "text-[#8A8178]" : "text-[#8A8178]";
  const bgColor = isDark ? "bg-[#0D0C0B]" : "bg-[#F5F0E8]";
  const borderColor = isDark ? "border-[#2A2825]" : "border-[#E0D9CE]";
  const barColor = isDark ? "bg-[#E8E0D5]" : "bg-[#1A1714]";

  return (
    <nav className="relative flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={logoSrc} alt="knwn.to" width={100} height={30} priority />
      </Link>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-8">
        <Link href="/field-notes" className={`font-mono text-xs tracking-widest uppercase ${textColor} hover:opacity-70 transition-opacity`}>
          Field Notes
        </Link>
        <Link href="/book" className={`font-mono text-xs tracking-widest uppercase ${textColor} hover:opacity-70 transition-opacity`}>
          The Book
        </Link>
        <span className={`font-mono text-xs tracking-widest uppercase ${mutedColor}`}>
          by LaRue
        </span>
        <Link
          href="/first-read"
          className="bg-[#B8821A] text-white font-syne font-semibold text-sm px-5 py-2 rounded hover:bg-[#a07115] transition-colors"
        >
          Start Here
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 ${barColor} transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-5 h-0.5 ${barColor} transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 ${barColor} transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className={`sm:hidden absolute top-full left-0 right-0 ${bgColor} border-b ${borderColor} px-6 py-4 flex flex-col gap-4 z-50`}>
          <Link href="/field-notes" onClick={() => setOpen(false)} className={`font-mono text-xs tracking-widest uppercase ${textColor} hover:opacity-70 transition-opacity`}>
            Field Notes
          </Link>
          <Link href="/book" onClick={() => setOpen(false)} className={`font-mono text-xs tracking-widest uppercase ${textColor} hover:opacity-70 transition-opacity`}>
            The Book
          </Link>
          <Link href="/first-read" onClick={() => setOpen(false)} className={`font-mono text-xs tracking-widest uppercase ${textColor} hover:opacity-70 transition-opacity`}>
            Start Here
          </Link>
        </div>
      )}
    </nav>
  );
}
