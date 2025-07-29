"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Building2, Phone, Mail, Navigation } from 'lucide-react';

// Company locations data
const companyLocations = [
  {
    
      id: 'pune',
      name: 'Pune Office',
      coordinates: [18.586540582890077, 73.78154440891436],
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      address: '1st Floor, 101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027',
      mapUrl: 'https://www.google.com/maps/dir//1st+Floor,101,+Police,+Wireless+Colony,+Vishal+Nagar,+Pimple+Nilakh,+Pune,+Pimpri-Chinchwad,+Maharashtra+411027/@18.5482844,73.3817727,10z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2b919d0592ea1:0xf431691661c2c3ec!2m2!1d73.7814047!2d18.5863803?entry=ttu',
      phone: '+91 90040 02941'
    
    
  },
  {
    id: 'mumbai',
    name: 'Mumbai Office',
    coordinates: [19.188380013416644, 72.97569750017392],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
    address: "4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra 400602",
    description: 'Our Mumbai office in Thane West, strategically located in the financial capital of India.',
    mapUrl: 'https://www.google.com/maps/dir//Connecting+Dot,+Paradise+Tower,+next+to+MCDonalds,+Naupada,+Thane+West,+Mumbai,+Thane,+Maharashtra+400601/@19.1876209,72.9032003,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7b909db7deec9:0x116fea8715c8a1a2!2m2!1d72.9752981!2d19.1876209?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D',
    phone: '+91 90040 05382'
  },
  {
    id: 'raipur',
    name: 'Raipur Office',
    coordinates: [21.23718483397514, 81.65330086453389],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    address: 'New Panchsheel Nagar, Civil Lines, Raipur, Chhattisgarh 492001',
    description: 'Our Raipur office in Chhattisgarh, serving as our central India operations hub.',
    
    phone: '+91 89560 01555'
  }
];

const InteractiveMap = ({ selectedLocation, hoveredLocation, onLocationSelect, onMapLeave, className = "" }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  
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

    setIsLoading(false);

    // Add markers
    companyLocations.forEach((location, index) => {
      setTimeout(() => {
        addMarker(location, L);
      }, index * 200);
    });

    // Add mouse leave handler for map container
    const handleMouseLeave = () => {
      if (!map.current) return;
    
      const currentZoom = map.current.getZoom();
      const currentCenter = map.current.getCenter();
    
      const centerOffset =
        Math.abs(currentCenter.lat - defaultCenter[0]) > 0.05 ||
        Math.abs(currentCenter.lng - defaultCenter[1]) > 0.05;
    
      const zoomOffset = Math.abs(currentZoom - defaultZoom) > 0.2;
    
      const noActiveLocation = !selectedLocation && !hoveredLocation;
    
      if ((centerOffset || zoomOffset) && noActiveLocation) {
        map.current.flyTo(defaultCenter, defaultZoom, {
          animate: true,
          duration: 1.5
        });
      }
    
      onMapLeave(); // reset selected & hover
    };
    

    mapContainer.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (mapContainer.current) {
        mapContainer.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [leafletLoaded, defaultZoom, onMapLeave]);

  // Handle location selection and hovering
  useEffect(() => {
    if (!map.current) return;

    if (hoveredLocation) {
      // Zoom to hovered location
      map.current.flyTo(hoveredLocation.coordinates, 14, {
        animate: true,
        duration: 1.5
      });
    } else if (selectedLocation) {
      // Stay at selected location when not hovering
      map.current.flyTo(selectedLocation.coordinates, 14, {
        animate: true,
        duration: 1.5
      });
    } else {
      // Return to default view when no location is selected or hovered
      map.current.flyTo(defaultCenter, defaultZoom, {
        animate: true,
        duration: 1.5
      });
    }
  }, [selectedLocation, hoveredLocation, defaultCenter, defaultZoom]);

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
      className={`group relative p-3 sm:p-4 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
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
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full transition-colors duration-300 flex-shrink-0 ${
              isActive || isHovered ? 'bg-white/30' : 'bg-white/20 group-hover:bg-white/30'
            }`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">{location.name}</h3>
              <p className="text-blue-200 text-xs sm:text-sm leading-tight line-clamp-1">{location.description}</p>
            </div>
          </div>
          <div className={`transition-transform duration-300 flex-shrink-0 ${
            isActive ? 'rotate-45' : isHovered ? 'rotate-12' : 'group-hover:rotate-12'
          }`}>
            <Navigation className="w-4 h-4 text-white/70" />
          </div>
        </div>

        <div className="space-y-2 text-white/80 text-xs sm:text-sm">
        <div className="flex items-start space-x-2">
  <Building2 className="w-4 h-4 mt-0.5 text-white/60 flex-shrink-0" />
  <a
    href={location.mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="leading-tight text-white hover:text-blue-500"
  >
    {location.address}
  </a>
</div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-white/60 flex-shrink-0" />
              <span className="truncate">{location.phone}</span>
            </div>
            
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <button className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
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
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
        isActive || isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 p-0.5">
          <div className="h-full w-full rounded-xl bg-transparent" />
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

  const handleMapLeave = () => {
    setSelectedLocation(null);
    setHoveredLocation(null);
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
            Explore our office locations across India. Hover over the cards to preview locations, click to select and zoom in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Branch Cards Section - Mobile First */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 gap-4 lg:gap-3">
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

          {/* Map Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="sticky top-6">
              <InteractiveMap
                selectedLocation={selectedLocation}
                hoveredLocation={hoveredLocation}
                onLocationSelect={handleMapLocationSelect}
                onMapLeave={handleMapLeave}
                className="h-[400px] sm:h-[500px] lg:h-[600px] shadow-2xl"
              />
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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