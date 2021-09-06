const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
  devtool: "source-map",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
