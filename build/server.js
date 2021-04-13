import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import configData from './webpack.config'
import chalk from 'chalk'

const config = Array.isArray(configData) ? configData[0] : configData
const compiler = Webpack(config)
const devServerOptions = Object.assign({}, config.devServer, { open: true })
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(devServerOptions.port, '127.0.0.1', () => {
  console.log(
    chalk.blue(
      `Starting server at http://localhost:${devServerOptions.port}\n`,
    ),
  )
})
