"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
 
// Dynamically import IconCloud with no SSR to improve initial load
const IconCloud = dynamic(() => import("./IconCloud"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
    </div>
  )
});
 
export default function Hero() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
 
    // Preload and cache scripts
    const preloadScript = (src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    };
 
    // Preload scripts
    preloadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
    preloadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js');
 
    // Load Vanta.js scripts with better error handling
    const loadVanta = async () => {
      try {
        // Load Three.js first
        if (!window.THREE) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
            script.onload = resolve;
            script.onerror = reject;
            script.async = true;
            document.head.appendChild(script);
          });
        }
 
        // Then load Vanta WAVES
        if (!window.VANTA) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js';
            script.onload = resolve;
            script.onerror = reject;
            script.async = true;
            document.head.appendChild(script);
          });
        }
 
        // Initialize Vanta WAVES effect with mobile optimizations
        if (window.VANTA && vantaRef.current) {
          vantaEffect.current = window.VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: !isMobile, // Disable mouse controls on mobile
            touchControls: true,
            gyroControls: false,
            minHeight: isMobile ? window.innerHeight : 200.00,
            minWidth: isMobile ? window.innerWidth : 200.00,
            scale: isMobile ? 0.8 : 1.00, // Smaller scale on mobile
            scaleMobile: 0.8,
            color: 0x60707, // Updated color as per your requirement
            shininess: 30,
            waveHeight: isMobile ? 15 : 20, // Smaller waves on mobile
            waveSpeed: 1.0,
            zoom: 0.65
          });
          setVantaLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load Vanta.js:', error);
        setVantaLoaded(true); // Still show content even if Vanta fails
      }
    };
 
    // Delay loading slightly to prioritize main content
    const timer = setTimeout(loadVanta, 100);
 
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [isMobile]);
 
  return (
    <div className="relative overflow-hidden bg-[#1a1f36]">
      {/* Vanta.js WAVES Background with loading state */}
      <div
        ref={vantaRef}
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          vantaLoaded ? 'opacity-100' : 'opacity-0'
        } w-full h-full`}
      />
      
      {/* Fallback gradient background while loading */}
      {!vantaLoaded && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a1f36] via-[#2a2d47] to-[#1a1f36] w-full h-full" />
      )}
      
      {/* Desktop Icon Cloud - Only show on larger screens */}
      <div className="absolute right-20 top-0 bottom-0 w-1/3 z-10 opacity-95 hidden md:block -mt-40 ">
        <IconCloud
          size={50}
          height={800}
          bgColor="transparent"
          glowEffect={true}
          rotationSpeed={0.9}
        />
      </div>
      
      <main className="relative z-20 flex h-full flex-col justify-center md:justify-start px-6 md:px-12 lg:px-24 pt-0 md:pt-24 lg:-top-14">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Connecting Dots ERP
          </h1>
          
          {/* Yellow accent line */}
          <div className="w-16 md:w-20 h-1 bg-yellow-400 mb-4 md:mb-6"></div>
          
          {/* Mobile Icon Cloud - Positioned after heading, before description */}
          <div className="block md:hidden mb-4">
            <div className="flex justify-center">
              <div className="w-64 h-64 relative">
                <IconCloud
                  size={30}
                  height={250}
                  bgColor="transparent"
                  glowEffect={true}
                  rotationSpeed={0.7}
                />
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            We are a leading SAP training institute dedicated to shaping
            skilled professionals for the ever-growing ERP industry. Our
            expert-led courses equip you with real-world knowledge and
            hands-on experience to excel in your SAP career.
          </p>
          
          {/* Stats Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 mb-6 md:mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">No.1</div>
              <div className="text-base md:text-lg text-gray-400">Training & Placement Center</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">5,000+</div>
              <div className="text-base md:text-lg text-gray-400">Trusted By</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">10+</div>
              <div className="text-base md:text-lg text-gray-400">Years Experience</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 flex items-center gap-2 text-base md:text-lg w-full md:w-auto justify-center md:justify-start group overflow-hidden transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25 active:scale-95">
            {/* Animated background shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-lg bg-yellow-300/20 animate-ping"></div>
            </div>
            
            <span className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:font-bold">
              Enroll Now
            </span>
            
            <svg
              className="w-4 h-4 md:w-5 md:h-5 relative z-10 transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-yellow-400/50 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </main>
    </div>
  );
}