import path from 'path'

export default {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  experiments: {
    outputModule: true,
  },
}
