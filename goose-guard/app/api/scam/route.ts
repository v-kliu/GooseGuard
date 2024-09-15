import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export async function POST(request: Request) {
  const data = await request.json()
  const transcription = data["transcription"]
  const scam = false // Query AI/ML model here
  await fetchMutation(api.transcriptions.createTranscription, { transcription: transcription, scam: scam })
  return Response.json({ success: false, scam: scam })
}