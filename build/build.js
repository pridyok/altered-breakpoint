import webpack from 'webpack'
import chalk from 'chalk'
import webpackConfig from './webpack.config'

process.env.NODE_ENV = 'production'

console.log(
  chalk.blue('Generating bundle for production. This will take a minute'),
)

webpack(webpackConfig).run(err => {
  if (err) {
    console.log(chalk.red(err))
    return 1
  }
  return 0
})
