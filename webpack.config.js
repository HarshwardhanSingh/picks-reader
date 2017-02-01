module.exports = {
  entry: './index.js',
  output: {
    path: './',
    filename: 'build.js'
  },
  devServer: {
    inline: true,
    port: 3007
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
      }
    }]
  }
}
