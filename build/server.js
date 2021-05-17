import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config.mjs'
import chalk from 'chalk'

const compilerConfig = Array.isArray(config)
  ? config.find(entry => entry.devServer)
  : config
const compiler = Webpack(compilerConfig)
const devServerOptions = Object.assign({}, compilerConfig.devServer, {
  open: compilerConfig.mode === 'development',
})
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(devServerOptions.port, 'localhost', () => {
  console.log(
    chalk.blue(
      `Starting server at http://localhost:${devServerOptions.port}\n`,
    ),
  )
})
