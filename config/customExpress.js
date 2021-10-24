const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
var cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

module.exports = () => {
    const app = express()
    app.use(cors(corsOptions))

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    
    consign()
        .include('controllers')
        .into(app)   
    return app
}
