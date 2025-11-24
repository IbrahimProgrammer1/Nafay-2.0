import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      // Keep other domains as fallback
      {
        protocol: 'https',
        hostname: 'www.laptopsdirect.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'ssl-product-images.www8-hp.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'i.dell.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bhphotovideo.com',
      },
      {
        protocol: 'https',
        hostname: 'i5.walmartimages.com',
      },
      {
        protocol: 'https',
        hostname: 'p1-ofp.static.pub',
      },
      {
        protocol: 'https',
        hostname: '**.walmartimages.com',
      },
      {
        protocol: 'https',
        hostname: '**.media-amazon.com',
      },
    ],
  },
};

export default nextConfig;
