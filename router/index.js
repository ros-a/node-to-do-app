const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const mongoUrl = 'mongodb://root:password@localhost:27017'
const mongoSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

function router(app) {

    app.get('/to-do-app/', (request, response) => {
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            const db = client.db('node-to-do-app')
            const taskCollection = db.collection('to-do-tasks')
            const tasks = await taskCollection.find({}).toArray()
            response.render('task', {tasks})
        })
    })

}

module.exports = router