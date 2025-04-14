import "@/app/globals.css";
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";
import Marquee from "@/components/HomePage/Marquee2";
import Chevron from "@/components/HomePage/Chevron";
import Keypoints from "@/components/HomePage/Keypoints";
import OurClients from "@/components/HomePage/OurClients";
import PlacementSection from "@/components/HomePage/PlacementSection";
import OurStats from "@/components/HomePage/OurStats";
import Achievements from "@/components/HomePage/Achievements";
import FeedbackAndReviews from "@/components/HomePage/FeedbackandReviews";
import Certificate from "@/components/HomePage/Certificate";
import Branches from "@/components/HomePage/Branches";
import Courses from "@/components/HomePage/PopCourses";


export const metadata = {
  title: 'Connecting Dots ERP | SAP Training Institute In Pune',
  description: 'We offer Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.',
  keywords: 'SAP Certification Courses, SAP Course, Data Science Course, Power Bi Course, Digital Marketing Course, HR Training Institute, SAP Training Institute, Python Course, Software Course, Training, Education',
  author: 'Connecting Dots ERP | Software and SAP Training Institute'
}


export default function HomePage() {
  return (
    <main className="flex-col justify-center">
      <HeaderCarousel />
      <Marquee />
      <Chevron />
      <Keypoints />
      <OurClients />
      <Courses />
      <PlacementSection />
      <OurStats />
      <Achievements />
      <FeedbackAndReviews />
      <Certificate pageId= "HomepageCERT" />
      <Branches />
    </main>
  );
}
