import express from 'express'

const app = express()

app.get('/', (req, res, next) => {
    console.log('Hola');

})

export default app