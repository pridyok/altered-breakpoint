import path from 'path'
import projectConfig from './config'

export default mode => {
  return {
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
    plugins: [],
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'ts-loader',
              options: { transpileOnly: mode === 'development' },
            },
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
}
