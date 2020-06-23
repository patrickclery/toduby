module.exports = {
  entry:  "./src/index.js",
  module: {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     {
          loader: "babel-loader"
        }
      },
      {
        test:    /\.css$/,
        exclude: /node_modules/,
        use:     [
          "style-loader",
          {loader:   "css-loader",
            options: {importLoaders: 1}
          },
          "postcss-loader"
        ]
      },
      {
        test:   /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test:   /\.html$/,
        loader: "html-loader"
      }
    ]
  }
}