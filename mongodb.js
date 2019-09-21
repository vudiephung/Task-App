// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true  }, (error, client) => {
//     if (error) return console.log('Unable to connect to database!')
//     console.log('well')
//     const db = client.db(databaseName)
//     db.collection('users').insertOne({
//         name: 'Vu Diep Hung',
//         age: 20
//     }, (error, result) => {
//         if(error) return console.log('Unable to insert User')

//         console.log(result.ops)
//     })
// })

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

// MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
//     if(error) return console.log('Unable to connect to database!')

//     console.log('Success!')

//     const db = client.db(dbName)

//     db.collection('users').findOne({ _id: new ObjectID('5d634b18055871c6b1fbd4db') }, (error, user) => {
//         if(error) return console.log('Unable to fetch')

//         console.log(user)
//     })

//     db.collection('users').find({ name: 'Jen' }).count((error, users) => {
//         console.log(users)
//     })
// })

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    const db = client.db(dbName)
    // db.collection('tasks').findOne({_id: ObjectID('5d6332aff35deb18696e5748')}, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, task) => {
    //     task.forEach(element => {
    //         console.log(element.description)
    //     });
    // })

    // db.collection('users').updateOne({
    //         _id: new ObjectID("5d62a96f0636213fdfafafe0")
    //     },{
    //     $inc: {
    //         age: -4
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({ completed: true },
        {
            $set: {
                completed: false
            }
        }).then((result) => console.log(result)).catch((error) => console.log(error))
})