const express = require('express')
const consign = require('consign')
var cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

module.exports = () => {
    const app = express()
    app.use(cors(corsOptions))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))

    
    consign()
        .include('controllers')
        .into(app)   
    return app
}
