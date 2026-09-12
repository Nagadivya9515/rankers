/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` emits a fully static site into ./out
  // ready to deploy to any static host (Vercel, Netlify, S3, etc.)
  output: "export",
  trailingSlash: true,
  images: {
    // No image optimization server is available for static export, and we
    // aren't loading remote images yet (see components/PlaceholderMedia.tsx).
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
