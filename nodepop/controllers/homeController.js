import Product from '../models/Product.js'
export async function index(req, res, next) {
    const userId = req.session.userId // Obtengo el userId
    if (userId) {
        res.locals.products = await Product.find({ owner: userId }) // Peticion de productos para el usuario logado
    }
    res.render('Home')
}