/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // ✅ FIXED: Proper output configuration for static generation
  output: 'standalone',
  
  // ✅ FIXED: Enable proper static generation
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // ✅ FIXED: Image configuration with unoptimized set to false for proper builds
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false, // Enable optimization for better performance
    remotePatterns: [
      {
        protocol: "http",
        hostname: "blog-page-panel.onrender.com",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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

  // ✅ FIXED: Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ✅ FIXED: Webpack optimization for proper chunk generation
  webpack: (config, { dev, isServer, webpack }) => {
    // Fix for proper chunk naming and generation
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            default: {
              name: 'default',
              chunks: 'all',
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            app: {
              name: 'app',
              chunks: 'all',
              test: /[\\/]src[\\/]app[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Fix for FontAwesome and other icon libraries
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
    });

    return config;
  },

  // ✅ FIXED: Headers for proper caching
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|gif|png|svg|webp|avif|ico|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // ✅ FIXED: Rewrites with better error handling
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

  // ✅ FIXED: Add redirects for better SEO
  async redirects() {
    return [
      {
        source: "/sap-(:path<[^/]*>)-course-in-(:city<[^/]*>[A-Z][^/]*)",
        destination: "/sap-$path-course-in-$city",
        permanent: true,
      },
      {
        source: "/hr-courses-training-institute-in-pune",
        destination: "/hr-training-course-in-pune",
        permanent: true,
      },
    ];
  },

  // ✅ FIXED: Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  
  // ✅ FIXED: Static generation settings
  generateStaticParams: true,
  
  // ✅ FIXED: Asset prefix for CDN (if needed)
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  
  // ✅ FIXED: Trailing slash configuration
  trailingSlash: false,
};

export default nextConfig;