"use client";

import { useState, useRef, useCallback } from "react";

type MicState = "idle" | "recording" | "transcribing" | "error";

interface MicButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function MicButton({ onTranscript, disabled }: MicButtonProps) {
  const [state, setState] = useState<MicState>("idle");
  const [bars, setBars] = useState([0.3, 0.5, 0.4, 0.6, 0.35, 0.5, 0.4]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const animateBars = useCallback((analyser: AnalyserNode) => {
    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const newBars = Array.from({ length: 7 }, (_, i) => {
        const idx = Math.floor((i / 7) * data.length * 0.5);
        return Math.max(0.15, data[idx] / 255);
      });
      setBars(newBars);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const stopAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setBars([0.3, 0.5, 0.4, 0.6, 0.35, 0.5, 0.4]);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      animateBars(analyser);

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stopAnimation();
        setState("transcribing");

        const blob = new Blob(chunksRef.current, { type: mimeType });
        const form = new FormData();
        form.append("audio", blob, "recording.webm");

        try {
          const res = await fetch("/api/transcribe", { method: "POST", body: form });
          const json = await res.json();
          if (json.text) {
            onTranscript(json.text.trim());
            setState("idle");
          } else {
            setState("error");
          }
        } catch {
          setState("error");
        } finally {
          stream.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setState("recording");
    } catch {
      setState("error");
    }
  }, [animateBars, stopAnimation, onTranscript]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const handleClick = () => {
    if (state === "recording") {
      stopRecording();
    } else if (state === "idle" || state === "error") {
      startRecording();
    }
  };

  const label =
    state === "recording"
      ? "Stop recording"
      : state === "transcribing"
      ? "Transcribing..."
      : state === "error"
      ? "Try again"
      : "Record answer";

  const isActive = state === "recording";
  const isBusy = state === "transcribing";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isBusy}
        aria-label={label}
        className={[
          "relative flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7355]",
          isActive
            ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
            : isBusy
            ? "bg-[#F5F0E8] border-[#D4C5A9] text-[#8B7355] cursor-wait"
            : state === "error"
            ? "bg-red-50 border-red-300 text-red-500"
            : "bg-white border-[#D4C5A9] text-[#8B7355] hover:border-[#8B7355] hover:bg-[#F5F0E8]",
        ].join(" ")}
      >
        {isBusy ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : isActive ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="2" width="10" height="10" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="5" y="1" width="6" height="9" rx="3" />
            <path d="M2 7.5A6 6 0 0014 7.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="8" y1="13.5" x2="8" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5.5" y1="14.5" x2="10.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        {isActive && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#1A1A1A] opacity-20" />
        )}
      </button>

      {isActive && (
        <div className="flex items-center gap-[3px] h-7" aria-hidden>
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-[#8B7355] transition-all duration-75"
              style={{ height: `${Math.round(h * 28)}px` }}
            />
          ))}
        </div>
      )}

      <span className="font-inter text-xs text-[#8B7355]">{label}</span>
    </div>
  );
}
