import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  devtool: 'eval-source-map',
  entry: {
    index: ['webpack-hot-middleware/client'],
  },
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
}
