import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export async function POST(request: Request) {
  const data = await request.json()
  const transcription = data["transcription"]
  const response = await fetch("http://127.0.0.1:5000")
  const response_data = await response.json()
  console.log(response_data)
  const scam = response_data["scam"]
  console.log(scam)
  await fetchMutation(api.transcriptions.createTranscription, { transcription: transcription, scam: scam })
  return Response.json({ success: false, status: scam })
}