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
    // Comprobar Validation errors
    if (err.array) {
        console.log(err.array())
        err.message = 'Invalid request: ' + err.array()
            .map(e => `${e.location} ${e.type} ${e.path} ${e.msg}`)
            .join(', ')
        err.status = 422
    }
    res.status(err.status || 500)

    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = process.env.NODEAPP_ENV === 'development' ? err : {}

    //render error view
    res.render('error')
})

export default app