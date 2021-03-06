/**
 * good webpack info: https://blog.madewithlove.be/post/webpack-your-bags/
 */
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    cache: true,
    devtool: 'source-map',

    entry: {
        'apps/simple/index': './apps/simple/',
        'apps/busses/index': './apps/busses/',
        'apps/timeline/index': './apps/timeline/'
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'apps/**/test/*'}
        ]),
        new HtmlWebpackPlugin({
            title: 'Simple',
            chunks: ['apps/simple/index'],
            template: 'apps/index.tpl.html',
            inject: 'body',
            filename: 'apps/simple/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Busses',
            chunks: ['apps/busses/index'],
            template: 'apps/index.tpl.html',
            inject: 'body',
            filename: 'apps/busses/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'TimeLine',
            chunks: ['apps/timeline/index'],
            template: 'apps/index.tpl.html',
            inject: 'body',
            filename: 'apps/timeline/index.html'
        }),

        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),

        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin()
    ],
    resolve: {
        extensions: ['.html', '.js', '.json', '.scss', '.css'],
        alias: {
            // todo get rid of this... include path directly in code...
            app_css: path.join(__dirname, "/apps/map.css"),

            pelias_css: path.join(__dirname, "/node_modules/leaflet-geocoder-mapzen/dist/leaflet-geocoder-mapzen.css"),

            leaflet_fullscreen_css: path.join(__dirname, "/node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css"),
            leaflet_measure_css: path.join(__dirname, "/node_modules/leaflet.polylinemeasure/Leaflet.PolylineMeasure.css"),
            leaflet_locate_css: path.join(__dirname, "/node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css"),

            leaflet_css: path.join(__dirname, "/node_modules/leaflet/dist/leaflet.css"),
            leaflet_marker: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon.png"),
            leaflet_marker_2x: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon-2x.png"),
            leaflet_marker_shadow: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-shadow.png")

        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: 'babel-loader'
            },
            {
                test: /\.json?$/,
                use: 'json'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.png$/,
                use: 'url-loader?limit=100000'
            },
            {
                test: /\.jpg$/,
                use: 'file-loader'
            },
            {
                test: /\.gif$/,
                use: 'url-loader'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?name=webpack-assets/[name]/[hash].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=webpack-assets/[name]/[hash].[ext]'
            },
            {
                test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=webpack-assets/[name]/[hash].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=webpack-assets/[name]/[hash].[ext]'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
}
