const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const mongoUrl = 'mongodb://root:password@localhost:27017'
const mongoSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

function router(app) {

    app.get('/surrealist-cinema/', (request, response) => {
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            const db = client.db('surrealist-cinema')
            const filmCollection = db.collection('surrealist-films')
            const filmsSeen = await filmCollection.find({deleted: false, seen: true}).toArray()
            const filmsNotSeen = await filmCollection.find({deleted: false, seen: false}).toArray()
            response.render('film', {filmsSeen, filmsNotSeen})
        })
    })

    app.post('/surrealist-cinema/add-film/', (request, response) => {
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            let filmObject = {
                title: request.body.title,
                director: request.body.director,
                music: request.body.music,
                year: request.body.year,
                seen: request.body.seen,
                quote: request.body.quote,
                deleted: false
            }
            const db = client.db('surrealist-cinema')
            const filmCollection = await db.collection('surrealist-films')
            const result = await filmCollection.insertOne(filmObject)
            return response.sendStatus('200')
        })
    })

    app.put('/surrealist-cinema/delete-film/', (request, response) => {
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            let idString = request.body.id
            let oid = ObjectId(idString)
            const db = client.db('surrealist-cinema')
            const filmCollection = await db.collection('surrealist-films')
            const result = await filmCollection.updateOne({_id: oid}, {$set: {deleted: true}})
            return response.sendStatus('200')
        })
    })

}

module.exports = router