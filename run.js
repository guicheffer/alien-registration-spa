const { config } = require('./package.json')

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || config.port || 8080

const app = express(),
      staticServe = express.static(path.join(__dirname, config.path.dist))

app.use('/', staticServe)
app.use('*', staticServe)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
