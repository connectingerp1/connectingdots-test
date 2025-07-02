// lib/staticHtml.js
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// Helper function to get attribute, converting empty string to null
// This makes Next.js's Metadata API happier as it prefers null/undefined for absent attributes
const getAttributeOrNull = (element, attr) => {
  const value = element?.getAttribute(attr);
  return value === '' ? null : value;
};

// Define city groups for different HTML structures
const MAJOR_CITIES = [
  'pune', 'mumbai', 'thane', 'raipur', 'navi-mumbai', 'kalyan', 'bandra', 
  'andheri', 'powai', 'worli', 'chembur', 'malad', 'vile-parle', 'matunga', 
  'katraj', 'pimpri-chinchwad', 'shivaji-nagar', 'koregaon-park', 'viman-nagar', 
  'pimple-saudagar', 'baner', 'hinjewadi', 'wakad', 'kothrud', 'hadapsar', 'aundh'
];

// Function to get header data from JSON file
function getHeaderData(courseSlug, city) {
  try {
    console.log(`\n--- getHeaderData Called ---`);
    console.log(`🔍 Attempting to get header data for courseSlug: "${courseSlug}", city: "${city}"`);
    
    // Read the header JSON file
    const headerDataPath = path.join(process.cwd(), 'public/Jsonfolder/dsHeaderData.json');
    
    // Check if file exists
    if (!fs.existsSync(headerDataPath)) {
      console.error(`❌ ERROR: Header data file not found at: ${headerDataPath}`);
      return null;
    }
    
    const headerData = JSON.parse(fs.readFileSync(headerDataPath, 'utf-8'));
    console.log(`✅ Header data JSON loaded. Available top-level keys:`, Object.keys(headerData));
    
    // --- IMPORTANT: Corrected Course Mapping ---
    // Ensure these keys match EXACTLY with your dsHeaderData.json structure
    const courseMapping = {
      'sap-fico': { pageType: 'ficoheader', pageId: 'FICOHeader' },
      'sap-abap': { pageType: 'abapheader', pageId: 'AbapHeader' },
      'sap-basis': { pageType: 'basisheader', pageId: 'BasisHeader' },
      'sap-mm': { pageType: 'mmheader', pageId: 'MMHeader' },
      'sap-sd': { pageType: 'sdheader', pageId: 'SDHeader' },
      'sap-hr': { pageType: 'hrhcmheader', pageId: 'HRHCMHeader' },
      'sap-hrhcm': { pageType: 'hrhcmheader', pageId: 'HRHCMHeader' },
      'sap-pm': { pageType: 'pmheader', pageId: 'PMHeader' },
      'sap-pp': { pageType: 'ppheader', pageId: 'PPHeader' },
      'sap-qm': { pageType: 'qmheader', pageId: 'QMHeader' },
      'sap-ps': { pageType: 'psheader', pageId: 'PSHeader' },
      'sap-bwbi': { pageType: 'bwbiheader', pageId: 'BwbiHeader' },
      'sap-s4': { pageType: 'hanaheader', pageId: 'HanaHeader' },
      'sap-s4-hana': { pageType: 'hanaheader', pageId: 'HanaHeader' }, // Added for specificity
      'sap-ariba': { pageType: 'aribaheader', pageId: 'AribaHeader' },
      'sap-successfactors': { pageType: 'succheader', pageId: 'SuccHeader' },
      'sap-ewm': { pageType: 'ewmheader', pageId: 'EWMHeader' },
      'sap-scm': { pageType: 'scmheader', pageId: 'SCMHeader' },
      'sap-course': { pageType: 'sapheader', pageId: 'SapHeader' },
      
      // CORRECTED: 'it-course' mapping
      'it-course': { pageType: 'itcoursesheader', pageId: 'ITcoursesHeader' }, 

      'python-course': { pageType: 'pythonheader', pageId: 'PythonHeader' },
      'java-course': { pageType: 'javaheader', pageId: 'JavaHeader' },
      'data-science': { pageType: 'MDSpage', pageId: 'MDSHeader' },
      'data-analytics': { pageType: 'MDApage', pageId: 'MDAHeader' },
      'business-analytics': { pageType: 'BApage', pageId: 'BAHeader' },
      'full-stack': { pageType: 'fullstackheader', pageId: 'FullStackHeader' },
      'full-stack-developer': { pageType: 'fullstackheader', pageId: 'FullStackHeader' }, // Added for specificity
      'mern-stack': { pageType: 'mernheader', pageId: 'MernHeader' },
      'salesforce-training': { pageType: 'salesheader', pageId: 'SalesHeader' },
      'ui-ux': { pageType: 'uiuxheader', pageId: 'UIUXHeader' },
      'chatgpt-course': { pageType: 'GPTpage', pageId: 'GPTHeader' },
      'power-bi': { pageType: 'powerbi', pageId: 'POWERBI' },
      'tableau-training': { pageType: 'tableau', pageId: 'TABLEAU' },
      'sql-course': { pageType: 'sql', pageId: 'SQL' },
      'data-visualisation': { pageType: 'datavisualheader', pageId: 'DataVisualHeader' },
      'data-visualisation-course': { pageType: 'datavisualheader', pageId: 'DataVisualHeader' }, // Added for specificity
      'digital-marketing': { pageType: 'digimheader', pageId: 'DIGIMHeader' },
      'digital-marketing-course': { pageType: 'digimheader', pageId: 'DIGIMHeader' }, // Added for specificity
      'hr-analytics': { pageType: 'anapage', pageId: 'ANAHeader' },
      'hr-analytics-course': { pageType: 'anapage', pageId: 'ANAHeader' }, // Added for specificity
      'hr-training': { pageType: 'hrtraining', pageId: 'HRTrainingHeader' }, // Typo? Check your JSON: hrthaader vs hrtrainingheader
      'hr-training-course': { pageType: 'hrtraining', pageId: 'HRTrainingHeader' }, // Added for specificity
      'core-hr': { pageType: 'corepage', pageId: 'COREHeader' },
      'core-hr-course': { pageType: 'corepage', pageId: 'COREHeader' }, // Added for specificity
      'hr-management': { pageType: 'manpage', pageId: 'MANHeader' },
      'hr-management-course': { pageType: 'manpage', pageId: 'MANHeader' }, // Added for specificity
      'hr-payroll': { pageType: 'payrollmanpage', pageId: 'PAYROLLHeader' },
      'hr-generalist': { pageType: 'genpage', pageId: 'GENHeader' },
    };
    
    // Find course mapping - try exact match first
    let courseInfo = courseMapping[courseSlug];
    console.log(`🔍 Initial exact match for "${courseSlug}":`, courseInfo);
    
    // If no exact match, try partial matches
    if (!courseInfo) {
      console.log(`🔍 No exact match found for "${courseSlug}", trying partial matches...`);
      for (const [key, value] of Object.entries(courseMapping)) {
        if (courseSlug.includes(key) || key.includes(courseSlug.replace('-course', ''))) {
          courseInfo = value;
          console.log(`✅ Partial match found for "${courseSlug}" with "${key}" ->`, value);
          break;
        }
      }
    }
    
    // If still no match, try category-based fallbacks
    if (!courseInfo) {
      console.log(`🔍 No partial match found for "${courseSlug}", trying category-based fallbacks...`);
      if (courseSlug.includes('sap')) {
        courseInfo = courseMapping['sap-course'];
        console.log(`✅ Fallback: SAP course`);
      } else if (courseSlug.includes('it')) {
        courseInfo = courseMapping['it-course']; // Uses the corrected 'itcoursesheader' mapping
        console.log(`✅ Fallback: IT course`);
      } else if (courseSlug.includes('hr')) {
        courseInfo = courseMapping['hr-course'];
        console.log(`✅ Fallback: HR course`);
      } else if (courseSlug.includes('data')) {
        courseInfo = courseMapping['data-science'];
        console.log(`✅ Fallback: Data course`);
      } else if (courseSlug.includes('digital-marketing')) {
        courseInfo = courseMapping['digital-marketing'];
        console.log(`✅ Fallback: Digital Marketing course`);
      }
    }
    
    if (!courseInfo) {
      console.warn(`❌ WARNING: No course mapping found for: "${courseSlug}". Cannot generate dynamic headers.`);
      return null;
    }
    
    console.log(`🎯 Final mapping used for "${courseSlug}": pageType="${courseInfo.pageType}", pageId="${courseInfo.pageId}"`);
    
    // Check if pageType exists in headerData
    if (!headerData[courseInfo.pageType]) {
      console.error(`❌ ERROR: Top-level key "${courseInfo.pageType}" not found in header data JSON. Please check dsHeaderData.json structure.`);
      console.log(`Available top-level keys in JSON:`, Object.keys(headerData));
      return null;
    }
    
    // Get the specific page data
    const pageData = headerData[courseInfo.pageType]?.[courseInfo.pageId];
    if (!pageData) {
      console.error(`❌ ERROR: No page data found for pageType: "${courseInfo.pageType}", pageId: "${courseInfo.pageId}".`);
      console.log(`Available pageIds under "${courseInfo.pageType}":`, Object.keys(headerData[courseInfo.pageType] || {}));
      return null;
    }
    
    console.log(`✅ Successfully found page data for "${courseInfo.pageType}" -> "${courseInfo.pageId}".`);
    
    // Format city name (e.g., "pimple-saudagar" -> "Pimple Saudagar")
    const formattedCity = city.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    console.log(`🏙️ Formatted city: "${city}" -> "${formattedCity}"`);
    
    // Replace {city} placeholder with actual city
    const h1 = pageData.title ? pageData.title.replace(/{city}/g, formattedCity) : '';
    const h2 = pageData.subtitle ? pageData.subtitle.replace(/{city}/g, formattedCity) : '';
    const description = pageData.description ? pageData.description.replace(/{city}/g, formattedCity) : '';
    
    console.log(`🎯 Generated headers:`);
    console.log(`   H1: "${h1.substring(0, 100)}${h1.length > 100 ? '...' : ''}"`);
    console.log(`   H2: "${h2.substring(0, 100)}${h2.length > 100 ? '...' : ''}"`);
    console.log(`--- getHeaderData Finished ---\n`);
    
    return { h1, h2, description };
  } catch (error) {
    console.error('❌ CRITICAL ERROR in getHeaderData:', error);
    return null;
  }
}

export function getStaticHtml(filename) {
  try {
    console.log(`\n--- getStaticHtml Called ---`);
    console.log(`🚀 Processing file: ${filename}`);
    
    const filePath = path.join(process.cwd(), 'src/pages', `${filename}.html`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ERROR: Static HTML file not found at: ${filePath}`);
      // Return a default structure with empty metadata and content
      return { 
        content: '', 
        metadata: {
          title: '', description: '', keywords: [], robots: 'index, follow', author: '', language: 'en-US',
          revisitAfter: '', distribution: '', rating: '', canonical: '', enhancedMeta: {},
          openGraph: {}, twitter: {}, facebook: {}, pinterest: {}, alternates: [], icons: {},
          manifest: '', preconnect: [], dnsPrefetch: [], jsonLd: null, isMajorCity: false,
        } 
      }; 
    }

    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the HTML
    const dom = new JSDOM(htmlContent);
    const doc = dom.window.document;
    
    // Determine city from filename to detect template type
    const slugParts = filename.split('-');
    const city = slugParts[slugParts.length - 1];
    
    let courseSlug = '';
    const lastInIndex = filename.lastIndexOf('-in-');
    if (lastInIndex !== -1) {
      courseSlug = filename.substring(0, lastInIndex); 
    } else {
      courseSlug = filename.split('-').slice(0, -1).join('-'); 
    }

    const isMajorCity = MAJOR_CITIES.includes(city); 
    
    console.log(`📊 Parsed filename: effective course slug for mapping="${courseSlug}", city="${city}", isMajorCity=${isMajorCity}`);
    
    // Extract metadata
    const title = doc.querySelector('title')?.textContent || '';
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    const canonical = getAttributeOrNull(doc.querySelector('link[rel="canonical"]'), 'href');
    const robots = getAttributeOrNull(doc.querySelector('meta[name="robots"]'), 'content') || 'index, follow';
    const author = getAttributeOrNull(doc.querySelector('meta[name="author"]'), 'content') || '';
    const language = getAttributeOrNull(doc.querySelector('meta[name="language"]'), 'content') || 'en-US';
    const revisitAfter = getAttributeOrNull(doc.querySelector('meta[name="revisit-after"]'), 'content') || '';
    const distribution = getAttributeOrNull(doc.querySelector('meta[name="distribution"]'), 'content') || '';
    const rating = getAttributeOrNull(doc.querySelector('meta[name="rating"]'), 'content') || '';
    
    // Extract enhanced meta tags for major cities
    let enhancedMeta = {};
    if (isMajorCity) {
      enhancedMeta = {
        geoRegion: getAttributeOrNull(doc.querySelector('meta[name="geo.region"]'), 'content') || '',
        geoPlacename: getAttributeOrNull(doc.querySelector('meta[name="geo.placename"]'), 'content') || '',
        geoPosition: getAttributeOrNull(doc.querySelector('meta[name="geo.position"]'), 'content') || '',
        icbm: getAttributeOrNull(doc.querySelector('meta[name="ICBM"]'), 'content') || '',
        courseProvider: getAttributeOrNull(doc.querySelector('meta[name="course.provider"]'), 'content') || '',
        courseLocation: getAttributeOrNull(doc.querySelector('meta[name="course.location"]'), 'content') || '',
        courseCategory: getAttributeOrNull(doc.querySelector('meta[name="course.category"]'), 'content') || '',
        themeColor: getAttributeOrNull(doc.querySelector('meta[name="theme-color"]'), 'content') || '#1a365d',
        msApplicationNavButtonColor: getAttributeOrNull(doc.querySelector('meta[name="msapplication-navbutton-color"]'), 'content') || '',
        appleStatusBarStyle: getAttributeOrNull(doc.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]'), 'content') || '',
        mobileWebCapable: getAttributeOrNull(doc.querySelector('meta[name="mobile-web-capable"]'), 'content') || '',
        appleMobileCapable: getAttributeOrNull(doc.querySelector('meta[name="apple-mobile-web-app-capable"]'), 'content') || '',
        appleMobileTitle: getAttributeOrNull(doc.querySelector('meta[name="apple-mobile-web-app-title"]'), 'content') || '',
      };
    }
    
    // Extract Open Graph data
    const ogTitle = getAttributeOrNull(doc.querySelector('meta[property="og:title"]'), 'content') || title;
    const ogDescription = getAttributeOrNull(doc.querySelector('meta[property="og:description"]'), 'content') || description;
    const ogImage = getAttributeOrNull(doc.querySelector('meta[property="og:image"]'), 'content');
    const ogImageWidth = getAttributeOrNull(doc.querySelector('meta[property="og:image:width"]'), 'content');
    const ogImageHeight = getAttributeOrNull(doc.querySelector('meta[property="og:image:height"]'), 'content');
    const ogImageAlt = getAttributeOrNull(doc.querySelector('meta[property="og:image:alt"]'), 'content');
    const ogUrl = getAttributeOrNull(doc.querySelector('meta[property="og:url"]'), 'content') || canonical;
    const ogType = getAttributeOrNull(doc.querySelector('meta[property="og:type"]'), 'content') || 'website';
    const ogLocale = getAttributeOrNull(doc.querySelector('meta[property="og:locale"]'), 'content') || 'en_US';
    const ogSiteName = getAttributeOrNull(doc.querySelector('meta[property="og:site_name"]'), 'content') || 'Connecting Dots ERP';
    const ogUpdatedTime = getAttributeOrNull(doc.querySelector('meta[property="og:updated_time"]'), 'content');
    
    // Extract Twitter Card data
    const twitterCard = getAttributeOrNull(doc.querySelector('meta[name="twitter:card"]'), 'content') || 'summary_large_image';
    const twitterTitle = getAttributeOrNull(doc.querySelector('meta[name="twitter:title"]'), 'content') || title;
    const twitterDescription = getAttributeOrNull(doc.querySelector('meta[name="twitter:description"]'), 'content') || description;
    const twitterImage = getAttributeOrNull(doc.querySelector('meta[name="twitter:image"]'), 'content') || ogImage;
    const twitterImageAlt = getAttributeOrNull(doc.querySelector('meta[name="twitter:image:alt"]'), 'content') || ogImageAlt;
    const twitterSite = getAttributeOrNull(doc.querySelector('meta[name="twitter:site"]'), 'content') || '@CD_ERP';
    const twitterCreator = getAttributeOrNull(doc.querySelector('meta[name="twitter:creator"]'), 'content') || '@CD_ERP';
    
    // Extract additional social media tags
    const fbAppId = getAttributeOrNull(doc.querySelector('meta[property="fb:app_id"]'), 'content');
    const pinterestRichPin = getAttributeOrNull(doc.querySelector('meta[name="pinterest-rich-pin"]'), 'content');
    
    // Extract JSON-LD structured data
    const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
    let jsonLd = null;
    if (jsonLdScript) {
      try {
        const jsonContent = jsonLdScript.textContent.trim();
        jsonLd = JSON.parse(jsonContent);
      } catch (e) {
        console.error('Error parsing JSON-LD:', e);
      }
    }
    
    // Get body content
    let bodyContent = doc.body?.innerHTML || ''; // This will be empty if your static HTML has no <body>
    
    // Check if H1 and H2 already exist in static content
    const existingH1 = doc.querySelector('h1');
    const existingH2 = doc.querySelector('h2');
    
    console.log(`🔍 Existing headers in static HTML: H1=${!!existingH1}, H2=${!!existingH2}`);
    
    if (!existingH1 || !existingH2) {
      console.log(`📝 Need to generate headers, calling getHeaderData...`);
      
      // Get header data from component
      const headerData = getHeaderData(courseSlug, city); // Synchronous call
      
      if (headerData && (headerData.h1 || headerData.h2)) {
        console.log(`✅ Got header data, generating HTML...`);
        
        let seoHeadersSection = '';
        
        // Always create the sr-only div, but conditionally include h1/h2/p
        seoHeadersSection = `
    <!-- Auto-generated SEO Headers from Header Component Data -->
    <div class="sr-only" style="
        position: absolute; 
        width: 1px; 
        height: 1px; 
        padding: 0; 
        margin: -1px; 
        overflow: hidden; 
        clip: rect(0, 0, 0, 0); 
        white-space: nowrap; 
        border-width: 0;
    ">
        ${!existingH1 && headerData.h1 ? `<h1>${headerData.h1}</h1>` : ''}
        ${!existingH2 && headerData.h2 ? `<h2>${headerData.h2}</h2>` : ''}
        ${headerData.description ? `<p>${headerData.description}</p>` : ''}
    </div>`;
        
        if (seoHeadersSection.trim() !== '') { // Only prepend if there's actual content in the section
          console.log(`✅ Generated SEO headers HTML, length: ${seoHeadersSection.length}`);
          // Prepend the SEO headers to the body content
          bodyContent = seoHeadersSection + bodyContent;
        }
      } else {
        console.log(`❌ Could not get header data or no h1/h2 found to generate for "${filename}"`);
      }
    } else {
      console.log(`✅ Headers already exist in static HTML, skipping generation for "${filename}"`);
    }
    
    // Extract alternate links
    const alternateLinks = Array.from(doc.querySelectorAll('link[rel="alternate"]'))
      .map(link => ({
        hreflang: getAttributeOrNull(link, 'hreflang'),
        href: getAttributeOrNull(link, 'href'),
      }))
      .filter(link => link.href !== null && link.hreflang !== null); // Filter out invalid links
    
    // Extract icons and manifests
    const favicon = getAttributeOrNull(doc.querySelector('link[rel="icon"]'), 'href') || '/favicon.ico';
    const appleTouchIcon = getAttributeOrNull(doc.querySelector('link[rel="apple-touch-icon"]'), 'href');
    const manifest = getAttributeOrNull(doc.querySelector('link[rel="manifest"]'), 'href');
    
    // Extract preconnect and DNS prefetch links
    const preconnectLinks = Array.from(doc.querySelectorAll('link[rel="preconnect"]'))
      .map(link => getAttributeOrNull(link, 'href'))
      .filter(Boolean); // Filters out null/empty strings
    
    const dnsPrefetchLinks = Array.from(doc.querySelectorAll('link[rel="dns-prefetch"]'))
      .map(link => getAttributeOrNull(link, 'href'))
      .filter(Boolean); // Filters out null/empty strings
    
    console.log(`✅ Finished processing ${filename}\n`);
    
    return {
      content: bodyContent,
      metadata: {
        title,
        description,
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        robots,
        author,
        language,
        revisitAfter,
        distribution,
        rating,
        canonical,
        enhancedMeta,
        openGraph: {
          title: ogTitle,
          description: ogDescription,
          images: ogImage ? [{
            url: ogImage,
            width: ogImageWidth ? parseInt(ogImageWidth) : undefined,
            height: ogImageHeight ? parseInt(ogImageHeight) : undefined,
            alt: ogImageAlt,
          }] : [],
          url: ogUrl,
          type: ogType,
          locale: ogLocale,
          siteName: ogSiteName,
          updatedTime: ogUpdatedTime,
        },
        twitter: {
          card: twitterCard,
          title: twitterTitle,
          description: twitterDescription,
          images: twitterImage ? [twitterImage] : [],
          imageAlt: twitterImageAlt,
          site: twitterSite,
          creator: twitterCreator,
        },
        facebook: {
          appId: fbAppId,
        },
        pinterest: {
          richPin: pinterestRichPin,
        },
        alternates: alternateLinks,
        icons: {
          icon: favicon,
          appleTouchIcon: appleTouchIcon,
        },
        manifest,
        preconnect: preconnectLinks,
        dnsPrefetch: dnsPrefetchLinks,
        jsonLd,
        isMajorCity,
      }
    };
  } catch (error) {
    console.error(`❌ Global Error in getStaticHtml for file ${filename}:`, error);
    return {
      content: '',
      metadata: {
        title: '',
        description: '',
        keywords: [],
        robots: 'index, follow',
        author: '',
        language: 'en-US',
        revisitAfter: '',
        distribution: '',
        rating: '',
        canonical: '',
        enhancedMeta: {},
        openGraph: {},
        twitter: {},
        facebook: {},
        pinterest: {},
        alternates: [],
        icons: {},
        manifest: '',
        preconnect: [],
        dnsPrefetch: [],
        jsonLd: null,
        isMajorCity: false,
      }
    };
  }
}