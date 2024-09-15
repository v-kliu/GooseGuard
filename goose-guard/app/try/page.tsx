"use client";

import { useState, useRef } from 'react';

export default function Try() {
  const [isRecording, setIsRecording] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);
  const [scamStatus, setScamStatus] = useState<'Scam' | 'Not Scam'>();
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Handle microphone recording
  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setIsInputSubmitted(true);
      simulateScamDetection();
    } else {
      // Start recording
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

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          setMessages(['Audio recording saved']);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing the microphone:', error);
      }
    }
  };

  // Handle file upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages([`Uploaded: ${file.name}`]);
      setIsInputSubmitted(true);
      simulateScamDetection();
    }
  };

  // Handle text input submission
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setMessages([textInput]);
      setTextInput(''); // Clear the input after submission
      setIsInputSubmitted(true);
      simulateScamDetection();
    }
  };

  // Adjust the height of the textarea dynamically
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setTextInput(textarea.value);

    // Reset height to auto to correctly calculate scrollHeight
    textarea.style.height = 'auto';
    // Set height to match scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Simulate scam detection
  const simulateScamDetection = () => {
    // Simulate a simple random scam detection for demonstration
    const status = Math.random() > 0.5 ? 'Scam' : 'Not Scam';
    setScamStatus(status);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-12">Try GooseGuard</h1>

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
              style={{ overflow: 'hidden' }} // Hide overflow for a smoother expansion
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
              scamStatus === 'Scam' ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {scamStatus}
          </div>
        </div>
      )}
    </div>
  );
}
