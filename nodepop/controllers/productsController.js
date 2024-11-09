import Product from "../models/Product.js"
import createError from 'http-errors'

export function index(req, res, next) {
    res.render('new-product')
}


export async function postNew(req, res, next) {
    try {
        const userId = req.session.userId
        const { name, price, image, tags } = req.body

        // Validaciones para campos
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!price) missingFields.push('price');
        if (!tags) missingFields.push('tags');

        if (missingFields.length > 0) {
            return next(createError(400, `Missing fields to complete: ${missingFields.join(', ')}`));
        }

        // Asignar imagen por defecto si no se proporciona una
        const defaultImage = 'https://raw.githubusercontent.com/RamiroCovian/practica-backend-nodejs-mongodb/main/nodepop/resources/sin_image.jpg'; // URL de la imagen por defecto
        const productImage = image || defaultImage;

        // Instancia de productos en memoria
        const product = new Product({
            name,
            owner: userId,
            price,
            image: productImage,
            tags: tags.split(',').map(tag => tag.trim()), // Convertir tags a array,
        })
        // Guardo en DB
        await product.save()
        res.redirect('/')
    } catch (err) {
        next(err)
    }
}

export async function deleteProduct(req, res, next) {
    const userId = req.session.userId
    const productId = req.params.productId

    // Validar que el producto que queremos borrar es propiedad del usuario logado
    const product = await Product.findOne({ _id: productId })

    // Verificar si existe
    if (!product) {
        console.warn(`WARNING - el usuario ${userId} esta intentando eliminar un producto inexistente`)
        return next(createError(404, 'Product not found'))
    }
    if (product.owner.toString() !== userId) {
        console.warn(`WARNING - el usuario ${userId} esta intentando eliminar un producto de otro usuario.`)
        return next(createError(401, 'You do not have permission to delete this product'))
    }

    await Product.deleteOne({ _id: productId })
    res.redirect('/')
}