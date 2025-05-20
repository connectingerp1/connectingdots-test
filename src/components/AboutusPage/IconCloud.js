import React, { useEffect, useState, useRef } from 'react';
import { Cloud, renderSimpleIcon, fetchSimpleIcons } from 'react-icon-cloud';

const IconsCloud = (props) => {
  const [icons, setIcons] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const cloudRef = useRef(null);
  const canvasRef = useRef(null);

  // Extract props with defaults
  const {
    size = 45, // Reduced by ~12% from original 65
    bgColor = 'transparent',
    height = 400, // Reduced by ~12.5% from original 400
    minContrastRatio = 1.5, // Reduced from 3 to make dark icons more visible on dark background
    containerStyle = {},
    fallbackColor = '#ffffff', // Changed to white to ensure visibility on dark backgrounds
    glowEffect = true,
    hoverEffectScale = 1.25,
    textShadow = true,
    rotationSpeed = 1.3, // Increased by 20% from original 1.2
    autoRotate = true,
    depth = 0.95,
    rotateDirection = 'both'
  } = props;

  // Responsive adjustments
  const isMobile = windowSize.width < 768;
  const adjustedSize = isMobile ? size * 0.75 : size;
  const mobileHeight = isMobile ? height * 0.7 : height;
  const actualHeight = height || mobileHeight;

  // Technology slugs based on the courses provided
  const technologySlugs = [
    // SAP Functional
    'sap',
    'salesforce',
    'oracle',
    
    // SAP Technical
    'hana',
    'abap',
    
    // Data Science
    'python',
    'r',
    'tensorflow',
    'pytorch',
    'pandas',
    'jupyter',
    'numpy',
    'scikit-learn',
    'openai',
    
    // Full Stack & Development
    'javascript',
    'typescript',
    'react',
    'nodedotjs',
    'mongodb',
    'express',
    'html5',
    'css3',
    'java',
    'spring',
    'git',
    'github',
    
    // UI/UX Design
    'figma',
    'adobexd',
    'adobeillustrator',
    'sketch',
    
    // Digital Marketing
    'googleads',
    'googleanalytics',
    'facebook',
    'instagram',
    'linkedin',
    'twitter',
    'youtube',
    'googlemarketing',
    'mailchimp',
    'hubspot',
    
    // HR
    'workday',
    'microsoftoffice',
    'microsoftexcel',
    'microsoftword',
    'microsoftpowerpoint',
    
    // Data Visualization
    'tableau',
    'powerbi',
    'mysql',
    'postgresql',
    'microsoftsqlserver',
    'd3dotjs',
    
    // Additional SAP specific (with fallback to generic icons)
    'amazonaws', // For EWM/SCM
    'googlecloud', // For integration scenarios
    'microsoftazure', // For cloud deployments
    'docker', // For containerization
    'kubernetes' // For orchestration
  ];

  // Custom icons for SAP modules that don't have simple-icons
  const customIcons = [
    { title: 'SAP FICO', slug: 'sap-fico', hex: '0FAAFF', path: 'M35.6,29h-5.2v-6.4h5.2V29z M35.6,18.4h-5.2V12h5.2V18.4z M24.4,29h-5.2v-6.4h5.2V29z M24.4,18.4h-5.2V12h5.2V18.4z M13.2,29H8v-6.4h5.2V29z M13.2,18.4H8V12h5.2V18.4z' },
    { title: 'SAP MM', slug: 'sap-mm', hex: '0FAAFF', path: 'M38,26H26v12h12V26z M24,26H12v12h12V26z M38,12H26v12h12V12z M24,12H12v12h12V12z' },
    { title: 'SAP SD', slug: 'sap-sd', hex: '0FAAFF', path: 'M32,12L32,12c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12c6.6,0,12-5.4,12-12C44,17.4,38.6,12,32,12z M32,32c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S36.4,32,32,32z' },
    { title: 'SAP HR/HCM', slug: 'sap-hr', hex: '0FAAFF', path: 'M24,16c0,4.4,3.6,8,8,8s8-3.6,8-8s-3.6-8-8-8S24,11.6,24,16z M44,36c0-8-7.2-12-12-12c-4.8,0-12,4-12,12H44z' },
    { title: 'SAP SCM', slug: 'sap-scm', hex: '0FAAFF', path: 'M44,24l-8-8v4h-8c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h8v4L44,24z M24,24l-8-8v4H8c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h8v4L24,24z' },
    { title: 'SAP S/4 HANA', slug: 'sap-s4hana', hex: '0FAAFF', path: 'M44,12H28c-2.2,0-4,1.8-4,4v16c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V16C48,13.8,46.2,12,44,12z M16,12H4c-2.2,0-4,1.8-4,4v16c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V16C20,13.8,18.2,12,16,12z' },
    { title: 'SAP BW/BI', slug: 'sap-bwbi', hex: '0FAAFF', path: 'M8,32h8V20H8V32z M20,32h8V12h-8V32z M32,32h8V16h-8V32z' },
    { title: 'SAP BASIS', slug: 'sap-basis', hex: '0FAAFF', path: 'M44,36H4c-2.2,0-4-1.8-4-4V16c0-2.2,1.8-4,4-4h40c2.2,0,4,1.8,4,4v16C48,34.2,46.2,36,44,36z M44,16H4v16h40V16z' },
    { title: 'SAP EWM', slug: 'sap-ewm', hex: '0FAAFF', path: 'M36,32h8V12h-8V32z M24,32h8V20h-8V32z M12,32h8V16h-8V32z M4,32h4V8H4V32z' },
    { title: 'SAP PP', slug: 'sap-pp', hex: '0FAAFF', path: 'M30,16c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6C36,18.7,33.3,16,30,16z M42,16h-2.3c-0.5-2.3-1.5-4.4-2.8-6.2l1.6-1.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0l-1.6,1.6C32.4,5.8,30.3,4.8,28,4.3V2c0-1.1-0.9-2-2-2s-2,0.9-2,2v2.3c-2.3,0.5-4.4,1.5-6.2,2.8l-1.6-1.6c-0.8-0.8-2-0.8-2.8,0c-0.8,0.8-0.8,2,0,2.8l1.6,1.6C13.8,11.6,12.8,13.7,12.3,16H10c-1.1,0-2,0.9-2,2s0.9,2,2,2h2.3c0.5,2.3,1.5,4.4,2.8,6.2l-1.6,1.6c-0.8,0.8-0.8,2,0,2.8c0.4,0.4,0.9,0.6,1.4,0.6s1-0.2,1.4-0.6l1.6-1.6c1.8,1.3,3.9,2.3,6.2,2.8V34c0,1.1,0.9,2,2,2s2-0.9,2-2v-2.3c2.3-0.5,4.4-1.5,6.2-2.8l1.6,1.6c0.4,0.4,0.9,0.6,1.4,0.6s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8l-1.6-1.6c1.3-1.8,2.3-3.9,2.8-6.2H42c1.1,0,2-0.9,2-2S43.1,16,42,16z' },
    { title: 'SAP QM', slug: 'sap-qm', hex: '0FAAFF', path: 'M32,4H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V16L32,4z M36,40H12V8h16v12h8V40z M24,30.6L18.4,25l-2.8,2.8L24,36l12-12l-2.8-2.8L24,30.6z' },
    { title: 'SAP PS', slug: 'sap-ps', hex: '0FAAFF', path: 'M38,38H10c-1.1,0-2-0.9-2-2V10c0-1.1,0.9-2,2-2h28c1.1,0,2,0.9,2,2v26C40,37.1,39.1,38,38,38z M34,14H14v4h20V14z M34,22H14v4h20V22z M34,30H14v4h20V30z' },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for viewport visibility
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, options);

    if (cloudRef.current) {
      observer.observe(cloudRef.current);
    }

    return () => {
      if (cloudRef.current) {
        observer.unobserve(cloudRef.current);
      }
    };
  }, [cloudRef]);

  // Restart animation when mouse leaves
  useEffect(() => {
    // Fix for rotation after hover
    const restartAnimation = () => {
      if (!canvasRef.current || !window.TagCanvas) return;

      try {
        // Access the TagCanvas instance and force restart animation
        window.TagCanvas.Delete(canvasRef.current);
        
        // Re-initialize with our options
        window.TagCanvas.Start(canvasRef.current, 'tags', getCloudOptions());
        
        // Set a timeout to ensure continuous rotation
        setTimeout(() => {
          try {
            window.TagCanvas.Reload(canvasRef.current);
          } catch (e) {
            console.error("Error reloading TagCanvas:", e);
          }
        }, 50);
      } catch (e) {
        console.error("Error restarting TagCanvas:", e);
      }
    };

    // Load icons
    const loadIcons = async () => {
      try {
        // Fetch standard icons from simple-icons
        const iconsData = await fetchSimpleIcons({ slugs: technologySlugs });
        
        // Add custom SAP module icons
        customIcons.forEach(customIcon => {
          iconsData.simpleIcons[customIcon.slug] = {
            title: customIcon.title,
            slug: customIcon.slug,
            hex: customIcon.hex,
            path: customIcon.path
          };
        });
        
        setIcons(iconsData);
      } catch (error) {
        console.error('Error loading icons:', error);
      }
    };

    loadIcons();

    // Get a reference to the canvas element after it's rendered
    setTimeout(() => {
      if (cloudRef.current) {
        const canvas = cloudRef.current.querySelector('canvas');
        if (canvas) {
          canvasRef.current = canvas;
          
          // Add specific event listeners to handle rotation
          canvas.addEventListener('mouseleave', restartAnimation);
          canvas.addEventListener('mouseout', restartAnimation);
          
          // Fix for touch devices
          canvas.addEventListener('touchend', () => {
            setTimeout(restartAnimation, 50);
          });
          
          // Periodically ensure rotation is active
          const rotationInterval = setInterval(() => {
            if (isVisible && autoRotate) {
              try {
                window.TagCanvas.Resume(canvasRef.current);
              } catch (e) {
                // Ignore errors during periodic refresh
              }
            }
          }, 2000);

          return () => {
            clearInterval(rotationInterval);
            canvas.removeEventListener('mouseleave', restartAnimation);
            canvas.removeEventListener('mouseout', restartAnimation);
            canvas.removeEventListener('touchend', restartAnimation);
          };
        }
      }
    }, 1000);
  }, [isVisible, autoRotate]);

  // Calculate initial rotation based on direction
  const getCloudOptions = () => {
    let initialX = 0;
    let initialY = 0;

    if (rotateDirection === 'cw') {
      initialX = 0.14; // Increased from 0.12 (20% faster)
      initialY = 0.10; // Increased from 0.08 (20% faster)
    } else if (rotateDirection === 'ccw') {
      initialX = -0.14; // Increased from -0.12 (20% faster)
      initialY = -0.10; // Increased from -0.08 (20% faster)
    } else if (rotateDirection === 'both') {
      initialX = 0.12; // Increased from 0.1 (20% faster)
      initialY = 0.06; // Increased from 0.05 (20% faster)
    }

    // Enhanced cloud options for better 3D effect and persistent auto-rotation
    return {
      // Core configuration
      radius: adjustedSize * 3.6, // Slightly reduced from 3.8 to match height reduction
      maxSpeed: 0.072 * rotationSpeed, // Increased from 0.06 (20% faster)
      initSpeed: 0.06 * rotationSpeed, // Increased from 0.05 (20% faster)
      direction: 135,
      keep: true,

      // 3D effects
      depth,
      wheelZoom: false,
      reverse: true,
      freezeActive: false, 
      pinchZoom: false,

      // Interactive features
      activeCursor: 'pointer',
      clickToFront: 600,
      imageScale: 2,

      // Visual effects
      shuffleTags: true,
      frontSelect: true,
      outlineMethod: glowEffect ? 'colour' : 'none',
      outlineColour: glowEffect ? 'rgba(15, 170, 255, 0.5)' : 'rgba(0,0,0,0.2)',
      outlineOffset: 4,
      outlineRadius: 8,
      outlineThickness: 3,

      // Animation
      fadeIn: 800,
      initial: autoRotate ? [initialX, initialY] : [0, 0],
      decel: 0.95, // Changed from 0.98 to 0.95 for less deceleration (more constant speed)
      shadow: textShadow ? '#ffffff' : false, // Changed to white shadow for better visibility on dark background
      shadowBlur: textShadow ? 5 : 0, // Increased shadow blur for better readability on dark bg

      // Responsive behavior
      weight: true,
      zoom: 1.0,
      zoomMax: 1.0,
      zoomMin: 1.0,
      pauseOnTag: false, // IMPORTANT: Don't pause on hover

      // Only animate when visible for performance
      lock: !isVisible ? 'xy' : null,

      // Fix: These properties are critical to maintain constant rotation
      freezeDecel: false,    // Don't freeze deceleration
      animTiming: 'Smooth',  // Smooth animation
      dragControl: false,    // Disable drag control - this can interfere with rotation
      noSelect: true,        // Prevent text selection which can stop rotation
      noMouse: false,        // Keep mouse interactions, but handle properly
      
      // Always set to continuous rotation and prevent it from stopping
      animation: autoRotate ? "both" : "none",
      
      // Make elements larger on hover
      activeScale: hoverEffectScale,
      textHeight: 20,
      
      // Added tooltip
      tooltip: 'native',
      tooltipDelay: 50,
      
      // Critical fix: Set both of these for continuous rotation
      clickToFront: 600,
      hideTags: false,
      
      // Maintain momentum when interacting
      minSpeed: 0.02 * rotationSpeed, // Ensure minimum speed is maintained
      dragThreshold: 4,               // Make dragging less sensitive
      
      // Fix: these settings help maintain rotation during/after hover
      freezeActive: false,            // Don't freeze active tag
      freezeDecel: false,             // Don't freeze deceleration
      frontSelect: true,              // Allow selecting front item without pausing
      txtOpt: true,                   // Optimize text rendering
      txtScale: 2,                    // Scale text
      
      // MOST IMPORTANT FIX: Continue animation after mouse interactions
      interval: 20,                   // Animation interval in ms
      persistent: true,               // Keep animation persistent
      continuousRotation: true        // Custom property that our hooks will use
    };
  };

  // Loading state with animation
  if (!icons) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${actualHeight}px`,
        width: '100%',
        background: bgColor,
        borderRadius: '8px',
        ...containerStyle
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <div>Loading course icons...</div>
        </div>
      </div>
    );
  }

  // Process icons into renderable elements with enhanced visuals
  const renderedIcons = Object.values(icons.simpleIcons)
    .filter(icon => icon)
    .map((icon) => {
      // Apply special treatment for dark icons to ensure visibility on dark backgrounds
      const iconColor = icon.hex.toLowerCase();
      const isDarkIcon = 
        iconColor === '000' || 
        iconColor === '000000' || 
        iconColor === '111' || 
        iconColor === '111111' || 
        iconColor === '222' || 
        iconColor === '222222';
      
      return renderSimpleIcon({
        icon,
        size: adjustedSize,
        bgHex: bgColor === 'transparent' ? '#ffffff00' : bgColor,
        fallbackHex: isDarkIcon ? '#ffffff' : fallbackColor, // Use white for dark icons
        minContrastRatio,
        aProps: {
          onClick: (e) => {
            // Prevent default to maintain rotation
            e.preventDefault();
            
            // Force restart animation after click
            setTimeout(() => {
              if (canvasRef.current && window.TagCanvas) {
                try {
                  window.TagCanvas.Resume(canvasRef.current);
                } catch (e) {
                  console.error("Error resuming TagCanvas:", e);
                }
              }
            }, 50);
          },
          href: `#${icon.slug}`,
          title: icon.title,
          'aria-label': icon.title,
          style: {
            display: 'inline-block',
            transition: 'all 0.3s ease',
            filter: isDarkIcon ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))' : 'none', // Add glow to dark icons
            touchAction: 'manipulation' // Better touch handling
          }
        }
      });
    });

  // Enhanced container style with responsive considerations
  const containerStyleWithDefaults = {
    background: bgColor,
    padding: isMobile ? '12px' : '18px', // Slightly reduced padding to match height reduction
    borderRadius: '12px',
    boxShadow: bgColor === 'transparent' ? 'none' : '0 15px 35px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    perspective: '1200px',
    perspectiveOrigin: 'center center',
    overflow: 'hidden',
    ...containerStyle
  };

  // Fix: Function to manually restart rotation
  const restartRotation = () => {
    if (canvasRef.current && window.TagCanvas) {
      try {
        window.TagCanvas.Resume(canvasRef.current);
      } catch (e) {
        console.error("Error resuming TagCanvas:", e);
      }
    }
  };

  return (
    <div
      ref={cloudRef}
      style={containerStyleWithDefaults}
      className="icons-cloud-container"
      onMouseLeave={restartRotation}
    >
      <Cloud
        options={getCloudOptions()}
        containerProps={{
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: `${actualHeight}px`,
            overflow: 'hidden',
            transform: 'translateZ(0)',
            position: 'relative'
          }
        }}
      >
        {renderedIcons}
      </Cloud>

      {/* Enhanced CSS for better visual effects */}
      <style>
        {`
          .icons-cloud-container canvas {
            touch-action: manipulation;
            backface-visibility: hidden;
            will-change: transform;
            opacity: 0.95;
          }

          .icons-cloud-container a {
            transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease !important;
          }

          .icons-cloud-container a:hover {
            filter: ${glowEffect ? 'drop-shadow(0 0 12px rgba(15, 170, 255, 0.8))' : 'none'};
            z-index: 1000;
            opacity: 1;
          }

          /* FIX: Force continued animation */
          .icons-cloud-container:hover canvas, 
          .icons-cloud-container canvas:hover {
            animation-play-state: running !important;
          }
          
          /* FIX: Override TagCanvas style to maintain rotation */
          .tagcloud {
            position: relative !important;
          }
          
          /* Fix for canvas animations */
          @keyframes keepRotating {
            to { transform: rotate(0.01deg); }
          }
          
          .icons-cloud-container canvas {
            animation: keepRotating 0.01s linear infinite;
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            .icons-cloud-container canvas {
              max-height: 255px; /* Reduced by ~15% from 300px */
            }
          }
        `}
      </style>
      
      {/* Add hidden script to force rotation through TagCanvas API */}
      {autoRotate && (
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function ensureRotation() {
                if (typeof TagCanvas !== 'undefined') {
                  const canvases = document.querySelectorAll('.icons-cloud-container canvas');
                  canvases.forEach(canvas => {
                    try {
                      TagCanvas.Resume(canvas);
                    } catch(e) {}
                  });
                }
                setTimeout(ensureRotation, 2000);
              }
              setTimeout(ensureRotation, 1000);
            })();
          `
        }} />
      )}
    </div>
  );
};

export default IconsCloud;