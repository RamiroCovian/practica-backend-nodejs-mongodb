import mongoose from 'mongoose'

mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err)
})

export default function connectMongoose() {
    return mongoose.connect('mongodb://127.0.0.1:27017/nodepopdb')
        .then(mongoose => mongoose.connection)
}