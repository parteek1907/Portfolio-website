import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "@react-three/fiber",
      "three",
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'parteekgarg.in' }],
        destination: 'https://www.parteekgarg.in/:path*',
        permanent: true,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
