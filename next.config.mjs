/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "blog-page-panel.onrender.com",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
    ],
    domains: [
      "i.imgur.com",
      "imgur.com",
      "blog-page-panel.onrender.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: "/:path*.(jpg|jpeg|gif|png|svg|webp|avif|ico|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots.txt",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "dashboard.connectingdotserp.com",
          },
        ],
        destination: "/dashboard",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/sap-training-in-pune",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Mumbai",
        destination: "/sap-sd-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Pune",
        destination: "/sap-sd-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-mumbai",
        destination: "/hr-analytics-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-course-in-Mumbai",
        destination: "/sap-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-course-in-Pune",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Mumbai",
        destination: "/sap-sd-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-courses-training-institute-in-Pune",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Pune",
        destination: "/sap-mm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-courses",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-course-in-Raipur",
        destination: "/sap-course-in-raipur",
        permanent: true,
      },
      {
        source: "/blog.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/best-data-science-course-in-mumbai",
        destination: "/data-science-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Mumbai",
        destination: "/sap-ewm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-functional-courses",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-courses-training-institute-in-pune",
        destination: "/hr-training-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-courses-training-institute-in-mumbai",
        destination: "/sap-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/software-courses-training-institute-in-mumbai",
        destination: "/it-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/software-courses-training-institute-in-pune",
        destination: "/it-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap/page-6880537",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-courses",
        destination: "/hr-training-course-in-pune",
        permanent: true,
      },
      {
        source: "/powerbi-course-in-mumbai",
        destination: "/power-bi-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/best-data-science-course-in-mumbai",
        destination: "/data-science-course-in-pune",
        permanent: true,
      },
      {
        source: "/best-sap-course-in-Mumbai",
        destination: "/sap-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-courses-training-institute-in-Mumbai",
        destination: "/sap-successfactors-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-successfactor-course-in-mumbai",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-technical-courses",
        destination: "/sap-hr-hcm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-mumbai",
        destination: "/sap-hr-hcm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-pune",
        destination: "/sap-ewm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Mumbai",
        destination: "/hr-analytics-course-in-pune",
        permanent: true,
      },
      {
        source: "/advance-hr-analytics-course-in-pune",
        destination: "/data-science-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Mumbai",
        destination: "/hr-training-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/hr-training-course-in-Mumbai",
        destination: "/hr-training-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-training-course-in-Pune",
        destination: "/power-bi-course-in-pune",
        permanent: true,
      },
      {
        source: "/powerbi-course-in-pune",
        destination: "/hr-training-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/hr-courses-training-institute-in-mumbai",
        destination: "/hr-training-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Pune",
        destination: "/sap-fico-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-abap-course-in-Mumbai",
        destination: "/sap-abap-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Hyderabad",
        destination: "/sap-mm-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Delhi",
        destination: "/sap-sd-course-in-delhi",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Vadodara",
        destination: "/mern-stack-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Trivandrum",
        destination: "/hr-analytics-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/sap-s4-hana-course-in-Mangalore",
        destination: "/sap-s4-hana-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Pune",
        destination: "/digital-marketing-course-in-pune",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Nagpur",
        destination: "/core-hr-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Pondicherry",
        destination: "/data-analytics-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Delhi",
        destination: "/hr-analytics-course-in-delhi",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Vadodara",
        destination: "/digital-marketing-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Patna",
        destination: "/core-hr-course-in-patna",
        permanent: true,
      },
      {
        source: "/Java-course-in-Lucknow",
        destination: "/java-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Kolkata",
        destination: "/digital-marketing-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Raipur",
        destination: "/sap-sd-course-in-raipur",
        permanent: true,
      },
      {
        source: "/sap-qm-course-in-Mumbai",
        destination: "/sap-qm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/python-course-in-Dehradun",
        destination: "/python-course-in-dehradun",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Mumbai",
        destination: "/sap-pm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-abap-course-in-Mumbai",
        destination: "/sap-abap-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Ranchi",
        destination: "/data-analytics-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Cochin",
        destination: "/data-science-course-in-cochin",
        permanent: true,
      },
      {
        source: "/python-course-in-Surat",
        destination: "/python-course-in-surat",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Mysore",
        destination: "/hr-payroll-course-in-mysore",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Mysore",
        destination: "/hr-management-course-in-mysore",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Jalandhar",
        destination: "/mern-stack-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Varanasi",
        destination: "/data-science-course-in-varanasi",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Mangalore",
        destination: "/mern-stack-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Coimbatore",
        destination: "/data-analytics-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/python-course-in-Mangalore",
        destination: "/python-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/full-stack-developer-course-in-Bhubaneswar",
        destination: "/full-stack-developer-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Visakhapatnam",
        destination: "/hr-analytics-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/python-course-in-Bhopal",
        destination: "/python-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Kolkata",
        destination: "/data-science-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Hyderabad",
        destination: "/data-science-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Chennai",
        destination: "/data-science-course-in-chennai",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Delhi",
        destination: "/data-science-course-in-delhi",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Ahmedabad",
        destination: "/data-science-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/salesforce-course-in-Pune",
        destination: "/salesforce-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Vadodara",
        destination: "/hr-analytics-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/sql-course-in-Bhubaneswar",
        destination: "/sql-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Pondicherry",
        destination: "/hr-analytics-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Pondicherry",
        destination: "/mern-stack-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/sap-ps-course-in-Pune",
        destination: "/sap-ps-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Kolkata",
        destination: "/sap-bwbi-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Bhopal",
        destination: "/sap-bwbi-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Mohali",
        destination: "/sap-bwbi-course-in-mohali",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Pune",
        destination: "/sap-hr-hcm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Pune",
        destination: "/sap-hr-hcm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Pune",
        destination: "/sap-pm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Pune",
        destination: "/sap-basis-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Chandigarh",
        destination: "/sap-bwbi-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Pune",
        destination: "/sap-successfactors-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-qm-course-in-Pune",
        destination: "/sap-qm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Mysore",
        destination: "/sap-bwbi-course-in-mysore",
        permanent: true,
      },
      {
        source: "/sap-s4-hana-course-in-Pune",
        destination: "/sap-s4-hana-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-netweaver-course-in-Pune",
        destination: "/sap-netweaver-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Pune",
        destination: "/sap-sd-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-pp-course-in-Pune",
        destination: "/sap-pp-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-abap-course-in-Pune",
        destination: "/sap-abap-course-in-pune",
        permanent: true,
      },

      {
        source: "/hr-training-course-in-Ludhiana",
        destination: "/hr-training-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/sap-ariba-course-in-Bangalore",
        destination: "/sap-ariba-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Pondicherry",
        destination: "/data-analytics-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Jalandhar",
        destination: "/hr-management-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Delhi",
        destination: "/core-hr-course-in-delhi",
        permanent: true,
      },
      {
        source: "/python-course-in-Ludhiana",
        destination: "/python-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/Java-course-in-Jaipur",
        destination: "/java-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Vadodara",
        destination: "/hr-payroll-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Ahmedabad",
        destination: "/hr-payroll-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Rajkot",
        destination: "/hr-payroll-course-in-rajkot",
        permanent: true,
      },
      {
        source: "/Java-course-in-Patna",
        destination: "/java-course-in-patna",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Bhopal",
        destination: "/hr-management-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Ranchi",
        destination: "/core-hr-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Madurai",
        destination: "/mern-stack-course-in-madurai",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Indore",
        destination: "/core-hr-course-in-indore",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Chennai",
        destination: "/hr-payroll-course-in-chennai",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Mumbai",
        destination: "/digital-marketing-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Bhopal",
        destination: "/core-hr-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Vizag",
        destination: "/digital-marketing-course-in-vizag",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Trivandrum",
        destination: "/core-hr-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Ludhiana",
        destination: "/mern-stack-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/business-analytics-course-in-Hyderabad",
        destination: "/business-analytics-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Agra",
        destination: "/hr-payroll-course-in-agra",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Bangalore",
        destination: "/digital-marketing-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Bangalore",
        destination: "/data-analytics-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Bhopal",
        destination: "/data-science-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Mumbai",
        destination: "/hr-payroll-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-pp-course-in-Mumbai",
        destination: "/sap-pp-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Jaipur",
        destination: "/data-science-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Trivandrum",
        destination: "/mern-stack-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/Java-course-in-Coimbatore",
        destination: "/java-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Mumbai",
        destination: "/sap-scm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/python-course-in-Lucknow",
        destination: "/python-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Cochin",
        destination: "/digital-marketing-course-in-cochin",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Indore",
        destination: "/data-science-course-in-indore",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Patna",
        destination: "/data-science-course-in-patna",
        permanent: true,
      },
      {
        source: "/Java-course-in-Madurai",
        destination: "/java-course-in-madurai",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Jalandhar",
        destination: "/hr-payroll-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Raipur",
        destination: "/data-analytics-course-in-raipur",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Raipur",
        destination: "/sap-mm-course-in-raipur",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Ahmedabad",
        destination: "/data-analytics-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Delhi",
        destination: "/mern-stack-course-in-delhi",
        permanent: true,
      },
      {
        source: "/python-course-in-Trivandrum",
        destination: "/python-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/python-course-in-Mohali",
        destination: "/python-course-in-mohali",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Kolkata",
        destination: "/mern-stack-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/Java-course-in-Dehradun",
        destination: "/java-course-in-dehradun",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Chennai",
        destination: "/core-hr-course-in-chennai",
        permanent: true,
      },
      {
        source: "/Java-course-in-Pondicherry",
        destination: "/java-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/sap-ps-course-in-Raipur",
        destination: "/sap-ps-course-in-raipur",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Jalandhar",
        destination: "/hr-management-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Surat",
        destination: "/hr-payroll-course-in-surat",
        permanent: true,
      },
      {
        source: "/full-stack-developer-course-in-Patna",
        destination: "/full-stack-developer-course-in-patna",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Mohali",
        destination: "/core-hr-course-in-mohali",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Kanpur",
        destination: "/core-hr-course-in-kanpur",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Vizag",
        destination: "/mern-stack-course-in-vizag",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Bhopal",
        destination: "/hr-analytics-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/full-stack-developer-course-in-Mangalore",
        destination: "/full-stack-developer-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Raipur",
        destination: "/digital-marketing-course-in-raipur",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Madurai",
        destination: "/hr-analytics-course-in-madurai",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Coimbatore",
        destination: "/hr-payroll-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/business-analytics-course-in-Coimbatore",
        destination: "/business-analytics-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Delhi",
        destination: "/hr-management-course-in-delhi",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Visakhapatnam",
        destination: "/digital-marketing-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Nagpur",
        destination: "/digital-marketing-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/sql-course-in-Pune",
        destination: "/sql-course-in-pune",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Bhopal",
        destination: "/mern-stack-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Mohali",
        destination: "/sap-scm-course-in-mohali",
        permanent: true,
      },
      {
        source: "/business-analytics-course-in-Chennai",
        destination: "/business-analytics-course-in-chennai",
        permanent: true,
      },
      {
        source: "/hr-payroll-course-in-Ludhiana",
        destination: "/hr-payroll-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Visakhapatnam",
        destination: "/mern-stack-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/full-stack-developer-course-in-Agra",
        destination: "/full-stack-developer-course-in-agra",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Pondicherry",
        destination: "/digital-marketing-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/sap-ps-course-in-Bhopal",
        destination: "/sap-ps-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/python-course-in-Ahmedabad",
        destination: "/python-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Lucknow",
        destination: "/digital-marketing-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Varanasi",
        destination: "/mern-stack-course-in-varanasi",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Lucknow",
        destination: "/hr-analytics-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Vizag",
        destination: "/ui-ux-course-in-vizag",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Kerala",
        destination: "/hr-management-course-in-kerala",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Madurai",
        destination: "/ui-ux-course-in-madurai",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Mumbai",
        destination: "/ui-ux-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/python-course-in-Kolkata",
        destination: "/python-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Nagpur",
        destination: "/mern-stack-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Visakhapatnam",
        destination: "/core-hr-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Vadadora",
        destination: "/hr-analytics-course-in-vadadora",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Mangalore",
        destination: "/sap-successfactors-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/sap-PP-course-in-Chandigarh",
        destination: "/sap-pp-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Rajkot",
        destination: "/hr-analytics-course-in-rajkot",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Mangalore",
        destination: "/hr-management-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Mangalore",
        destination: "/sap-bwbi-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/sap-netweaver-course-in-Lucknow",
        destination: "/sap-netweaver-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Bhopal",
        destination: "/sap-ewm-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sql-course-in-Bhubneshwar",
        destination: "/sql-course-in-bhubneshwar",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Pondicheery",
        destination: "/hr-analytics-course-in-pondicheery",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Lucknow",
        destination: "/sap-ewm-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Patna",
        destination: "/digital-marketing-course-in-patna",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Bhubaneswar",
        destination: "/sap-scm-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Mangalore",
        destination: "/hr-analytics-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Coimbatore",
        destination: "/mern-stack-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Nashik",
        destination: "/hr-management-course-in-nashik",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Lucknow",
        destination: "/sap-fico-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-PP-course-in-Kolkata",
        destination: "/sap-pp-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/python-course-in-Raipur",
        destination: "/python-course-in-raipur",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Chennai",
        destination: "/hr-management-course-in-chennai",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Mohali",
        destination: "/sap-ewm-course-in-mohali",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Mohali",
        destination: "/hr-management-course-in-mohali",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Kolkata",
        destination: "/core-hr-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Ahmedabad",
        destination: "/core-hr-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Mohali",
        destination: "/sap-bwbi-course-in-mohali",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Ahmedabad",
        destination: "/sap-hcm-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Ludhiana",
        destination: "/hr-analytics-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/sql-course-in-Trivandrum",
        destination: "/sql-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Chandigarh",
        destination: "/sap-sd-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Kolkata",
        destination: "/hr-management-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/sql-course-in-Agra",
        destination: "/sql-course-in-agra",
        permanent: true,
      },
      {
        source: "/sap-netweaver-course-in-Ahmedabad",
        destination: "/sap-netweaver-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Varanasi",
        destination: "/digital-marketing-course-in-varanasi",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Jalandhar",
        destination: "/core-hr-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/python-course-in-Bhubaneswar",
        destination: "/python-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Bhopal",
        destination: "/ui-ux-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Lucknow",
        destination: "/sap-basis-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Jaipur",
        destination: "/ui-ux-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Ahmedabad",
        destination: "/sap-successfactors-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Coimbatore",
        destination: "/digital-marketing-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/sql-course-in-Ahmedabad",
        destination: "/sql-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Chandigarh",
        destination: "/sap-basis-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Vadodara",
        destination: "/digital-marketing-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Mohali",
        destination: "/sap-pm-course-in-mohali",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Visakhapatnam",
        destination: "/mern-stack-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Ahmedabad",
        destination: "/sap-pm-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Mysore",
        destination: "/sap-mm-course-in-mysore",
        permanent: true,
      },
      {
        source: "/sap-netweaver-course-in-Bhopal",
        destination: "/sap-netweaver-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sql-course-in-Dehradun",
        destination: "/sql-course-in-dehradun",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Vizag",
        destination: "/hr-analytics-course-in-vizag",
        permanent: true,
      },
      {
        source: "/sql-course-in-Nagpur",
        destination: "/sql-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Vadodara",
        destination: "/ui-ux-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Nashik",
        destination: "/mern-stack-course-in-nashik",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Ahmedabad",
        destination: "/digital-marketing-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Visakhapatnam",
        destination: "/hr-management-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Varanasi",
        destination: "/hr-management-course-in-varanasi",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Chandigarh",
        destination: "/core-hr-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Agra",
        destination: "/sap-mm-course-in-agra",
        permanent: true,
      },
      {
        source: "/sql-course-in-Mangalore",
        destination: "/sql-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Chennai",
        destination: "/digital-marketing-course-in-chennai",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Surat",
        destination: "/hr-analytics-course-in-surat",
        permanent: true,
      },
      {
        source: "/sql-course-in-Cochin",
        destination: "/sql-course-in-cochin",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Chandigarh",
        destination: "/sap-fico-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Patna",
        destination: "/core-hr-course-in-patna",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Pondicheery",
        destination: "/mern-stack-course-in-pondicheery",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Mysore",
        destination: "/sap-successfactors-course-in-mysore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Nashik",
        destination: "/ui-ux-course-in-nashik",
        permanent: true,
      },
      {
        source: "/sap-netweaver-course-in-Chandigarh",
        destination: "/sap-netweaver-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/sql-course-in-Pondicherry",
        destination: "/sql-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Ahmedabad",
        destination: "/sap-bwbi-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Kerala",
        destination: "/ui-ux-course-in-kerala",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Mysore",
        destination: "/mern-stack-course-in-mysore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Hyderabad",
        destination: "/ui-ux-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Chandigarh",
        destination: "/sap-successfactors-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-koregaon-park",
        destination: "/hr-analytics-course-in-koregaon-park",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Pune",
        destination: "/sap-mm-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-course-in-Raipur",
        destination: "/sap-course-in-raipur",
        permanent: true,
      },

      {
        source: "/sap-hcm-course-in-Agra",
        destination: "/sap-hcm-course-in-agra",
        permanent: true,
      },
      {
        source: "/python-course-in-Cochin",
        destination: "/python-course-in-cochin",
        permanent: true,
      },
      {
        source: "/Java-course-in-indore",
        destination: "/java-course-in-indore",
        permanent: true,
      },
      {
        source: "/python-course-in-Vadodara",
        destination: "/python-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Chandigarh",
        destination: "/sap-ewm-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/chatgpt-course-in-Kanpur/",
        destination: "/chatgpt-course-in-kanpur/",
        permanent: true,
      },
      {
        source: "/mumbai/",
        destination: "/mumbai/",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Lucknow",
        destination: "/core-hr-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Bhubaneswar",
        destination: "/digital-marketing-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Agra",
        destination: "/sap-fico-course-in-agra",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Tirupati",
        destination: "/mern-stack-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/sap-course-in-Raipur",
        destination: "/sap-course-in-raipur",
        permanent: true,
      },
      {
        source: "/business-analytics-course-in-Kerala",
        destination: "/business-analytics-course-in-kerala",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Raipur",
        destination: "/hr-management-course-in-raipur",
        permanent: true,
      },
      {
        source: "/data-science-course-in-Mumbai",
        destination: "/data-science-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Ahmedabad",
        destination: "/ui-ux-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/python-course-in-Ranchi",
        destination: "/python-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Mangalore",
        destination: "/sap-mm-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Agra",
        destination: "/sap-ewm-course-in-agra",
        permanent: true,
      },
      {
        source: "/sql-course-in-Bangalore",
        destination: "/sql-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Agra",
        destination: "/sap-sd-course-in-agra",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Chandigarh",
        destination: "/hr-analytics-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Vizag",
        destination: "/core-hr-course-in-vizag",
        permanent: true,
      },
      {
        source: "/sql-course-in-Chennai",
        destination: "/sql-course-in-chennai",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Jalandhar",
        destination: "/ui-ux-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Patna",
        destination: "/hr-management-course-in-patna",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Tirupati",
        destination: "/hr-management-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/Java-course-in-tirupati",
        destination: "/java-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Surat",
        destination: "/hr-management-course-in-surat",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Indore",
        destination: "/mern-stack-course-in-indore",
        permanent: true,
      },
      {
        source: "/sql-course-in-Ranchi",
        destination: "/sql-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Lucknow",
        destination: "/mern-stack-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/python-course-in-Bangalore",
        destination: "/python-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Raipur",
        destination: "/mern-stack-course-in-raipur",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Chennai",
        destination: "/ui-ux-course-in-chennai",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Chennai",
        destination: "/mern-stack-course-in-chennai",
        permanent: true,
      },
      {
        source: "/Java-course-in-lucknow",
        destination: "/java-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Varanasi",
        destination: "/hr-analytics-course-in-varanasi",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Jaipur",
        destination: "/hr-analytics-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/sql-course-in-Delhi",
        destination: "/sql-course-in-delhi",
        permanent: true,
      },
      {
        source: "/python-course-in-Delhi",
        destination: "/python-course-in-delhi",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Mangalore",
        destination: "/sap-scm-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Chandigarh",
        destination: "/ui-ux-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/python-course-in-Nashik",
        destination: "/python-course-in-nashik",
        permanent: true,
      },
      {
        source: "/python-course-in-Coimbatore",
        destination: "/python-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Mysore",
        destination: "/digital-marketing-course-in-mysore",
        permanent: true,
      },
      {
        source: "/python-course-in-Pune",
        destination: "/python-course-in-pune",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Ahmedabad",
        destination: "/sap-scm-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/hr-training-course-in-Raipur",
        destination: "/hr-training-course-in-raipur",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Agra",
        destination: "/mern-stack-course-in-agra",
        permanent: true,
      },
      {
        source: "/sap-ewm-course-in-Bhubaneswar",
        destination: "/sap-ewm-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Ludhiana",
        destination: "/ui-ux-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Bhubaneswar",
        destination: "/sap-sd-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/sql-course-in-Madurai",
        destination: "/sql-course-in-madurai",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Mangalore",
        destination: "/sap-basis-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Ahmedabad",
        destination: "/sap-basis-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Patna",
        destination: "/mern-stack-course-in-patna",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Surat",
        destination: "/mern-stack-course-in-surat",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Trivandrum",
        destination: "/digital-marketing-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Mysore",
        destination: "/core-hr-course-in-mysore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Bhopal",
        destination: "/digital-marketing-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Coimbatore",
        destination: "/core-hr-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Ranchi",
        destination: "/digital-marketing-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Coimbatore",
        destination: "/ui-ux-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/Java-course-in-madurai",
        destination: "/java-course-in-madurai",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Trivandrum",
        destination: "/hr-management-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Kanpur",
        destination: "/ui-ux-course-in-kanpur",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Bhopal",
        destination: "/sap-sd-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Agra",
        destination: "/hr-management-course-in-agra",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Bangalore",
        destination: "/mern-stack-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Jaipur",
        destination: "/digital-marketing-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/Java-course-in-coimbatore",
        destination: "/java-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Ranchi",
        destination: "/hr-management-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Kanpur",
        destination: "/mern-stack-course-in-kanpur",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Bhopal",
        destination: "/hr-management-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Madurai",
        destination: "/digital-marketing-course-in-madurai",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Hyderabad",
        destination: "/core-hr-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Bhopal",
        destination: "/sap-pm-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Mysore",
        destination: "/sap-fico-course-in-mysore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Mohali",
        destination: "/ui-ux-course-in-mohali",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Chandigarh",
        destination: "/sap-scm-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Lucknow",
        destination: "/hr-management-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/Java-course-in-jaipur",
        destination: "/java-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Mangalore",
        destination: "/digital-marketing-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Ahmedabad",
        destination: "/mern-stack-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/python-course-in-Trivandrum",
        destination: "/python-course-in-trivandrum",
        permanent: true,
      },
      {
        source: "/sql-course-in-Rajkot",
        destination: "/sql-course-in-rajkot",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Pondicherry",
        destination: "/digital-marketing-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Kanpur",
        destination: "/digital-marketing-course-in-kanpur",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Tirupati",
        destination: "/hr-analytics-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/Java-course-in-dehradun",
        destination: "/java-course-in-dehradun",
        permanent: true,
      },
      {
        source: "/sql-course-in-Raipur",
        destination: "/sql-course-in-raipur",
        permanent: true,
      },
      {
        source: "/business-analytics-course-in-Pondicherry/",
        destination: "/business-analytics-course-in-pondicherry/",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Vadodara/",
        destination: "/core-hr-course-in-vadodara/",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Dehradun",
        destination: "/mern-stack-course-in-dehradun",
        permanent: true,
      },
      {
        source: "/data-analytics-course-in-Agra/",
        destination: "/data-analytics-course-in-agra/",
        permanent: true,
      },
      {
        source: "/python-course-in-Agra",
        destination: "/python-course-in-agra",
        permanent: true,
      },
      {
        source: "/python-course-in-Chennai",
        destination: "/python-course-in-chennai",
        permanent: true,
      },
      {
        source: "/sql-course-in-Vizag",
        destination: "/sql-course-in-vizag",
        permanent: true,
      },
      {
        source: "/python-course-in-Pondicherry",
        destination: "/python-course-in-pondicherry",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Nashik",
        destination: "/hr-analytics-course-in-nashik",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Agra",
        destination: "/sap-successfactors-course-in-agra",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Mohali",
        destination: "/sap-fico-course-in-mohali",
        permanent: true,
      },
      {
        source: "/sap-PP-course-in-Lucknow",
        destination: "/sap-pp-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Bangalore",
        destination: "/hr-management-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Mohali",
        destination: "/digital-marketing-course-in-mohali",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Kerala/",
        destination: "/core-hr-course-in-kerala/",
        permanent: true,
      },
      {
        source: "/salesforce-training-in-Pune",
        destination: "/salesforce-training-in-pune",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Mohali",
        destination: "/core-hr-course-in-mohali",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Bhubaneswar",
        destination: "/sap-successfactors-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/python-course-in-Chandigarh",
        destination: "/python-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Ludhiana",
        destination: "/digital-marketing-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Rajkot",
        destination: "/mern-stack-course-in-rajkot",
        permanent: true,
      },
      {
        source: "/sql-course-in-Surat",
        destination: "/sql-course-in-surat",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Madurai",
        destination: "/hr-analytics-course-in-madurai",
        permanent: true,
      },
      {
        source: "/aboutus.html",
        destination: "/aboutus",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Raipur",
        destination: "/digital-marketing-course-in-raipur",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Bhubaneswar",
        destination: "/sap-fico-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Bhubaneswar",
        destination: "/sap-hcm-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Kerala",
        destination: "/digital-marketing-course-in-kerala",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Bhubaneswar",
        destination: "/sap-mm-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Ludhiana",
        destination: "/core-hr-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Bhopal",
        destination: "/sap-hcm-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Coimbatore",
        destination: "/hr-analytics-course-in-coimbatore",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Ahmedabad",
        destination: "/hr-analytics-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Ahmedabad",
        destination: "/hr-management-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Hyderabad",
        destination: "/hr-analytics-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Jalandhar",
        destination: "/digital-marketing-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Bhopal",
        destination: "/sap-basis-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Tirupati",
        destination: "/core-hr-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Chandigarh",
        destination: "/digital-marketing-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Agra",
        destination: "/ui-ux-course-in-agra",
        permanent: true,
      },
      {
        source: "/sql-course-in-Patna",
        destination: "/sql-course-in-patna",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Mangalore",
        destination: "/ui-ux-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/python-course-in-Rajkot",
        destination: "/python-course-in-rajkot",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-mumbai",
        destination: "/sap-hcm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Madurai",
        destination: "/hr-management-course-in-madurai",
        permanent: true,
      },
      {
        source: "/python-course-in-Jalandhar",
        destination: "/python-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Surat",
        destination: "/digital-marketing-course-in-surat",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Lucknow",
        destination: "/sap-successfactors-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Mohali",
        destination: "/sap-hcm-course-in-mohali",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Nashik",
        destination: "/core-hr-course-in-nashik",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Kolkata",
        destination: "/ui-ux-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/sap-PP-course-in-Bhopal",
        destination: "/sap-pp-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Lucknow",
        destination: "/sap-bwbi-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-courses-in-pune",
        destination: "/sap-courses-in-pune",
        permanent: true,
      },
      {
        source: "/sap-scm-course-in-Mysore",
        destination: "/sap-scm-course-in-mysore",
        permanent: true,
      },
      {
        source: "/python-course-in-Tirupati",
        destination: "/python-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Mumbai",
        destination: "/core-hr-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Mohali",
        destination: "/sap-mm-course-in-mohali",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Bhubaneswar",
        destination: "/hr-management-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/Navbar/connecting-dot-erp-logo.avif",
        destination: "/navbar/connecting-dot-erp-logo.avif",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-pune",
        destination: "/sap-hcm-course-in-pune",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Bhubaneswar",
        destination: "/mern-stack-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Vizag",
        destination: "/hr-management-course-in-vizag",
        permanent: true,
      },
      {
        source: "/hr-training-course-in-Pune",
        destination: "/hr-training-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Chandigarh",
        destination: "/hr-management-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/hr-course-in-pune",
        destination: "/hr-course-in-pune",
        permanent: true,
      },
      {
        source: "/hr-course-in-mumbai",
        destination: "/hr-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/chatgpt-course-in-Vizag/",
        destination: "/chatgpt-course-in-vizag/",
        permanent: true,
      },
      {
        source: "/sap-course-in-Mumbai",
        destination: "/sap-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-course-in-Pune",
        destination: "/sap-course-in-pune",
        permanent: true,
      },
      {
        source: "/tableau-training-in-Bhopal",
        destination: "/tableau-training-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-s4-hana-course-in-Bhubaneswar",
        destination: "/sap-s4-hana-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/sap-hr-hcm-course-in-Mumbai",
        destination: "/sap-hr-hcm-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Tirupati",
        destination: "/digital-marketing-course-in-tirupati",
        permanent: true,
      },
      {
        source: "/powerbi-course-in-pune",
        destination: "/powerbi-course-in-pune",
        permanent: true,
      },
      {
        source: "/tableau-training-in-Kolkata",
        destination: "/tableau-training-in-kolkata",
        permanent: true,
      },
      {
        source: "/sap-s4-hana-course-in-Ahmedabad",
        destination: "/sap-s4-hana-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/salesforce-training-in-Hyderabad",
        destination: "/salesforce-training-in-hyderabad",
        permanent: true,
      },
      {
        source: "/hr-training-course-in-Bangalore",
        destination: "/hr-training-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/hr-training-course-in-Bangalore/",
        destination: "/hr-training-course-in-bangalore/",
        permanent: true,
      },
      {
        source: "/chatgpt-course-in-Patna/",
        destination: "/chatgpt-course-in-patna/",
        permanent: true,
      },
      {
        source: "/chatgpt-course-in-Vizag",
        destination: "/chatgpt-course-in-vizag",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Jalandhar",
        destination: "/hr-management-course-in-jalandhar",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Chandigarh",
        destination: "/sap-hcm-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/chatgpt-course-in-Vadodara/",
        destination: "/chatgpt-course-in-vadodara/",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Chennai",
        destination: "/hr-analytics-course-in-chennai",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Mysore/",
        destination: "/core-hr-course-in-mysore/",
        permanent: true,
      },
      {
        source: "/chatgpt-course-in-Kolkata/",
        destination: "/chatgpt-course-in-kolkata/",
        permanent: true,
      },
      {
        source: "/sql-course-in-Lucknow",
        destination: "/sql-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-ariba-course-in-Pune/",
        destination: "/sap-ariba-course-in-pune/",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-Kolkata",
        destination: "/digital-marketing-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Cochin",
        destination: "/mern-stack-course-in-cochin",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Nagpur",
        destination: "/hr-analytics-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Ranchi",
        destination: "/ui-ux-course-in-ranchi",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Lucknow/",
        destination: "/core-hr-course-in-lucknow/",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Nagpur",
        destination: "/ui-ux-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/python-course-in-Indore",
        destination: "/python-course-in-indore",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Kolkata",
        destination: "/hr-analytics-course-in-kolkata",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Nashik/",
        destination: "/core-hr-course-in-nashik/",
        permanent: true,
      },
      {
        source: "/python-course-in-Ludhiana",
        destination: "/python-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Bhubaneswar",
        destination: "/ui-ux-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Cochin",
        destination: "/ui-ux-course-in-cochin",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Bhubaneswar",
        destination: "/sap-pm-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Agra",
        destination: "/sap-basis-course-in-agra",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Mumbai",
        destination: "/hr-analytics-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Lucknow",
        destination: "/sap-pm-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Agra",
        destination: "/hr-analytics-course-in-agra",
        permanent: true,
      },
      {
        source: "/mern-stack-course-in-Hyderabad",
        destination: "/mern-stack-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/sap-successfactors-course-in-Bhopal",
        destination: "/sap-successfactors-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/sap-sd-course-in-Mohali",
        destination: "/sap-sd-course-in-mohali",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Kerala",
        destination: "/core-hr-course-in-kerala",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Jaipur",
        destination: "/hr-management-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Bhopal",
        destination: "/sap-bwbi-course-in-bhopal",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Nagpur",
        destination: "/hr-management-course-in-nagpur",
        permanent: true,
      },
      {
        source: "/python-course-in-Mangalore",
        destination: "/python-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Mohali",
        destination: "/hr-analytics-course-in-mohali",
        permanent: true,
      },
      {
        source: "/sap-bwbi-course-in-Bhubaneswar",
        destination: "/sap-bwbi-course-in-bhubaneswar",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Vadodara",
        destination: "/core-hr-course-in-vadodara",
        permanent: true,
      },
      {
        source: "/sap-mm-course-in-Lucknow",
        destination: "/sap-mm-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Kerala",
        destination: "/hr-analytics-course-in-kerala",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Delhi",
        destination: "/ui-ux-course-in-delhi",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Indore",
        destination: "/core-hr-course-in-indore",
        permanent: true,
      },
      {
        source: "/python-course-in-Mohali",
        destination: "/python-course-in-mohali",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Indore",
        destination: "/hr-management-course-in-indore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Lucknow",
        destination: "/ui-ux-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-fico-course-in-Mangalore",
        destination: "/sap-fico-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Chennai",
        destination: "/core-hr-course-in-chennai",
        permanent: true,
      },
      {
        source: "/sql-course-in-Vadodhara",
        destination: "/sql-course-in-vadodhara",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Ludhiana",
        destination: "/hr-management-course-in-ludhiana",
        permanent: true,
      },
      {
        source: "/sql-course-in-Kerala",
        destination: "/sql-course-in-kerala",
        permanent: true,
      },
      {
        source: "/sap-qm-course-in-Mangalore",
        destination: "/sap-qm-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/sap-PP-course-in-Ahmedabad",
        destination: "/sap-pp-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Chandigarh",
        destination: "/sap-pm-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/hr-management-course-in-Delhi",
        destination: "/hr-management-course-in-delhi",
        permanent: true,
      },
      {
        source: "/sap-netweaver-course-in-Mangalore",
        destination: "/sap-netweaver-course-in-mangalore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Rajkot",
        destination: "/ui-ux-course-in-rajkot",
        permanent: true,
      },
      {
        source: "/sap-qm-course-in-Ahmedabad",
        destination: "/sap-qm-course-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Madurai",
        destination: "/core-hr-course-in-madurai",
        permanent: true,
      },
      {
        source: "/python-course-in-Patna",
        destination: "/python-course-in-patna",
        permanent: true,
      },
      {
        source: "/sap-hcm-course-in-Lucknow",
        destination: "/sap-hcm-course-in-lucknow",
        permanent: true,
      },
      {
        source: "/sap-ps-course-in-Ahemedabad",
        destination: "/sap-ps-course-in-ahemedabad",
        permanent: true,
      },
      {
        source: "/hr-analytics-course-in-Deheradun",
        destination: "/hr-analytics-course-in-deheradun",
        permanent: true,
      },
      {
        source: "/sap-basis-course-in-Mysore",
        destination: "/sap-basis-course-in-mysore",
        permanent: true,
      },
      {
        source: "/ui-ux-course-in-Visakhapatnam",
        destination: "/ui-ux-course-in-visakhapatnam",
        permanent: true,
      },
      {
        source: "/core-hr-course-in-Cochin",
        destination: "/core-hr-course-in-cochin",
        permanent: true,
      },
      {
        source: "/sap-pm-course-in-Mangalore",
        destination: "/sap-pm-course-in-mangalore",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
