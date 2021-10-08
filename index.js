const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const mongoUrl = 'mongodb://root:password@localhost:27017'
const mongoSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const express = require('express')
const router = require('./router')
const expressHandlebars = require('express-handlebars')

const app = express()
const port = 3000

app.use(express.json())
app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

router(app)

app.listen(port)