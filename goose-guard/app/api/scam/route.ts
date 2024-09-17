import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import * as dotenv from 'dotenv';
dotenv.config();

export async function POST(request: Request) {
  const data = await request.json()
  let transcription = data["transcription"]
  const response = await fetch("https://api-inference.huggingface.co/models/zelchy/scam-detection", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: transcription })
  })
  const response_data = await response.json()
  console.log(response_data)
  let scam = false;
  if (response.ok) {
    scam = response_data[0][0]["label"] == "LABEL_1" ? true : false;
    console.log(scam)
  } else {
    transcription = response_data["error"] + ` with an ETA of: ${response_data?.["estimated_time"]}ms`
  }
  await fetchMutation(api.transcriptions.createTranscription, { transcription: transcription, scam: scam })
  return Response.json({ success: true, status: scam, transcription: transcription })
}