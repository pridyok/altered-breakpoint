import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let config = {}

try {
  const configPath = path.resolve(__dirname, '../config.yml')
  config = yaml.load(fs.readFileSync(configPath, 'utf8'))
} catch (e) {
  console.log(
    chalk.red(
      'Error loading config file. Ensure config.yml is located at the root of the project.',
    ),
  )
  console.log(chalk.red(e))
}

export default config
