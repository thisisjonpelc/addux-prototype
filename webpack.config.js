const path = require('path');


module.exports = {
    entry: {
        bundle: './src/app.js',
        // share: './src/components/SharePage.js'
    },
    output:{
        path: path.join(__dirname, 'public'),
        filename:'[name].js'
    },
    // optimization:{
    //     splitChunks:{
    //         chunks:'all'
    //     }
    // },
    module:{
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader?modules'
            ]
        }]
    },
    devtool: 'source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    mode: 'development'
};