/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/website-creation-for-:industry',
        destination: '/industry-landing/:industry',
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
