import { merge } from 'webpack-merge'
import commonConfig from './webpack.common'
import developmentConfig from './webpack.development'
import productionConfig from './webpack.production'

const mode = process.env.NODE_ENV || 'development'

export const getConfig = mode => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`)
  }
}

// export const

export default getConfig(mode)
