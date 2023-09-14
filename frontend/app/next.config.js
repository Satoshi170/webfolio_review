/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "__tests__"]
  },
  images: {
    domains: ["backend", process.env.NEXT_PUBLIC_API_DOMAIN]
  },
  output: "standalone"
};

module.exports = nextConfig;
