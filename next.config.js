/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@acme/ui'],
  },
  images: {
    domains: ['images.unsplash.com','unsplash.com'] // Add the hostnames here
  },
};

module.exports = nextConfig;
