// src/app/(routes)/all-course-links/page.js
import Link from 'next/link'; // Use Next.js Link for client-side navigation benefits

// Assuming your data is accessible here (e.g., import from a central file)
// If not, fetch or import them as needed.
// Example: import { cities, courses } from '@/data/courseData';

const cities = [
    "pune", "mumbai", "delhi", "kolkata", "chennai", "bangalore", "hyderabad",
    "ahmedabad", "jaipur", "lucknow", "kanpur", "nagpur", "patna", "indore",
    "bhopal", "visakhapatnam", "vadodara", "ludhiana", "agra", "nashik",
    "rajkot", "varanasi", "kerala", "surat", "dehradun", "madurai", "mysore",
    "pondicherry", "ranchi", "coimbatore", "chandigarh", "bhubaneswar",
    "tirupati", "vizag", "trivandrum", "jalandhar", "mohali", "raipur",
    "cochin", "mangalore", "katraj", "pimpri-chinchwad", "shivaji-nagar",
    "koregaon-park", "viman-nagar", "pimple-saudagar", "baner", "hinjewadi",
    "wakad", "kothrud", "hadapsar", "aundh", "navi-mumbai", "thane", "kalyan",
    "bandra", "andheri", "powai", "worli", "chembur", "malad", "vile-parle",
    "matunga",
];

const courses = [
    "sap-course-in", "it-course-in", "hr-course-in", "data-visualisation-course-in",
    "data-science-course-in", "data-analytics-course-in", "business-analytics-course-in",
    "chatgpt-course-in", "full-stack-developer-course-in", "java-course-in",
    "mern-stack-course-in", "python-course-in", "salesforce-training-in",
    "ui-ux-course-in", "sap-ewm-course-in", "sap-abap-course-in",
    "sap-ariba-course-in", "sap-basis-course-in", "sap-bwbi-course-in",
    "sap-fico-course-in", "sap-s4-hana-course-in", "sap-hr-hcm-course-in",
    "sap-mm-course-in", "sap-pm-course-in", "sap-pp-course-in", "sap-ps-course-in",
    "sap-qm-course-in", "sap-scm-course-in", "sap-sd-course-in",
    "sap-successfactors-course-in", "power-bi-course-in", "sql-course-in",
    "tableau-training-in", "digital-marketing-course-in", "hr-analytics-course-in",
    "hr-training-course-in", "core-hr-course-in", "hr-management-course-in",
    "hr-payroll-course-in", "hr-generalist-course-in",
];

// Helper function to format names (optional but good for readability)
function formatName(slug) {
  // Simple capitalization
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export default function AllCourseLinksPage() {
  const allLinks = [];

  courses.forEach(courseSlug => {
    const courseBaseName = courseSlug.replace(/-in$/, ''); // Remove trailing '-in'
    const formattedCourseName = formatName(courseBaseName);

    cities.forEach(citySlug => {
      const url = `/${courseSlug}-${citySlug}`;
      const formattedCityName = formatName(citySlug);
      const linkText = `${formattedCourseName} in ${formattedCityName}`;

      // Use a unique key for React lists
      const key = `${courseSlug}-${citySlug}`;

      allLinks.push(
        <li key={key}>
          <Link href={url} style={{ textDecoration: 'underline', color: 'blue', marginBottom: '5px', display: 'inline-block' }}>
            {linkText}
          </Link>
        </li>
      );
    });
  });

  return (
    <div> {/* Or use a more semantic container */}
      <h1>All Course and City Links</h1>
      <p>This page lists all available course combinations across different cities.</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allLinks}
      </ul>
    </div>
  );
}

// Optional: Add metadata for the page
export const metadata = {
  title: 'All Course Links | Connecting Dots ERP',
  description: 'Find links to all our courses offered in various cities across India.',
  // Prevent this specific page from being indexed if you prefer (usually not necessary)
  // robots: { index: false, follow: true }
};