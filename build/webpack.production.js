import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.[s]css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
