 var webpack = require('webpack')
module.exports={
	entry: './main.js' ,
	output: {
		 filename: 'bundle.js'
		
	},
	
	module:{
		rules:[
			{
				test: /\.css$/,
				use:[ 
				'style-loader',
				'css-loader' 
				
				]
			}
		]
	} ,
	plugins: [
		/* 	new webpack.optimize.UglifyJsPlugin({
				//..
			}) */
	]
}
