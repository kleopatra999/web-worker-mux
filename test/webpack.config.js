module.exports = {
  devtool: 'inline-source-map',
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['behance']
      }
    }]
  },
  plugins: []
};
