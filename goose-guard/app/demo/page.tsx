"use client"
import { useState, FormEvent, ChangeEvent } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const upload_response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const upload_response_data = await upload_response.json()
    if (!upload_response_data["success"]) return;

    const scam_response = await fetch('/api/scam', {
      method: 'POST',
      body: JSON.stringify({ "transcription": upload_response_data["transcription"] })
    })
    const scam_response_data = await scam_response.json()
  };

  return (
    <main>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
