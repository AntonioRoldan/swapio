const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./src/db')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 4000

app.get('/ping', (_, res) => {
    res.send('pong')
})

app.listen(port, () => console.log(`App listening on port ${port}`))


module.exports = app
