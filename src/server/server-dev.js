import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../../webpack.config'
import routes from './routes'

const app = express(),
    DIST_DIR = path.join(__dirname, 'public'),
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.json())

app.post('/api/get', routes.fetch)
app.post('/api/add', routes.add)
app.post('/api/remove', routes.remove)


app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

const PORT = process.env.PORT || 5100
app.listen(PORT, () => {
    console.log(`App listen at ${PORT}`)
    console.log(`Press Ctrl-C to quit`)
})
