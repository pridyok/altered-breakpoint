import path from 'path'
import { fileURLToPath } from 'url'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import projectConfig from './config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default mode => {
  return {
    entry: {
      [projectConfig.filename]: [path.resolve(__dirname, '../src/demo.sass')],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.[s](a|c)ss$/,
          use: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { url: false, importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: { plugins: [autoprefixer()] },
              },
            },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.cleanCssMinify,
          minimizerOptions: {
            level: 2,
          },
        }),
      ],
    },
  }
}
