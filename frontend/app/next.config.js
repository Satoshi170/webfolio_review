/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "__tests__"]
  },
  images: {
    domains: ["backend", "backend.webfolio-review.com"]
  },
  output: "standalone"
};

module.exports = nextConfig;
