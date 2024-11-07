import Product from "../models/Product.js"
import createError from 'http-errors'

export function index(req, res, next) {
    res.render('new-product')
}


export async function postNew(req, res, next) {
    try {
        const userId = req.session.userId
        const { name, price, image, tags } = req.body

        // Instancia de productos en memoria
        const product = new Product({
            name,
            owner: userId,
            price,
            image,
            tags,
        })
        // Guardo en DB
        await product.save()
        res.redirect('/')
    } catch (err) {
        next(err)
    }
}