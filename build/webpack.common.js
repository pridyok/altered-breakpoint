import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
}
