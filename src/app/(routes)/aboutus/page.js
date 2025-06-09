// src/app/(routes)/aboutus/page.js

import { getStaticHtml } from "@/lib/staticHtml";
import AboutUsClientContent from "@/components/AboutusPage/AboutUsClientContent"; // We will create this

// Get static HTML content
const staticHtml = getStaticHtml("aboutus");
export default async function AboutUsPage() {
  return (
    <>
      {/* Static HTML content for SEO (will be visible in page source) */}
      <div id="seo-content" dangerouslySetInnerHTML={{ __html: staticHtml }} />

      {/* Dynamic React Content (rendered on client) */}
      {/* We hide the static part via CSS/JS in the actual static file OR rely on hydration replacement */}
      <AboutUsClientContent />
    </>
  );
}
