// src/app/(routes)/aboutus/page.js

import { getStaticHtml } from "@/lib/staticHtml";
import ContactUsClientContent from "@/components/ContactusPage/ContactUsClientContent"; // We will create this

// Get static HTML content
const staticHtml = getStaticHtml("contactus");

export default async function ContactPage() {
  return (
    <>
      {/* Static HTML content for SEO (will be visible in page source) */}
      <div id="seo-content" dangerouslySetInnerHTML={{ __html: staticHtml }} />

      {/* Dynamic React Content (rendered on client) */}
      {/* We hide the static part via CSS/JS in the actual static file OR rely on hydration replacement */}
      <ContactUsClientContent />
    </>
  );
}
