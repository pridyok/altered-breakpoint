import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import projectConfig from './config'

export default {
  entry: {
    [projectConfig.filename]: [path.resolve(__dirname, `../src/index.ts`)],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
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
  stats: {
    preset: 'errors-warnings',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
