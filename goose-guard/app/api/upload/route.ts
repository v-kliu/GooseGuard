import * as dotenv from 'dotenv';
dotenv.config();
import Groq from "groq-sdk";

// Initialize the Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  const data = await request.formData()
  const file = data.get("file") as File
  if (file && file.type.startsWith("audio/")) {
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "distil-whisper-large-v3-en",
      response_format: "verbose_json",
    });
    return Response.json({ success: true, transcription: transcription.text })
  }
  
  return Response.json({ success: false })
}