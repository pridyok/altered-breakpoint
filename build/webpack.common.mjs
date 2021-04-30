import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'
import projectConfig from './config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default (mode, options = {}) => {
  const exportType = (options && options.target) || 'var'
  const isProduction = mode === 'production'
  const isInjected = exportType === 'var'
  const suffixMap = {
    var: '',
    commonjs2: '.cjs',
    amd: '.amd',
    module: '.esm',
  }

  return {
    mode,
    target: 'web',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: {
      [projectConfig.filename]: [path.resolve(__dirname, `../src/index.ts`)],
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      chunkFilename: '[chunkhash].js',
      filename: `[name]${suffixMap[exportType]}.js`,
      library: {
        export: 'default',
        type: exportType,
        name: exportType === 'module' ? undefined : projectConfig.name,
      },
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
      ...(isInjected
        ? [
            new HtmlWebpackPlugin({
              template: './src/index.html',
              inject: true,
            }),
          ]
        : []),
    ],
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader?cacheDirectory' },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                onlyCompileBundledFiles: true,
              },
            },
          ],
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
    experiments: {
      outputModule: !isInjected,
    },
    optimization: {
      runtimeChunk: isInjected ? 'single' : false,
    },
    watch: !isProduction,
    watchOptions: {
      ignored: '/node_modules/',
    },
  }
}
