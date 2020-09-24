const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    index: [
      "./client/index.js",
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  resolve: {
    modules: ["node_modules", "client"],
    extensions: [".js", ".jsx", ".sass", ".scss", ".css"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        // exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
    proxy: {
      "/": "http://localhost:3001",
    },
  },
};
