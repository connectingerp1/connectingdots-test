"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

const SAPAdoptionRings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Industry data with adoption percentages - moved outside component to prevent recreation
  const industries = useMemo(
    () => [
      {
        name: "Manufacturing",
        percentage: 92,
        color: "from-orange-400 to-purple-600",
        description:
          "Leading in digital transformation with comprehensive ERP solutions",
      },
      {
        name: "IT & Consulting",
        percentage: 89,
        color: "from-blue-400 to-purple-600",
        description:
          "High adoption driving client implementations and services",
      },
      {
        name: "Retail & FMCG",
        percentage: 78,
        color: "from-green-400 to-blue-600",
        description: "Streamlining supply chain and customer experience",
      },
      {
        name: "Banking & Finance",
        percentage: 85,
        color: "from-purple-400 to-pink-600",
        description: "Regulatory compliance and risk management solutions",
      },
      {
        name: "Healthcare",
        percentage: 71,
        color: "from-cyan-400 to-blue-600",
        description: "Patient data management and operational efficiency",
      },
    ],
    []
  );

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Separate CircularProgress component with proper memoization
  const CircularProgress = React.memo(
    ({ industryName, percentage, color, index, isVisible }) => {
      const [animatedPercentage, setAnimatedPercentage] = useState(0);
      const [hasAnimated, setHasAnimated] = useState(false);
      const radius = 60;
      const strokeWidth = 8;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = circumference;
      const strokeDashoffset =
        circumference - (animatedPercentage / 100) * circumference;

      // Color mappings for gradients
      const colorMap = useMemo(
        () => ({
          Manufacturing: { start: "#013383", end: "#1471D8" },
          "IT & Consulting": { start: "#1471D8", end: "#85B9F3" },
          "Retail & FMCG": { start: "#85B9F3", end: "#8699EB" },
          "Banking & Finance": { start: "#013383", end: "#8699EB" },
          Healthcare: { start: "#85B9F3", end: "#85B9F3" },
        }),
        []
      );

      // Animation effect - only runs once when component becomes visible
      useEffect(() => {
        if (isVisible && !hasAnimated) {
          const timer = setTimeout(() => {
            setAnimatedPercentage(percentage);
            setHasAnimated(true);
          }, index * 200);
          return () => clearTimeout(timer);
        }
      }, [isVisible, hasAnimated]); // Removed percentage and index from dependencies

      const gradientId = `gradient-${industryName.replace(/\s+/g, "-").toLowerCase()}`;

      return (
        <div className="relative">
          <div className="w-40 h-40 relative">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 144 144"
            >
              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={colorMap[industryName]?.start || "#f97316"}
                  />
                  <stop
                    offset="100%"
                    stopColor={colorMap[industryName]?.end || "#9333ea"}
                  />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                cx="76"
                cy="76"
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                className="text-gray-200"
              />

              {/* Progress circle */}
              <circle
                cx="76"
                cy="76"
                r={radius}
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(animatedPercentage)}%
              </div>
              <div className="text-sm font-medium text-gray-600 leading-tight">
                {industryName}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );

  // Set display name for better debugging
  CircularProgress.displayName = "CircularProgress";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SAP Skills in High Demand
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The SAP ecosystem continues to dominate the ERP market, with over
            400,000 customers worldwide and a growing demand for skilled
            professionals. At Connecting Dots ERP, we focus on high-demand SAP
            modules that offer excellent career growth potential.
          </p>
        </div>

        {/* SAP Adoption by Industry Section */}
        <div ref={sectionRef} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            SAP Adoption by Industry
          </h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
            {industries.map((industry, index) => (
              <CircularProgress
                key={industry.name}
                industryName={industry.name}
                percentage={industry.percentage}
                color={industry.color}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Mobile Stack */}
          <div className="md:hidden space-y-8">
            {industries.map((industry, index) => (
              <div key={industry.name} className="flex justify-center">
                <CircularProgress
                  industryName={industry.name}
                  percentage={industry.percentage}
                  color={industry.color}
                  index={index}
                  isVisible={isVisible}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Training Info */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <p className="text-gray-600 leading-relaxed mb-6">
            Our training programs are continuously updated to align with the
            latest SAP innovations, including S/4HANA, SAP Cloud Platform, and
            industry-specific solutions. With over 10 years of experience in SAP
            training, we've developed partnerships with leading implementation
            companies to ensure our curriculum meets current industry needs.
          </p>

          <div className="text-center">
            <button className="bg-gradient-to-r from-[#1471D8] to-[#013383] hover:from-[#1E80F0] hover:to-[#0142a3] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              EXPLORE SAP COURSES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAPAdoptionRings;
