const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry:     "./src/index.js",
  resolve:   {
    extensions: ["*", ".js", ".jsx"]
  },
  output:    {
    path:       path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename:   "bundle.js"
  },
  plugins:   [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot:         true,
    index:       "index.html"
  },
  module:    {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use:  ["postcss-loader"]
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