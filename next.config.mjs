/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  // ── Trailing-slash policy: Hostinger's Apache server requires
  //    `index.html` inside directories for static exports to resolve
  //    trailing-slash URLs correctly. Without it, requests for
  //    `/products/` return 403 instead of serving the directory index.
  //    Enable trailingSlash so next export emits /products/index.html
  //    and Apache serves it cleanly.
  trailingSlash: true,

  // ── Enable React strict-standards for SEO-safe rendering of client
  //    components — surfaces hydration mismatches during dev.
  reactStrictMode: true,

  // ── Compression: Next.js static export emits .html + .next/data
  //    Server (nginx/Vercel/Netlify) must gzip/brotli these.
  //    Document this in the deployment README.
  compress: true,

  // ── Powered-by header: hide framework fingerprint.
  poweredByHeader: false,

  // ── Experimental: optimize package imports for smaller JS bundles
  //    → faster crawl budget, lower Time-to-Interactive, less risk
  //    of Googlebot bailing before hydration completes.
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
};

export default nextConfig;