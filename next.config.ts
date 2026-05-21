import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
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
