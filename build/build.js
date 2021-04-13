import path from 'path'
import { run } from 'parallel-webpack'
import chalk from 'chalk'

const configPath = path.resolve(__dirname, 'webpack.config')

process.env.NODE_ENV = 'production'

console.log(
  chalk.blue('Generating bundles for production. This will take a minute\n'),
)

run(configPath, { stats: true }, (err, statsJSON) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }
})
