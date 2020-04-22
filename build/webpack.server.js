let base = require("./webpack.base");
let merge = require("webpack-merge");
const path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const VueServerRender = require("vue-server-renderer/server-plugin");

module.exports = merge(base, {
  entry: { server: path.resolve(__dirname, "../src/server-entry.js") },
  target: "node",
  output: {
    libraryTarget: "commonjs2", //让server-entry的export default给别人使用，改为node的module.exports = fn
  },
  plugins: [
    new VueServerRender(),
    new HtmlWebpackPlugin({
      filename: "server.html",
      minify: {
        removeComments: false,
      },
      template: path.resolve(__dirname, "../public/server.html"),
      excludeChunks: ["server"], //html不引入server.js
    }),
  ],
});
