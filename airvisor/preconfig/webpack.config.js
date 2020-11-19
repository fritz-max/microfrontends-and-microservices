const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("../package.json").dependencies;
const name = require("../config.json").name;
const port = require("../config.json").port;
const remoteModules = require("./modules.json").webpackRemoteModules;

module.exports = {
  entry: {
    main: "./preconfig/index",
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: port,
  },
  output: {
    // public path can be what it normally is, not a absolute, hardcoded url
    publicPath: "auto",
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
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: name,
      remotes: remoteModules,
      shared: {
        "react": { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      excludeChunks: [name],
    }),
  ],
};
