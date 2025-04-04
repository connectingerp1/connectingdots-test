import Breadcrumb from "@/components/CitySitemap/Breadcrumb";
import CitySitemap from "@/components/CitySitemap/CitySitemap";

export const metadata = {
  title: "City Course Sitemap | Connecting Dots ERP",
  description: "Browse our comprehensive range of professional courses available in cities across India including Pune, Mumbai, Bangalore, Delhi, and more.",
  keywords: "course sitemap, city courses, SAP training, IT courses, Digital Marketing courses, Data Science courses, HR courses, courses in Pune, courses in Mumbai, training programs India",
};

export default function SitemapPage() {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Sitemap", path: "/sitemap" },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />
      <CitySitemap />
    </main>
  );
}