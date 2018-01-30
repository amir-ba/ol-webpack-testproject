const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const main = {
      entry:{
          main:'./src/components/app/main.js',
          alert:'./src/components/app/alert.js'
      
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }


        ]
    },
    plugins: [
  new webpack.ProvidePlugin({
            $: 'jquery'
        }) 
        

       , new HtmlPlugin({
            template: 'index.ejs',
            inject:'body'
        })
    ]
}


const prod = {

    output: {
  
        path: path.resolve(__dirname, 'dist'),
              filename: '[name].js',
    },
    module: {rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }]},
    plugins: [
        new ExtractTextPlugin('style.css'),

        new webpack.EnvironmentPlugin(
                Object.assign({
                    NODE_ENV: 'production'
                })
                )
    ]
}
const dev = {
    output: {
        path: path.resolve(__dirname, '/'),
        filename: '[name].js',
            pathinfo: true

                //publicPath: '/app'

    },
    module: {rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }]},
    plugins: [
        new webpack.EnvironmentPlugin(
                Object.assign({
                    NODE_ENV: 'development'
                })
                )
    ]
}
module.exports = env => {
    let config;
    switch (env) {
        case 'prod':
        {
            config = merge(main, prod);
            break;
        }
        default:
        {
            config = merge(main, dev);
        }

    }
    return config;

}
