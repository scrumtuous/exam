// Enhanced CRACO config to polyfill all required Node.js core modules for Webpack 5+
module.exports = {
  webpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        assert: require.resolve('assert'),
        util: require.resolve('util'),
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url'),
        zlib: require.resolve('browserify-zlib'),
      },
    },
    plugins: [
      // ProvidePlugin to make Buffer and process available
      new (require('webpack').ProvidePlugin)({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
  },
};
