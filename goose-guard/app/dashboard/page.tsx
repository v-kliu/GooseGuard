"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import for logos

// Import logos
import gooseGuardLogo from './../gooseGuardLogo.png';
import hackTheNorthLogo from './../hackthenorth.jpg';

export default function Dashboard() {
  const router = useRouter();

  // State to hold the statistics
  const [totalScams, setTotalScams] = useState(125);
  const [emailScams, setEmailScams] = useState(65);
  const [callScams, setCallScams] = useState(30);
  const [textScams, setTextScams] = useState(30);

  // State for dropdowns
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);

  // Dummy data for scam entries
  const emailScamList = [
    { timestamp: '2024-09-01 10:30 AM', content: 'Scam Email 1: "You have won a prize!"' },
    { timestamp: '2024-09-02 02:45 PM', content: 'Scam Email 2: "Your account has been compromised."' },
    { timestamp: '2024-09-03 11:15 AM', content: 'Scam Email 3: "Urgent: Payment required."' },
  ];
  const callScamList = [
    { timestamp: '2024-09-04 09:20 AM', content: 'Scam Call 1: "Your car warranty is about to expire."' },
    { timestamp: '2024-09-05 01:00 PM', content: 'Scam Call 2: "We are from the IRS."' },
  ];
  const textScamList = [
    { timestamp: '2024-09-06 08:30 AM', content: 'Scam Text 1: "You have a package waiting."' },
    { timestamp: '2024-09-07 12:15 PM', content: 'Scam Text 2: "Confirm your bank details."' },
    { timestamp: '2024-09-08 03:45 PM', content: 'Scam Text 3: "Your account is locked."' },
    { timestamp: '2024-09-09 06:10 PM', content: 'Scam Text 4: "Click here to claim your reward."' },
  ];

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#0d0d0d] text-white p-8">
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

      <h1 className="text-4xl font-bold text-green-400 mb-12 mt-20">Dashboard</h1>

      {/* Scam Statistics Boxes */}
      <div className="flex justify-between w-full max-w-5xl mb-12 gap-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-1/4">
          <h2 className="text-2xl font-bold text-green-400">Total Scams</h2>
          <p className="text-3xl font-bold mt-2">{totalScams}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-1/4">
          <h2 className="text-2xl font-bold text-green-400">Email Scams</h2>
          <p className="text-3xl font-bold mt-2">{emailScams}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-1/4">
          <h2 className="text-2xl font-bold text-green-400">Call Scams</h2>
          <p className="text-3xl font-bold mt-2">{callScams}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-1/4">
          <h2 className="text-2xl font-bold text-green-400">Text Scams</h2>
          <p className="text-3xl font-bold mt-2">{textScams}</p>
        </div>
      </div>

      {/* Dropdowns for Scam Lists */}
      <div className="w-full max-w-5xl">
        {/* Email Scams Dropdown */}
        <div className="bg-gray-800 p-4 mb-4 rounded-lg shadow-md">
          <button
            className="w-full text-left text-lg font-bold text-green-400"
            onClick={() => setIsEmailOpen(!isEmailOpen)}
          >
            Email Scams {isEmailOpen ? "▲" : "▼"}
          </button>
          {isEmailOpen && (
            <div className="mt-2">
              {emailScamList.map((scam, index) => (
                <div key={index} className="bg-gray-700 p-2 mt-2 rounded-md">
                  <p className="text-sm text-gray-300">{scam.timestamp}</p>
                  <p className="text-white">{scam.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call Scams Dropdown */}
        <div className="bg-gray-800 p-4 mb-4 rounded-lg shadow-md">
          <button
            className="w-full text-left text-lg font-bold text-green-400"
            onClick={() => setIsCallOpen(!isCallOpen)}
          >
            Call Scams {isCallOpen ? "▲" : "▼"}
          </button>
          {isCallOpen && (
            <div className="mt-2">
              {callScamList.map((scam, index) => (
                <div key={index} className="bg-gray-700 p-2 mt-2 rounded-md">
                  <p className="text-sm text-gray-300">{scam.timestamp}</p>
                  <p className="text-white">{scam.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Text Scams Dropdown */}
        <div className="bg-gray-800 p-4 mb-4 rounded-lg shadow-md">
          <button
            className="w-full text-left text-lg font-bold text-green-400"
            onClick={() => setIsTextOpen(!isTextOpen)}
          >
            Text Scams {isTextOpen ? "▲" : "▼"}
          </button>
          {isTextOpen && (
            <div className="mt-2">
              {textScamList.map((scam, index) => (
                <div key={index} className="bg-gray-700 p-2 mt-2 rounded-md">
                  <p className="text-sm text-gray-300">{scam.timestamp}</p>
                  <p className="text-white">{scam.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
