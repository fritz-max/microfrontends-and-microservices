const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
const moduleName = require("./package.json").name.split("/")[1];
const extConfig = require("./config/wpConfig.json").webpackContainers[moduleName];
// const extConfig = require("../wpConfig.json").webpackContainers[moduleName];

module.exports = {
  entry: {
    main: "./src/index",
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: extConfig.port,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      }
      // {
      //   test: /\.m?js/,
      //   loader: "babel-loader",
      //   resolve: {
      //     fullySpecified: false
      //   }
      // }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: moduleName,
      library: { type: "var", name: moduleName },
      filename: "remoteEntry.js",
      exposes: extConfig.exposedModules,
      shared: {
        "react": { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      excludeChunks: [moduleName],
    }),
  ],
};
