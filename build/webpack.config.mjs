import webpackMerge from 'webpack-merge'
import parallelWebpack from 'parallel-webpack'
import commonConfig from './webpack.common.mjs'
import styleConfig from './webpack.style.mjs'
import serverConfig from './webpack.server.mjs'
import projectConfig from './config.mjs'

const { merge } = webpackMerge
const { createVariants } = parallelWebpack
const mode = process.env.NODE_ENV || 'development'

const getConfig = mode => {
  switch (mode) {
    case 'production':
      const variants = {
        target: ['var', ...projectConfig.exportTypes],
      }

      const createConfig = options => {
        let config = commonConfig(mode, options)

        if (options.target === 'module') {
          config = merge(styleConfig(mode), serverConfig(mode), config)
        }

        return config
      }

      return createVariants(variants, createConfig)
    case 'development':
      return merge(styleConfig(mode), serverConfig(mode), commonConfig(mode))
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`)
  }
}

export default getConfig(mode)
