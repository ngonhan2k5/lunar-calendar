const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {GenerateSW, InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, 'dist', '/public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8080,
        historyApiFallback: {index: 'index.html'}
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'] 
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
           
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
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