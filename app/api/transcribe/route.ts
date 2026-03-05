import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as File | null;

    if (!audio) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Forward to OpenAI Whisper
    const openaiForm = new FormData();
    openaiForm.append("file", audio, "recording.webm");
    openaiForm.append("model", "whisper-1");
    openaiForm.append("language", "en");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: openaiForm,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Whisper API error:", err);
      return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error("Transcription route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
