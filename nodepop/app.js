import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'

import * as homeController from './controllers/homeController.js'

const app = express()

// Defino en variable nombre de app
app.locals.appName = "Nodepop"

// Defino donde se encuentran las vistas
app.set('views', 'views')
// Defino cual sera el motor de plantillas
app.set('view engine', 'ejs')

app.use(logger("dev"))

app.get('/', homeController.index)

// Error handler
app.use((req, res, next) => {
    next(createError(404))
})

// Controlo los errores en el browser
app.use((err, req, res, next) => {
    console.log(err) // muestro el error por consola
    res.send('Ocurrio un error: ' + err.message) // manejo el error
})

export default app