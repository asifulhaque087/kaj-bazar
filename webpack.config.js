const webpack = require('webpack');

module.exports = function (options) {
  return {
    ...options,
    externals: [
      // Force webpack to handle these as standard CommonJS runtime imports
      { 'ejs': 'commonjs ejs' },
      { '@css-inline/css-inline': 'commonjs @css-inline/css-inline' },
      ...(options.externals || [])
    ],
  };
};