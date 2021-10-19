const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");



module.exports = {
    mode: 'production',
    entry: {
        main: './app/js/main.js',
        sw: './app/sw.js',
   },
   devtool:'eval',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        port: 9000,
        liveReload: true,
      },
    plugins: [
    new HtmlWebpackPlugin({
        title: 'Lovely Snake!',
        template: 'app/index.html'
        }),
     new MiniCssExtractPlugin(),
     new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, "app/img/icons/*"),
                to:path.resolve(__dirname, "dist"),
                context: './app',
            },
            {
                from: path.resolve(__dirname, "app/manifest.json"),
                to:path.resolve(__dirname, "dist"),
                context: './app',
            }
        ],
      }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          esModule: false,
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
           
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};