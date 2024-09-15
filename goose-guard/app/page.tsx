"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      {/* Top Navigation Bar */}
      <nav className="w-full max-w-screen-lg flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-green-400">GooseGuard</h1>
        <ul className="flex gap-6">
          <li>
            <a className="hover:text-green-400" href="#features">
              Features
            </a>
          </li>
          <li>
            <a className="hover:text-green-400" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="hover:text-green-400" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-green-400 mt-4 mb-4">GooseGuard</h1>
        <p className="text-lg text-gray-300 max-w-md mb-8">
          Protect yourself from scam emails, texts, and calls with our AI-powered cybersecurity platform.
        </p>

        {/* Log In Button */}
        <button 
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={() => router.push('/try')}
        >
          Log In
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-screen-lg flex justify-between items-center p-4 mt-16 bg-gray-800 rounded-lg shadow-md">
        <p className="text-sm text-gray-400">© 2024 GooseGuard. All rights reserved.</p>
        <ul className="flex gap-4">
          <li>
            <a
              className="hover:text-green-400"
              href="#privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              className="hover:text-green-400"
              href="#terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
