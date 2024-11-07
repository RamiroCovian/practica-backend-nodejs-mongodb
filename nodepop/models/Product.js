import mongoose, { Schema } from 'mongoose'

// Defino Schema de los productos
const productSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    tags: [String]
});

// Creo el modelo de productos
const Product = mongoose.model('Product', productSchema)
export default Product