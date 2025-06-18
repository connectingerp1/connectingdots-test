// app/(routes)/all-course-links/page.js
import Breadcrumb from "@/components/CitySitemap/Breadcrumb";
import CourseLinksSearch from "@/components/CitySitemap/CourseLinksSearch";
import { getStaticHtml } from "@/lib/staticHtml";

// Get static HTML content (this runs on server)
const staticHtml = getStaticHtml("allcourseslinks");

// Define breadcrumb items for this page
const breadcrumbItems = [
  { label: "Home", path: "/home" },
  { label: "Sitemap" },
];

export default function AllCourseLinks() {
  return (
    <>
      {/* Static HTML content for SEO (will be visible in page source) */}
      <div id="seo-content" dangerouslySetInnerHTML={{ __html: staticHtml }} />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Client component with search functionality */}
      <CourseLinksSearch />
    </>
  );
}