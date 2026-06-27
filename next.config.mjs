/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Prefer AVIF (smallest), then WebP, when the browser supports them.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images on the CDN for 31 days.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [
      // YouTube poster thumbnails used for video tiles.
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
