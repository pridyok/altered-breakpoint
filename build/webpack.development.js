import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  watchOptions: {
    ignored: '/node_modules/',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    hot: true,
    port: 8000,
  },
}
