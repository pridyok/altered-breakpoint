import path from 'path'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default mode => {
  return {
    entry: {
      index: [path.resolve(__dirname, '../src/index.scss')],
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
          test: /\.[s]css$/,
          use: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { url: false, importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                // TODO: Replace cssnano with css-minimizer-webpack-plugin
                postcssOptions: { plugins: [autoprefixer(), cssnano()] },
              },
            },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  }
}
