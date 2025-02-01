const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*'],
  },
  webpack: (config, { dev, isServer }) => {
    // Add the MiniCssExtractPlugin to the webpack plugins
    if (!isServer && !dev) {
      config.plugins.push(new MiniCssExtractPlugin());
    }

    // Return the updated config
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/courses',
        permanent: true, // Use false if this might change in the future
      },
    ];
  },
};

module.exports = nextConfig;
