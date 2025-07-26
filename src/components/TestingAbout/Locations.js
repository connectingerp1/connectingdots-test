"use client";
import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Building2, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';

// Company locations data
const companyLocations = [
  {
    id: 'pune',
    name: 'Pune Office',
    coordinates: [18.586540582890077, 73.78154440891436],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    address: '1st Floor, 101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027',
    phone: '+91 90040 02941',
    email: 'pune@company.com'
  },
  {
    id: 'mumbai',
    name: 'Mumbai Office',
    coordinates: [19.188380013416644, 72.97569750017392],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
    address: "4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra 400602",
    description: 'Our Mumbai office in Thane West, strategically located in the financial capital of India.',
    phone: '+91 90040 05382',
    email: 'mumbai@company.com'
  },
  {
    id: 'raipur',
    name: 'Raipur Office',
    coordinates: [21.23718483397514, 81.65330086453389],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    address: 'New Panchsheel Nagar, Civil Lines, Raipur, Chhattisgarh 492001',
    description: 'Our Raipur office in Chhattisgarh, serving as our central India operations hub.',
    phone: '+91 98765 43212',
    email: 'raipur@company.com'
  }
];

const OfficeInfoPopup = ({ location, onClose, isVisible }) => {
  if (!isVisible || !location) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 border border-gray-700">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-600/20 rounded-full">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{location.name}</h3>
                <span className="text-gray-400 text-sm">Office Location</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{location.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">{location.address}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href={`tel:${location.phone}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  {location.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href={`mailto:${location.email}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  {location.email}
                </a>
              </div>
            </div>
            
            <button
              onClick={() => window.open(`https://maps.google.com?q=${location.coordinates[0]},${location.coordinates[1]}`, '_blank')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveMap = ({ selectedLocation, hoveredLocation, onLocationSelect, className = "" }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [showOfficeInfo, setShowOfficeInfo] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(5);
  
  // Default map center and zoom for India - responsive zoom levels
  const defaultCenter = [20.5937, 78.9629];
  const getDefaultZoom = () => {
    if (window.innerWidth < 640) return 4.5; // Mobile - show full India
    if (window.innerWidth < 1024) return 5; // Tablet
    return 5; // Desktop
  };
  const [defaultZoom, setDefaultZoom] = useState(5);

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setLeafletLoaded(true);
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => {
        setLeafletLoaded(true);
      };
      document.head.appendChild(script);
    };

    // Set responsive default zoom
    const handleResize = () => {
      setDefaultZoom(getDefaultZoom());
    };

    setDefaultZoom(getDefaultZoom());
    window.addEventListener('resize', handleResize);
    loadLeaflet();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapContainer.current || map.current) return;

    const L = window.L;

    map.current = L.map(mapContainer.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri',
      maxZoom: 19
    }).addTo(map.current);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
      maxZoom: 19,
      opacity: 0.7
    }).addTo(map.current);

    // Listen to zoom events
    map.current.on('zoomend', () => {
      const currentZoom = map.current.getZoom();
      setZoomLevel(currentZoom);
      // No longer control showOfficeInfo here
    });

    setIsLoading(false);

    // Add markers
    companyLocations.forEach((location, index) => {
      setTimeout(() => {
        addMarker(location, L);
      }, index * 200);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [leafletLoaded, defaultZoom]);

  // Handle location selection and hovering
  useEffect(() => {
    if (!map.current) return;

    if (hoveredLocation) {
      // Zoom to hovered location
      map.current.flyTo(hoveredLocation.coordinates, 14, {
        animate: true,
        duration: 1.5
      });
      // Show popup after zoom animation completes
      setTimeout(() => {
        if (hoveredLocation) {
          setShowOfficeInfo(true);
        }
      }, 3000);
    } else if (selectedLocation) {
      // Stay at selected location when not hovering
      map.current.flyTo(selectedLocation.coordinates, 14, {
        animate: true,
        duration: 1.5
      });
      // Show popup after zoom animation completes
      setTimeout(() => {
        // Only show if not hovering a card
        if (selectedLocation && !hoveredLocation) {
          setShowOfficeInfo(true);
        }
      }, 1600);
    } else {
      // Return to default view when no location is selected or hovered
      map.current.flyTo(defaultCenter, defaultZoom, {
        animate: true,
        duration: 1.5
      });
      setShowOfficeInfo(false);
    }
  }, [selectedLocation, hoveredLocation]);

  // Always show popup if hoveredLocation is set
  useEffect(() => {
    if (hoveredLocation) {
      setShowOfficeInfo(true);
    } else if (!selectedLocation) {
      setShowOfficeInfo(false);
    }
    // If selectedLocation, showOfficeInfo is handled by the above effect after zoom
  }, [hoveredLocation, selectedLocation]);

  const addMarker = (location, L) => {
    const customIcon = L.divIcon({
      html: `
        <div class="marker-pin" style="
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          transition: all 0.3s ease;
        ">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#ef4444" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadow${location.id}" height="130%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.5)" />
              </filter>
            </defs>
            <path
              filter="url(#shadow${location.id})"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" 
            />
          </svg>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    
    const marker = L.marker(location.coordinates, { icon: customIcon })
      .addTo(map.current);

    marker.on('click', () => {
      onLocationSelect(location);
    });

    setTimeout(() => {
      const markerElement = marker.getElement();
      if (markerElement) {
        const pin = markerElement.querySelector('.marker-pin');
        if (pin) {
          pin.style.transform = 'scale(1)';
          pin.style.animation = 'bounce 0.6s ease-out';
        }
      }
    }, 100);

    markersRef.current.push(marker);
  };

  const handleCloseOfficeInfo = () => {
    setShowOfficeInfo(false);
  };

  return (
    <div className={`relative bg-gray-900 rounded-2xl overflow-hidden ${className}`}>
      {(isLoading || !leafletLoaded) && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2 mx-auto"></div>
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="w-full h-full" />
      
      <OfficeInfoPopup 
        location={hoveredLocation || selectedLocation} 
        onClose={handleCloseOfficeInfo}
        isVisible={showOfficeInfo}
      />
      
      <style jsx>{`
        @keyframes bounce {
          0% { transform: scale(1) translateY(-10px); }
          50% { transform: scale(1.1) translateY(-5px); }
          100% { transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

const CompactBranchCard = ({ location, isActive, isHovered, onHover, onLeave, onClick }) => {
  return (
    <div
      className={`group relative p-2 sm:p-3 rounded-lg backdrop-blur-md transition-all duration-300 cursor-pointer transform hover:scale-102 ${
        isActive 
          ? 'bg-gray-800/90 border border-gray-600 shadow-xl' 
          : isHovered
          ? 'bg-gray-800/80 border border-gray-650 shadow-lg'
          : 'bg-gray-800/60 border border-gray-700 hover:bg-gray-800/80 hover:border-gray-600'
      }`}
      onMouseEnter={() => onHover(location)}
      onMouseLeave={onLeave}
      onClick={() => onClick(location)}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex items-start space-x-1.5">
            <div className={`p-1 rounded-full transition-colors duration-300 flex-shrink-0 ${
              isActive || isHovered ? 'bg-white/30' : 'bg-white/20 group-hover:bg-white/30'
            }`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5 leading-tight">{location.name}</h3>
              <p className="text-blue-200 text-xs leading-tight line-clamp-1 hidden sm:block">{location.description}</p>
            </div>
          </div>
          <div className={`transition-transform duration-300 flex-shrink-0 ${
            isActive ? 'rotate-45' : isHovered ? 'rotate-12' : 'group-hover:rotate-12'
          }`}>
            <Navigation className="w-3 h-3 text-white/70" />
          </div>
        </div>

        <div className="space-y-1 text-white/80 text-xs">
        <div className="flex items-start space-x-1.5">
  <Building2 className="w-3 h-3 mt-0.5 text-white/60 flex-shrink-0" />
  <p className="leading-tight text-xs">{location.address}</p>
</div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-white/60 flex-shrink-0" />
              <span className="truncate text-xs">{location.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-3 h-3 text-white/60 flex-shrink-0" />
              <span className="truncate text-xs">{location.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-white/10">
          <button className={`w-full py-1 px-2 rounded-md font-medium transition-all duration-300 text-xs ${
            isActive 
              ? 'bg-white text-gray-900 shadow-lg' 
              : isHovered
              ? 'bg-white/30 text-white border border-white/30'
              : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
          }`}>
            {isActive ? 'Viewing' : isHovered ? 'Preview' : 'View Map'}
          </button>
        </div>
      </div>
      
      {/* Animated border */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
        isActive || isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-0.5">
          <div className="h-full w-full rounded-lg bg-transparent" />
        </div>
      </div>
    </div>
  );
};

const OurBranch = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleCardHover = (location) => {
    setHoveredLocation(location);
  };

  const handleCardLeave = () => {
    setHoveredLocation(null);
  };

  const handleCardClick = (location) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
    setHoveredLocation(null);
  };

  const handleMapLocationSelect = (location) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Our Branches
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our office locations across India. Hover over the cards to preview locations, click to select and zoom in for detailed office information.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Map Section */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <div className="sticky top-6">
              <InteractiveMap
                selectedLocation={selectedLocation}
                hoveredLocation={hoveredLocation}
                onLocationSelect={handleMapLocationSelect}
                className="h-[300px] sm:h-[400px] lg:h-[600px] shadow-2xl"
              />
            </div>
          </div>

          {/* Branch Cards Section - Ultra Compact and Responsive */}
          <div className="xl:col-span-1 order-1 xl:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-2 sm:gap-3 xl:gap-2 h-[300px] sm:h-[400px] lg:h-[600px] overflow-y-auto xl:overflow-y-visible">
              {companyLocations.map((location) => (
                <CompactBranchCard
                  key={location.id}
                  location={location}
                  isActive={selectedLocation?.id === location.id}
                  isHovered={hoveredLocation?.id === location.id}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            Click on map markers or location cards to explore our offices in detail
          </p>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default OurBranch;