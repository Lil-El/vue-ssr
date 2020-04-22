let base = require("./webpack.base");
let merge = require("webpack-merge");
const path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const VueServerRender = require("vue-server-renderer/client-plugin");
module.exports = merge(base, {
  entry: { client: path.resolve(__dirname, "../src/client-entry.js") },
  plugins: [
    new VueServerRender(),
    new HtmlWebpackPlugin({
      filename: "client.html",
      template: path.resolve(__dirname, "../public/client.html"),
    }),
  ],
});
