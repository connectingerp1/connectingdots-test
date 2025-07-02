// src/app/(routes)/[slug]/page.js - FINAL ATTEMPT WITH AWAIT PARAMS & PAGE DATA
import { notFound } from "next/navigation";
import CourseComponentLoader from "@/components/CourseComponentLoader";
import ClientOnly from "@/context/ClientOnly";
import { getStaticHtml } from "@/lib/staticHtml"; // <--- Import getStaticHtml

export const dynamic = "force-dynamic";

async function getPageData(slug) {
  console.log(`\n--- getPageData Called in [slug]/page.js ---`);
  console.log(`Attempting to fetch static HTML data for slug: "${slug}"`);
  
  // Directly call the getStaticHtml function to get all data synchronously
  const data = getStaticHtml(slug); 
  
  if (!data || !data.content) {
    console.error(`❌ getPageData: No data or content found for slug: "${slug}"`);
    return null;
  }
  console.log(`✅ getPageData: Successfully retrieved data for slug: "${slug}"`);
  return data;
}

// Generate metadata for each page
export async function generateMetadata({ params }) {
  console.log(`\n--- generateMetadata Called ---`);
  
  // Await params to ensure it's fully resolved
  // This helps mitigate the "params should be awaited" warning in Next.js 15
  const resolvedParams = await params; 
  console.log(`Metadata generation for slug: "${resolvedParams?.slug}"`);

  const slug = resolvedParams?.slug; 
  if (!slug) {
    console.warn("❌ generateMetadata: Missing slug parameter. Returning empty metadata.");
    return {};
  }

  // Await getPageData even if it's synchronous to ensure proper Next.js hydration context
  // This ensures the data is fully available before metadata generation proceeds.
  const pageData = await getPageData(slug); 

  if (!pageData || !pageData.metadata) {
    console.warn(`❌ generateMetadata: No pageData or metadata received from getStaticHtml for slug: "${slug}". Returning empty metadata.`);
    return {};
  }

  const { metadata } = pageData;

  const metadataObject = {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots,
    authors: metadata.author ? [{ name: metadata.author }] : undefined,
    alternates: {
      canonical: metadata.canonical,
      languages: metadata.alternates.reduce((acc, alt) => {
        if (alt.hreflang && alt.href) {
          acc[alt.hreflang] = alt.href;
        }
        return acc;
      }, {}),
    },
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      url: metadata.openGraph.url,
      siteName: metadata.openGraph.siteName,
      images: metadata.openGraph.images,
      type: metadata.openGraph.type,
      locale: metadata.openGraph.locale,
      updatedTime: metadata.openGraph.updatedTime,
    },
    twitter: {
      card: metadata.twitter.card,
      title: metadata.twitter.title,
      description: metadata.twitter.description,
      images: metadata.twitter.images,
      site: metadata.twitter.site,
      creator: metadata.twitter.creator,
    },
    // Add other relevant metadata fields from your extracted data, using optional chaining for safety
    applicationName: metadata.applicationName,
    generator: metadata.generator,
    themeColor: metadata.enhancedMeta?.themeColor,
    msapplicationNavbuttonColor: metadata.enhancedMeta?.msApplicationNavButtonColor,
    appleMobileWebAppStatusBarStyle: metadata.enhancedMeta?.appleStatusBarStyle,
    mobileWebCapable: metadata.enhancedMeta?.mobileWebCapable,
    appleMobileWebAppCapable: metadata.enhancedMeta?.appleMobileCapable,
    appleMobileWebAppTitle: metadata.enhancedMeta?.appleMobileTitle,
  };

  if (metadata.isMajorCity && metadata.enhancedMeta) {
    // Ensure 'other' property exists before adding sub-properties
    metadataObject.other = metadataObject.other || {}; 
    Object.assign(metadataObject.other, {
      'geo.region': metadata.enhancedMeta.geoRegion,
      'geo.placename': metadata.enhancedMeta.geoPlacename,
      'geo.position': metadata.enhancedMeta.geoPosition,
      'ICBM': metadata.enhancedMeta.icbm,
      'course.provider': metadata.enhancedMeta.courseProvider,
      'course.location': metadata.enhancedMeta.courseLocation,
      'course.category': metadata.enhancedMeta.courseCategory,
    });
  }

  // Add preconnect/dns-prefetch
  if (metadata.preconnect && metadata.preconnect.length > 0) {
    metadataObject.preconnect = metadata.preconnect;
  }
  if (metadata.dnsPrefetch && metadata.dnsPrefetch.length > 0) {
    metadataObject.dnsPrefetch = metadata.dnsPrefetch;
  }

  // Add icons (ensure icon paths are not null/empty strings unless intended)
  metadataObject.icons = {
    icon: metadata.icons.icon || undefined, // Use undefined if empty to prevent error
    apple: metadata.icons.appleTouchIcon || undefined, // Use undefined if empty to prevent error
  };

  // Add manifest
  if (metadata.manifest) {
    metadataObject.manifest = metadata.manifest;
  }

  console.log(`✅ generateMetadata: Final metadata object generated for "${slug}".`);
  return metadataObject;
}

const CourseCityPage = async ({ params }) => {
  console.log(`\n--- CourseCityPage Component Rendered ---`);
  // Await params to ensure it's fully resolved
  // This helps mitigate the "params should be awaited" warning in Next.js 15
  const resolvedParams = await params;
  console.log(`Rendering for slug: "${resolvedParams?.slug}"`);

  const slug = resolvedParams?.slug; 
  if (!slug) {
    console.error("❌ CourseCityPage: Missing slug parameter. Returning notFound().");
    return notFound();
  }

  // Await getPageData even if it's synchronous to ensure proper Next.js hydration context
  // This ensures the data is fully available before component rendering proceeds.
  const pageData = await getPageData(slug); 
  if (!pageData) {
    console.error(`❌ CourseCityPage: No pageData received from getPageData for slug: "${slug}". Returning notFound().`);
    return notFound();
  }

  const { content, metadata } = pageData;

  // Extract course and city from the original slug (e.g., "it-course-in-chennai")
  const slugParts = slug.split("-");
  
  // Reconstruct the base course name (e.g., "it-course", "sap-fico")
  let courseBaseSlugForLoader = '';
  const lastInIndex = slug.lastIndexOf('-in-');
  if (lastInIndex !== -1) {
    courseBaseSlugForLoader = slug.substring(0, lastInIndex); 
  } else {
    // Fallback if the "-in-" pattern is not found (e.g., for non-course pages or different slug patterns)
    // This might need adjustment based on all your slug patterns.
    // For simplicity, for now, if no "-in-", assume the slug itself is the course base.
    courseBaseSlugForLoader = slug; 
  }
  
  const city = slugParts[slugParts.length - 1]; // "chennai" or "pune"

  // Format for CourseComponentLoader: "IT-COURSE" or "SAP-FICO"
  let formattedCourseForLoader = courseBaseSlugForLoader.toUpperCase(); 

  // Additional check if the formattedCourseForLoader still contains "-IN" after initial slice
  if (formattedCourseForLoader.endsWith('-IN')) {
    formattedCourseForLoader = formattedCourseForLoader.slice(0, -3); // remove "-IN"
  }


  console.log(`📊 CourseCityPage: Detected course for loader: "${formattedCourseForLoader}", city: "${city}"`);
  console.log(`JSON-LD status: ${metadata.jsonLd ? 'present' : 'absent'}`);


  return (
    <>
      {/* Inject JSON-LD structured data if available */}
      {/* Added defensive check for metadata.jsonLd to prevent error if it's undefined */}
      {metadata && metadata.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.jsonLd) }}
        />
      )}

      {/* Render only the body content from static HTML for SEO.
          H1/H2 will be prepended inside 'content' by staticHtml.js if missing. */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      
      {/* Remove this test paragraph once confirmed working */}
      {/* <p style={{ margin: '20px', padding: '10px', border: '2px solid blue', background: '#e0f7fa', color: '#006064', fontWeight: 'bold' }}>
            Test: If you see this, static content is being injected.
      </p> */}

      {/* Render Dynamic Course Component */}
      <ClientOnly key={`${formattedCourseForLoader}-${city}`}>
        <CourseComponentLoader 
          formattedCourse={formattedCourseForLoader} 
          city={city} 
          course={courseBaseSlugForLoader} // Pass the base slug if needed for dynamic component logic
        />
      </ClientOnly>
    </>
  );
};

export default CourseCityPage;