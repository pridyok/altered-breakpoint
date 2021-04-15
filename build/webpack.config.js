import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import { createVariants } from 'parallel-webpack'
import projectConfig from './config'
import commonConfig from './webpack.common'
import developmentConfig from './webpack.development'
import productionConfig from './webpack.production'
import styleConfig from './webpack.style'

const mode = process.env.NODE_ENV || 'development'

const getConfig = mode => {
  switch (mode) {
    case 'production':
      const variants = {
        target: ['var', ...projectConfig.exports],
      }

      const suffixMap = {
        var: '',
        commonjs2: '.cjs',
        amd: '.amd',
        module: '.esm',
      }

      const createConfig = options => {
        let config = merge(commonConfig, productionConfig, { mode })
        const filename = `[name]${suffixMap[options.target]}.js`
        const library = {
          name: options.target === 'module' ? undefined : projectConfig.name,
          type: options.target,
        }

        config.output = { ...config.output, filename, library }

        if (options.target === 'var') {
          config.plugins.push(
            new HtmlWebpackPlugin({
              template: './src/index.html',
              inject: true,
            }),
          )

          config = merge(config, styleConfig(mode))
        }

        return config
      }

      return createVariants(variants, createConfig)
    case 'development':
      return merge(commonConfig, developmentConfig, styleConfig(mode), { mode })
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`)
  }
}

export default getConfig(mode)
