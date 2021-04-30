import Webpack from 'webpack'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default mode => {
  const isProduction = mode === 'production'

  return {
    plugins: [
      ...(!isProduction ? [new Webpack.HotModuleReplacementPlugin()] : []),
    ],
    devServer: {
      static: path.join(__dirname, 'dist'),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      compress: isProduction,
      hot: !isProduction,
      port: isProduction ? 8001 : 8000,
    },
  }
}
