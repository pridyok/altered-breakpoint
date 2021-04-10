import path from 'path'

export default {
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, '../src'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
