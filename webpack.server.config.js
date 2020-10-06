const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const {GenerateSW, InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    entry: {server:'./src/server/server-dev.js'},
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    // devServer: {
    //     inline: true,
    //     port: 8080,
    //     historyApiFallback: true
    // },
    target: 'node',
    // dbLink: 'memcache',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // query: {
                //     presets: ['@babel/preset-env', '@babel/preset-react'] 
                // }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
           
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './index.html'
        // }),
        // new GenerateSW({
        //     // "importWorkboxFrom": "local",
        //     // "globDirectory":"dist/public",
        //     "swDest": "sw.js",
        //     'navigateFallback':'/index.html',
        //     // 'globPatterns': ["**/*.{js,html,png}"],
        //     // "globIgnores": [
        //     //     "../workbox-cli-config.js",
            
        //     //   ]
        // }),
        // new InjectManifest({
        //     swSrc: 'sw.js',
        //   })
    ]
}