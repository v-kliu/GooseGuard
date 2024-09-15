"use client";

import { useState } from 'react';

export default function Try() {
  const [isRecording, setIsRecording] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // Handle microphone recording
  const handleRecord = () => {
    if (isRecording) {
      // Simulate stopping recording and add a message
      setMessages((prevMessages) => [...prevMessages, 'Audio recording stopped']);
      setIsRecording(false);
    } else {
      // Simulate starting recording
      setIsRecording(true);
    }
  };

  // Handle file upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages((prevMessages) => [...prevMessages, `Uploaded: ${file.name}`]);
    }
  };

  // Handle text input submission
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setMessages((prevMessages) => [...prevMessages, textInput]);
      setTextInput(''); // Clear the input after submission
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-12">Try GooseGuard</h1>

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
          <span>Upload .mp3</span>
        </label>

        {/* Text Input (Dynamic Textarea) */}
        <div className="flex items-center bg-gray-800 p-4 w-full rounded-lg shadow-md">
          <textarea
            placeholder="Type a message..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={1}
            className="bg-transparent text-white w-full resize-none outline-none placeholder-gray-400 px-2"
            style={{ height: `${Math.min(200, textInput.split('\n').length * 20)}px` }} // Dynamic height
          />
          <button
            onClick={handleTextSubmit}
            className="ml-2 bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-4 rounded-lg shadow-md"
          >
            Send
          </button>
        </div>
      </div>

      {/* Display Messages */}
      <div className="mt-8 w-full max-w-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 mb-2 rounded-lg shadow-md"
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
