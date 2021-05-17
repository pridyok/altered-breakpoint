import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import parallelWebpack from 'parallel-webpack'
import chalk from 'chalk'
import pluralize from 'pluralize'
import log from './log.js'

const { run } = parallelWebpack
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.resolve(__dirname, 'webpack.export.cjs')

console.log(
  chalk.blue('Generating bundles for production. This will take a minute\n'),
)

run(configPath, { stats: true }, (err, statsJSON) => {
  if (err) {
    if (err.stats) {
      const stats = JSON.parse(err.stats)
      console.log(chalk.bold.red('\nERROR GENERATING BUNDLES\n'))
      console.log(
        chalk`Build failed with {red ${stats.errorsCount} ${pluralize(
          'error',
          stats.errorsCount,
        )}} and {yellow ${stats.warningsCount} ${pluralize(
          'warning',
          stats.warningsCount,
        )}}.\n`,
      )

      if (stats.errors) {
        for (const error of stats.errors) {
          log(error)
        }
      }

      if (stats.warnings) {
        for (const warning of stats.warnings) {
          log(warning, 'warning')
        }
      }

      fs.writeFileSync('error.stats.json', err.stats)

      console.log(
        chalk`{blue Additional information saved to {bold error.stats.json}}`,
      )
    } else if (err.message) {
      if (err.message) {
        console.log(chalk.red(err.message))
      }
    } else {
      console.error(err.stack || err)

      if (err.details) {
        console.error(err.details)
      }
    }

    return
  }
})
