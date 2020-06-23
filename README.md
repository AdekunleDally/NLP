Installed express server
Installed package.json using npm init
installed webpack and webpack cli  using  npm i webpack webpack-cli
Added the config file: webpack.config.js to the project
Added necessary require statement and module.exports to webpack.config file.
const path = require('path')
const webpack = require('webpack')
added entry point to the webpack.config.js

module.exports = {
   entry:'./src/client/index.js'
}
 Added a new webpack script to package.json i.e.  "build": "webpack"
 created a folder called 'src' in the root directory of the project folder
 
 create a folder called 'client' inside 'src' folder 
 create a folder called 'server' inside 'src' folder 

 3 sub-folders and an index.js were created inside client folder
 1. js folder ---> formHandler.js, nameChecker.js
 2. styles folder
 3. views folder ---> index.html
 4. index.js

Added "build": "webpack" to script in package.json
Then ran webpack using  npm run build

  At this point , after webpack was  run, the 'dist' folder is created with an entry point of main.js
  A folder called 'dist' is in the root directory of the project folder
  dist folder---> main.js


 Unfortunately,the distribution folder has no connection whatsoever to our app. If you start the express server, our app is still functioning exactly the same way it did.

Also, the main.js file of our distribution folder contains none of the javascript or other assets we wrote for our webpage.
Thus you need to connect dist folder to src folder

** BUT THE OUTPUT OF WEBPACK IS THE DISTRIBUTION FOLDER
   THUS, OUTPUT AND LOADERS WAS USED TO SOLVE THE ISSUE

 ** connect dist/main.js to src/client/views/index.html using a script tag
24c. include this script tag inside index.html that connects to the dist folder (A TEMPORARY SOLUTION). html webpack lugin a better solution.

 <script src="../../../dist/main.js"></script>

** connect client/js folder to client/index.js by 
a. Installing Babel (npm install -D @babel/core @babel/preset-env babel-loader)
b. create babel config file after installing babel ---    { "presets": ["@babel/preset-env"]}

** at this you can use es6  import statement in your 'client/index.js'  but you must add rules in the webpack.config.js


c. add this  loader to the webpack.config.js file

** YOU NEED TO INSTALL BABEL BECAUSE IT WOULD ALLOW YOU TO RUN IMPORT STATEMENTS IN 'client/index.js' SO THAT YOU CAN 
** BRING THE OTHER JAVASCRIPT FILES IN THE JS FOLDER INTO 'client/index.js'
module: {
      rules: [
        {
          test: '/\.js$/',
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }


PS: Loaders and plugins re used to achieve the unbundling of our assets

24d. PS: The output of webpack is the dist folder
But 24c. Was not so efficient, rather, Babel was used instead. Babel helps convert newer js syntax to older syntax
which inturn allows us import js folder into index.js
npm install -D @babel/core @babel/preset-env babel loader
create .babelrc in the root folder to configure Babel

Added html webpack plugin  using npm i -D html-webpack-plugin (It allows you add a dynamic web pack plugin)
require the html webpack plugin inside 

plugins:[
    new HTMLWebPackPlugin({
      template: './src/client/views/index.html',
      filename: './index.html'
    })
  ]

*** Make sure your server knows about this in the server/index.html
app.get('/', function(req, res){
  res.send('dist/index.html')
})

//Set the environment i.e. production and development
install web-dev-server
npm i -D webpack-dev-server
duplicate webpack.config.js; call one webpack.dev.js, call the other webpack.dev.js
Add a mode flag in the webpack.config.js. call it development or production i.e.
mode: 'production'   /    mode:'development'

In the package.json, change "build": "webpack"
to 
"build-prod": "webpack --config webpack.prod.js"    for development
"build-dev": "webpack --config webpack.dev.js"          for production

 At this point you would use
 npm run build-prod......................... for production environment
 npm run build-dev ....................... for development environment


To be a little more efficient, there is a webpack plugin called Clean. From its documentation:

By default, this plugin will removes all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.

npm i -D clean-webpack-plugin
Then, as we learned before, to make webpack use a plugin, we have to do two things:

Add a require statement to the top of the webpack config file:

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
Add the plugin to Plugins array in the module.exports. The clean plugin is a good example of a plugin that allows for various options. Take a look at this:

We could use CleanWebpackPlugin like this:
 new CleanWebpackPlugin()

And the above would function. When there are no options passed in, a plugin will run all the default settings, but we can also pass in our custom selections of the various plugin options, like this:

        new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        })

 
 Added  "build-dev": "webpack --config webpack.dev.js --watch --info-verbosity verbose"  to make sure webpack automatically rebuild your file if you add anything to it
 BUT this does not refresh the browser ; use webpack dev server to restart server(hot reloading)

 1. Installed webpack dev server     npm install webpack-dev-server --save-dev
 2. replaced  "build-dev": "webpack --config webpack.dev.js --watch --info-verbosity verbose"  with
  "build-dev": "webpack-dev-server --config webpack.dev.js --open"

  ** AT THIS POINT, a new webpage comes up with address localhost:8080

INSTALLING SASS 
npm i -D style-loader node-sass css-loader sass-loader

Then added this test case to the rules array in your dev webpack config. i.e. webpack.dev.js

{
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
}

SASS files were imported into client/index.js


 Due to webpack setup 
 1. events in the projects got broken. To solve this, insert into webpack.dev.js the code snippet below:

output: {
    libraryTarget: 'var',
    library: 'Client'
  },

  All of our javascript code would be accesible through our client library
  step 1. goto client/index.js and export the imported javascript files into the client library 
  e.g export { handleSubmit, formCheck
  }

  But How does this get used in index.html?
  Goto index.html change onclick value to Client.handleSubmit()
  Also append 'Client.' to  every function call in your code

  2. Due to webpack setup, express server malfunctions
  
  PS: webpack dev server is only good for single page apps



  **** Then setup your production configuration for webpack****
Every website developer is concerned how fast the website built would be for users.
 We can solve this by compressing our assets into a smaller format
  Use minify css plugin to solve this **since webpack does not minify our styles by default** thus we need to 
  use a plugin that would do this.

Install it:     npm install --save-dev mini-css-extract-plugin
add to webpack.prod.js :  const MinifyCssExtractPlugin = require('mini-css-extract-plugin');

add to the plugin in webpack.prod.js:     new MinifyCssExtractPlugin({filename: '[name].css'})

Then add new set of rules that would handle our stylesheets for production

{
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      }


      At this point dist/main.css is created. main.css is a concatenation of all of css rolled up into one
      Use optimization to minify main.css

      Install the plugin
      npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin

      Add the require statement for both plugins
      const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
      const TerserPlugin = require('terser-webpack-plugin');

      add the code snippet below to module.export
      optimization: {
    minimizer:[new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },

  Finally Install Service Workers
  npm install workbox-webpack-plugin --save-dev

   Add to webpack.prod.js
  const WorkboxPlugin = require('workbox-webpack-plugin');

  Add to plugin in webpack.prod.js by Instantiating the new plugin in the plugin list:
   new WorkboxPlugin.GenerateSW()

  Then register the service Worker in index.html by adding the code snippet below
  <script>
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
</script>

 **npm i regenerator-runtime was also installed**


















