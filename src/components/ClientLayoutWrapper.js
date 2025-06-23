// components/ClientLayoutWrapper.js
"use client";

import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazy load client-side components
const BackgroundAnimation = dynamic(
  () => import("@/components/Common/BackgroundAnimation"),
  { ssr: false, loading: () => null }
);

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const PopupForm = dynamic(() => import("@/components/PopupForm"), { ssr: false });
const Stickyform = dynamic(() => import("@/components/Stickyform"), { ssr: false });

// Regular imports for lighter components
import WaveComponent from "@/components/Wave";
import Whatsapp from "@/components/Whatsapp";
import Floatingcontact from "@/components/Floatingcontact";
import BottomMenu from "@/components/BottomMenu";
import ScrollToTop from "@/components/ScrollToTop";
import CourseLoader from "@/components/CourseLoader";

export default function ClientLayoutWrapper() {
  const pathname = usePathname();
  const hiddenRoutes = [
    "/dashboard",
    "/AdminLogin",
    "/superadmin",
    "/superadmin/dashboard",
    "/superadmin/users",
    "/superadmin/leads",
    "/superadmin/analytics",
    "/superadmin/activity",
    "/superadmin/audit-logs",
    "/superadmin/roles",
    "/superadmin/settings",
  ];
  const shouldHideComponent = hiddenRoutes.includes(pathname);

  // API pings
  useEffect(() => {
    const delayedPing = setTimeout(() => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiBaseUrl) {
        fetch(`${apiBaseUrl}/api/ping`).catch(() => {});
      }
    }, 3000);

    const delayedBlogPing = setTimeout(() => {
      const blogBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (blogBaseUrl) {
        fetch(`${blogBaseUrl}/api/blogs/ping`).catch(() => {});
      }
    }, 4000);

    return () => {
      clearTimeout(delayedPing);
      clearTimeout(delayedBlogPing);
    };
  }, []);

  return (
    <>
      <BackgroundAnimation />
      
      <Suspense fallback={null}>
        <CourseLoader />
      </Suspense>

      <ScrollToTop />
      <Floatingcontact phoneNumber="+919004002958" />
      <Whatsapp phoneNumber="+919004002958" />
      
      {/* Lazy loaded heavy components */}
      <Chatbot />
      <Stickyform />
      <PopupForm />
      
      {!shouldHideComponent && <WaveComponent />}
      <BottomMenu />
    </>
  );
}