// src/app/(routes)/blogs/page.js

import { notFound } from 'next/navigation';
import { getStaticPageHtml } from '@/lib/staticHtml';
import BlogClientContent from '@/components/BlogsPage/BlogClientContent'; // We will create this

// Server Component: Fetches data and defines metadata

export const metadata = {
  title: 'Connecting Dots ERP Blog | SAP, IT & HR Insights', // From your previous example
  description: 'Explore the latest articles, insights, and news from Connecting Dots ERP on SAP, IT training, HR trends, and career development.', // From your previous example
  alternates: {
    canonical: '/blogs', // Adjust if your URL structure is different
  },
  // Add matching Open Graph / Twitter tags here if desired
};

export default async function BlogIndexPage() {
   // Fetch static HTML
   const htmlContent = await getStaticPageHtml('blog'); // Reads blog.html

   if (!htmlContent) {
     notFound(); // Show 404 if static file missing
   }

  return (
    <>
      {/* Static HTML for SEO */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* Dynamic React Content (rendered on client) */}
      <BlogClientContent />
    </>
  );
}
