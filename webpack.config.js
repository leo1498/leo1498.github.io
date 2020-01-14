//webpack.config.js


let BrowserSyncPlugin = require('browser-sync-webpack-plugin'); 
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');

let ImageminPlugin = require('imagemin-webpack-plugin').default;
let imageminMozjpeg = require('imagemin-mozjpeg');

function getPlugins(_isProduction) {
  var plugins = [];

  plugins.push(
  	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery'
	}),

    new BrowserSyncPlugin({
		host: 'localhost',
		port: 3000,
		files: ['./*.html','./*.php','./template-parts/*.php','./templates/*.php','./css/*.scss', './img/*.*'],
		proxy: 'local.portfolio',
		notify: false,
    }),

    new ExtractTextPlugin('css/style.css'),

    new CopyWebpackPlugin([
    	{ from: 'img/', to: 'img/' },
    ]),    
  )

  if (_isProduction) {  	
    plugins.push( 

    	new ImageminPlugin({ 
			optipng: {
				optimizationLevel: 3
			},
			pngquant: {
		        quality: '60-75'
		    },
		    jpegtran: null,

			plugins: [
				imageminMozjpeg({
					quality: 95, //70
					progressive: true,
					smooth: 10 //30
				})
			],

	    }),
    	new UglifyJsPlugin() 
    	
    );
  }
  else {

  }

  return plugins;
}


module.exports = function(env) {		

	const isProduction = env.production === true;
	console.log('production = ', env.production);


    return {
        entry: "./js/app.js",
        output: {
            path: __dirname + "/dist/",
            filename: "js/main.js"
        },
		
		devtool: "source-map",
		
        module: {
	        rules: [{
	            test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		          fallback: 'style-loader',		         
		          //use: ['css-loader', 'postcss-loader', 'sass-loader']

		          use: [		          	
		          	{
		          		loader: "css-loader",
		          		options: {
					        url: false,
					        minimize: isProduction,
							sourceMap: true
						}
		          	},
		          	{
		          		loader: "postcss-loader",
		          	},
		          	{
		          		loader: "sass-loader",
		          	}
		          ]
		        })
	        }]
	    },
        plugins: getPlugins(isProduction),
    }
}