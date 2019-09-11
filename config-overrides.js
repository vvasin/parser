const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = function override(config) {
  const [htmlPlugin, ...plugins] = config.plugins;

  return {
    ...config,
    devtool: false,
    plugins: [
      new HtmlWebpackPlugin({
        ...htmlPlugin.options,
        filename: "parser.html",
        inlineSource: ".(js|css)$"
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
      ...plugins
    ]
  };
};
