 const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
 const path = require('path');
const webpack = require('webpack');
module.exports={
	 context: __dirname,
  target: 'web',
	entry: './src/app/main.js' ,
	output: {
		path: path.resolve(__dirname, 'app'),
    filename: '[name].js',
	    pathinfo: true

	//	publicPath: '/app'
		
	},  devtool: 'source-map',

	
	module:{
		rules:[
			   
   {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
	  
		]
	} ,
	plugins: [
     new ExtractTextPlugin('style.css'),

   new HtmlPlugin({
      template: 'index.html'
    })  
	]
}
