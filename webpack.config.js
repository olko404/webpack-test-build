const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV === 'development';
const prodMode = !devMode;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: 'single',
    };

    if (prodMode) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

const config = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png',],
        alias: {}
    },
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        static: './dist',
        port: 8080,
        hot: devMode,
    },
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: prodMode
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/favicon-16x16.png'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/favicon-32x32.png'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/apple-touch-icon.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
            }
        ]
    }
}

module.exports = config;