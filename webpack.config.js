const webpack = require("webpack");
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({mode, presets} = {mode: "production", presets: []}) => {
    return merge({
            mode,
            output: {
                filename: "bundle.js"
            },
            plugins: [
                new HtmlWebpackPlugin(),
                new webpack.ProgressPlugin()
            ]
        },
        modeConfig(mode)
    )
};