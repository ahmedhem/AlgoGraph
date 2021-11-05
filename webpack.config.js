const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = ({ mode } = { mode: "production", presets: [] }) => {
  return merge(
    {
      mode,
      devtool: "eval-source-map",
      entry: "./src/app.js",
      output: {
        filename: "bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.png$|\.svg$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "index.html",
          inject: "body",
        }),
        new webpack.ProgressPlugin(),
        new CompressionWebpackPlugin(),
      ],
      devServer: {
        compress: true,
        disableHostCheck: true,
      },
    },
    modeConfig(mode)
  );
};
