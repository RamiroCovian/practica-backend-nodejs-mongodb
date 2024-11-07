import Product from "../models/Product.js"
import createError from 'http-errors'

export function index(req, res, next) {
    res.render('new-product')
}
