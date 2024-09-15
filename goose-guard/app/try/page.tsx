"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component for logos

// Import the logo images
import gooseGuardLogo from './../gooseGuardLogo.png';
import hackTheNorthLogo from './../hackthenorth.jpg';

export default function Try() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);
  const [scamStatus, setScamStatus] = useState<'Scam' | 'Not Scam' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Handle microphone recording
  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          setMessages(['']);

          // Send the audio blob to the server for transcription
          await handleAudioUpload(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing the microphone:', error);
      }
    }
  };

  // Handle audio upload (recorded audio)
  const handleAudioUpload = async (audioBlob: Blob) => {
    setIsInputSubmitted(true);

    // Prepare the form data to send the recorded audio
    const formData = new FormData();
    formData.append('file', audioBlob, 'recorded_audio.wav');

    try {
      // Upload the audio to get the transcription
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) {
        setMessages(['Failed to transcribe the audio']);
        return;
      }

      // Display the transcription result
      setMessages([uploadData.transcription]);

      // Now, send the transcription to the scam API
      const scamResponse = await fetch('/api/scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcription: uploadData.transcription }),
      });

      const scamData = await scamResponse.json();
      setScamStatus(scamData.status);
    } catch (error) {
      console.error('Error uploading audio:', error);
      setMessages(['Failed to process the recorded audio']);
    }
  };

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsInputSubmitted(true);

      setMessages(['']);
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // Upload the file to get the transcription
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          setMessages(['Failed to transcribe the uploaded file']);
          return;
        }

        // Display the transcription result
        setMessages([uploadData.transcription]);

        // Now, send the transcription to the scam API
        const scamResponse = await fetch('/api/scam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcription: uploadData.transcription }),
        });

        const scamData = await scamResponse.json();
        setScamStatus(scamData.status);
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessages(['Failed to process the uploaded file']);
      }
    }
  };

  // Handle text input submission
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setMessages([textInput]);
      setTextInput('');
      setIsInputSubmitted(true);
      semiScamDetection(textInput);
    }
  };

  // Adjust the height of the textarea dynamically
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setTextInput(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Scam detection for uploaded files (optional)
  const scamDetection = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const uploadData = await uploadResponse.json();
    if (!uploadData.success) return;
    semiScamDetection(uploadData.transcription)
  };

  const semiScamDetection = async (transcription: string) => {
    const scamResponse = await fetch('/api/scam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcription: transcription }),
    });
    const scamData = await scamResponse.json();
    setScamStatus(scamData.status);
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white p-8 overflow-hidden">
      {/* Nav Bar */}
      <nav className="absolute top-0 w-full flex items-center justify-between p-4 bg-gray-700 shadow-md z-10">
        {/* Left-aligned GooseGuard Logo */}
        <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src={gooseGuardLogo} alt="GooseGuard Logo" className="w-8 h-8 invert" />
          <p className="text-lg text-gray-300">GooseGuard</p>
        </div>
        
        {/* Center-aligned Hack the North Logo */}
        <div className="flex items-center gap-x-4">
          <Image src={hackTheNorthLogo} alt="Hack the North Logo" className="w-8 h-8" />
          <p className="text-lg text-gray-300">Made with ♥ at Hack the North</p>
        </div>
      </nav>

      <h1 className="text-4xl font-bold text-green-400 mb-12 mt-20">Try GooseGuard</h1>

      {/* Conditional rendering: Show buttons if no input has been submitted */}
      {!isInputSubmitted && (
        <div className="flex flex-col gap-4 w-full max-w-md items-center">
          {/* Microphone Button */}
          <button
            onClick={handleRecord}
            className={`flex items-center justify-center bg-gray-800 hover:bg-gray-700 p-6 w-full rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              isRecording ? 'bg-red-600' : ''
            }`}
          >
            <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
          </button>

          {/* Upload Button */}
          <label className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 p-6 w-full rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer">
            <input
              type="file"
              accept=".mp3"
              onChange={handleUpload}
              className="hidden"
            />
            <span>Upload Audio File</span>
          </label>

          {/* Text Input (Dynamic Textarea) */}
          <div className="flex items-center bg-gray-800 p-4 w-full rounded-lg shadow-md">
            <textarea
              ref={textareaRef}
              placeholder="Type a message..."
              value={textInput}
              onChange={handleTextChange}
              rows={1}
              className="bg-transparent text-white w-full resize-none outline-none placeholder-gray-400 px-2"
              style={{ overflow: 'hidden' }}
            />
            <button
              onClick={handleTextSubmit}
              className="ml-2 bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-4 rounded-lg shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Display Messages */}
      {isInputSubmitted && (
        <div className="mt-8 w-full max-w-md">
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-800 p-4 mb-2 rounded-lg shadow-md">
              {message}
            </div>
          ))}

          {/* Audio Player if an audio file is recorded */}
          {audioURL && (
            <audio controls className="mt-4 w-full">
              <source src={audioURL} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}

          {/* Scam Detection Result */}
          <div
            className={`mt-4 p-4 text-center text-xl font-bold rounded-lg ${
              scamStatus ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {scamStatus ? 'Scam' : 'Not Scam'}
          </div>
        </div>
      )}
    </div>
  );
}
