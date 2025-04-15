// src/app/(routes)/aboutus/page.js

import { notFound } from 'next/navigation';
import { getStaticPageHtml } from '@/lib/staticHtml';
import AboutUsClientContent from '@/components/AboutusPage/AboutUsClientContent'; // We will create this

// Server Component: Fetches data and defines metadata

// Define metadata (moved from Client Component's <Head>)
export const metadata = {
  title: 'About Connecting Dots ERP | Our Mission & Vision', // From your previous example
  description: 'Learn about Connecting Dots ERP, our mission, vision, values, and the team dedicated to empowering students and professionals with industry-leading SAP, IT, and HR training.', // From your previous example
  alternates: {
    canonical: '/aboutus', // Adjust if your URL is different
  },
  // Add matching Open Graph / Twitter tags here if desired
};

export default async function AboutUsPage() {
  // Fetch static HTML
  const htmlContent = await getStaticPageHtml('aboutus'); // Reads aboutus.html

  if (!htmlContent) {
    notFound(); // Show 404 if static file missing
  }

  return (
    <>
      {/* Static HTML for SEO */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* Dynamic React Content (rendered on client) */}
      {/* We hide the static part via CSS/JS in the actual static file OR rely on hydration replacement */}
      <AboutUsClientContent />
    </>
  );
}