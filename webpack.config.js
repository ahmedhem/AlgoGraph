const webpack = require("webpack");
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const CompressionWebpackPlugin = require("compression-webpack-plugin");


module.exports = ({mode, presets} = {mode: "production", presets: []}) => {
    return merge({
            devtool: "source-map",
            mode,
            module: {
                rules: [
                    {
                        test: /\.png$|\.svg$/,
                        use: [
                            {
                                loader: "url-loader", options: {
                                    limit: 5000
                                }
                            }
                        ]
                    }
                ]
            },
            output: {
                filename: "bundle.js"
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'src/index.html'
                }),
                new webpack.ProgressPlugin(),
                new CompressionWebpackPlugin()
            ]
        },
        modeConfig(mode)
    )
};