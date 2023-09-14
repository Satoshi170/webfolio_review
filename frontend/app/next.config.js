/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "__tests__"]
  },
  images: {
    domains: ["backend", process.env.NEXT_PUBLIC_API_ENDPOINT]
  },
  output: "standalone"
};

module.exports = nextConfig;
