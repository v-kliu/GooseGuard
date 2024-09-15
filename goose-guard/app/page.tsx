"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component for images

// Import logos for the footer
import logoLoo from './waterlooLogo.jpg';
import logoFaisal from './guelphLogo.jpg';
import logoVictor from './washingtonLogo.png';
import hackTheNorthLogo from './hackthenorth.jpg'; // Add the Hack the North logo

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update the mouse position when it moves
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Names of the team members for the footer
  const names = [
    { logo: logoLoo, name: 'Harrum N.', color: '#gray-300' },
    { logo: logoVictor, name: 'Victor L.', color: '#gray-300' },
    { logo: logoFaisal, name: 'Faisal F.', color: '#gray-300' },
    { logo: logoLoo, name: 'Emily P.', color: '#gray-300' },
  ];

  useEffect(() => {
    const matrixEffect = document.getElementById('matrix-effect') as HTMLCanvasElement;
    let animationFrameId: number;
    let drops: number[] = [];
    let scamTimers: number[] = []; // Track the duration for each "SCAM" column

    if (matrixEffect) {
      const resizeCanvas = () => {
        matrixEffect.width = window.innerWidth;
        matrixEffect.height = window.innerHeight;

        const fontSize = 14; // Adjust font size
        const columns = Math.floor(window.innerWidth / fontSize);
        drops = Array(columns).fill(1);
        scamTimers = Array(columns).fill(0); // Initialize scamTimers with zeros
      };

      resizeCanvas(); // Set initial canvas size

      const draw = () => {
        const ctx = matrixEffect.getContext('2d');
        if (ctx) {
          const fontSize = 14;
          ctx.fillStyle = 'rgba(0, 13, 0, 0.05)'; // Dark green background fade effect
          ctx.fillRect(0, 0, matrixEffect.width, matrixEffect.height);

          for (let i = 0; i < drops.length; i++) {
            // Check if the current column is in "SCAM" mode
            if (scamTimers[i] > 0) {
              // If "SCAM" mode is active, display "SCAM" and reduce the timer
              ctx.fillStyle = 'red'; // Red color for "SCAM"
              ctx.font = `bold ${fontSize}px monospace`;
              ctx.fillText('SCAM', i * fontSize, drops[i] * fontSize);
              scamTimers[i]--; // Reduce the timer to slow down the update speed
            } else {
              // Display regular matrix characters
              ctx.fillStyle = '#006400'; // Dark green color for "0" and "1"
              const text = '01'[Math.floor(Math.random() * 2)];
              ctx.font = `bold ${fontSize}px monospace`;
              ctx.fillText(text, i * fontSize, drops[i] * fontSize);

              // Randomly switch this column to "SCAM" mode
              if (Math.random() > 0.998) {
                scamTimers[i] = 80; // Set timer for how long "SCAM" will be displayed
              }
            }

            // Reset drop position
            if (drops[i] * fontSize > matrixEffect.height && Math.random() > 0.975) {
              drops[i] = 0;
            }

            // Increase drop position more slowly if in "SCAM" mode
            if (scamTimers[i] > 0) {
              drops[i] += 0.01; // Slower movement for "SCAM"
            } else {
              drops[i]++;
            }
          }
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      draw(); // Start the animation

      window.addEventListener('resize', resizeCanvas); // Handle window resize

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Matrix background effect */}
      <canvas
        id="matrix-effect"
        className="absolute inset-0 w-full h-full pointer-events-none"
      ></canvas>

      {/* Mouse illumination effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0, 255, 0, 0.6) 0%,    
            rgba(0, 128, 0, 0.4) 6%,   
            rgba(0, 0, 0, 0.8) 20%,         
            rgba(0, 0, 0, 0.95) 30%         
          )`,
        }}
      ></div>

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full flex justify-center items-center gap-x-4 p-4 bg-gray-700 shadow-md z-10">
        <Image src={hackTheNorthLogo} alt="Hack the North Logo" className="w-8 h-8" />
        <p className="text-lg text-gray-300">Made with ♥ at Hack the North</p>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center relative z-10 mt-20 mb-20">
        <h1 className="text-5xl font-bold text-green-400 mt-4 mb-4">GooseGuard</h1>
        <p className="text-lg text-gray-300 max-w-md mb-8">
          Protect yourself from scam emails, texts, and calls with our AI-powered cybersecurity platform.
        </p>

        {/* Log In Button */}
        <button
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={() => router.push('/try')}
        >
          Try Now!
        </button>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full flex flex-col bg-gray-700 border-t border-gray-600 py-2">
        <div className="flex justify-around items-center h-full min-h-8">
          {names.map((person, index) => (
            <div key={index} className="flex items-center space-x-2 h-full">
              <Image src={person.logo} alt={`${person.name} Logo`} className="w-6 h-6" />
              <h1 className="text-sm" style={{ color: person.color }}>
                {person.name}
              </h1>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
