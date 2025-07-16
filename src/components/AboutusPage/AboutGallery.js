"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AboutGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const images = [
    "https://i.imgur.com/rZohnIF.jpg",
    "https://i.imgur.com/vt6WzGJ.jpg",
    "https://i.imgur.com/UZSH8He.jpg",
    "https://i.imgur.com/AQjU01z.jpg",
    "https://i.imgur.com/iPTLXnY.jpg",
    "https://i.imgur.com/your4dg.jpg",
    "https://i.imgur.com/ZN86VMR.jpg",
    "https://i.imgur.com/qhMS713.jpg",
    "https://i.imgur.com/KJ5KL2n.jpg",
    "https://i.imgur.com/ADghQbm.jpg",
    "https://i.imgur.com/8FfQnL9.jpg",
    "https://i.imgur.com/ZXHDRNs.jpg",
    "https://i.imgur.com/iNrXB47.jpg",
    "https://i.imgur.com/GgPrUXL.jpg",
    "https://i.imgur.com/N9jG1Ir.jpg",
    "https://i.imgur.com/MjScSi9.jpg",
    "https://i.imgur.com/0eKfhXd.jpg",
    "https://i.imgur.com/xz6STYH.jpg",
    "https://i.imgur.com/FXN1ezN.jpg",
  ];

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const interval =
      !isMobile &&
      setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, 4000);

    return () => {
      window.removeEventListener("resize", handleResize);
      interval && clearInterval(interval);
    };
  }, [images.length, isMobile, isBrowser]);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative px-20 py-6 lg:py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our journey through milestones and success stories
          </p>
        </div>

        {/* Gallery Container */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Featured Image */}
          <div className="lg:col-span-3 group">
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
              {/* Main Image */}
              <div
                className="relative w-full h-full transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${isHovered === "featured" ? 1.02 : 1})`,
                }}
                onMouseEnter={() => setIsHovered("featured")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Image
                  src={images[activeIndex]}
                  alt={`Achievement ${activeIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                  {activeIndex + 1} / {images.length}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={prevImage}
                  className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Next image"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeIndex + 1) / images.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4 max-h-[550px] lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-slate-600 lg:scrollbar-track-slate-800">
              {images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  onClick={() => handleImageClick(index)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`
                    relative aspect-square cursor-pointer rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-500 group/thumb
                    ${
                      activeIndex === index
                        ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900 scale-105 shadow-lg shadow-blue-500/25"
                        : "hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                    }
                  `}
                  style={{
                    transform: `translateY(${isHovered === index ? -2 : 0}px)`,
                  }}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover/thumb:scale-110"
                  />

                  {/* Overlay */}
                  <div
                    className={`
                    absolute inset-0 transition-all duration-300
                    ${
                      activeIndex === index
                        ? "bg-blue-500/20"
                        : "bg-black/40 group-hover/thumb:bg-black/20"
                    }
                  `}
                  ></div>

                  {/* Active Indicator */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGallery;
