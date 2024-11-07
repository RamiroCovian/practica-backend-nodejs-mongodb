// Config de las sessiones
import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

// Gestiono sessiones
export const middleware = session({
    name: 'nodepop-session',
    secret: 'sNxcSEtDBdqLWkAv79H5mX',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    // Las sessions se guardan en MongoDB
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/nodepopdb'
    })
})

export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
}

// Funcion comprueba si esta logado
export function guard(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login')
        return
    }
    next()
}