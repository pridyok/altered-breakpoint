import path from 'path'

export default {
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 8001,
  },
  experiments: {
    outputModule: true,
  },
}
