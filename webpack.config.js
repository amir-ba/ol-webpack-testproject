 const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
 const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const main ={
	 context: __dirname,
  target: 'web',
	entry: './src/app/main.js' ,
	  

	
	module:{
		rules:[
			   
   {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
     
	  
		]
	} ,
	plugins: [
    
	 

   new HtmlPlugin({
      template: 'index.html'
    })  
	]
}
const prod = {
 
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{rules:[
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
		path: path.resolve(__dirname, 'app'),
    filename: '[name].js' 
  //publicPath: '/app'
		
	},
 module:{rules:[	 {
        test: /\.css$/,
        use: ['style-loader','css-loader']
 }]},
   plugins: [
    new webpack.EnvironmentPlugin(
      Object.assign({
        NODE_ENV: 'development'
      })
    )
   ]
}
module.exports= env => {
	let config; 
	switch (env){
		  case 'prod': {
      config = merge(main, prod);
      break;
    }
    default: {
      config = merge(main, dev);
    }
		
	}
	  return config;

}
