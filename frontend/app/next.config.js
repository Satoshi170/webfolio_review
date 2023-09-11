/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "__tests__"]
  },
  images: {
    domains: ["backend"]
  },
  output: "standalone"
};

module.exports = nextConfig;
