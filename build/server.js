import express from 'express'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import open from 'open'
import webpack from 'webpack'
import config from './webpack.config'

const port = 8001
const app = express()
const compiler = webpack(config)

app.use(
  devMiddleware(compiler, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'minimal',
    publicPath: config.output.publicPath,
  }),
)
app.use(hotMiddleware(compiler))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(port, function (err) {
  if (err) {
    console.log(err)
  } else {
    open('http://localhost:' + port)
  }
})
