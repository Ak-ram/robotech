const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

};

module.exports = nextConfig;
