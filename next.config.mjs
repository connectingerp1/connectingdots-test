/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/:path*.(jpg|jpeg|gif|png|svg|webp|avif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
    ];
  },
  async redirects() {
    return [
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
      
    ];
  },
};

export default nextConfig;
