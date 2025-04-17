// src/app/(routes)/blogs/page.js

import { getStaticHtml } from "@/lib/staticHtml";
import BlogClientContent from '@/components/BlogsPage/BlogClientContent'; // We will create this

const staticHtml = getStaticHtml('blog');


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

  return (
    <>
      {/* Static HTML content for SEO (will be visible in page source) */}
      <div id="seo-content" dangerouslySetInnerHTML={{ __html: staticHtml }} />

      {/* Dynamic React Content (rendered on client) */}
      <BlogClientContent />
    </>
  );
}
