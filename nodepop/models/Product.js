import mongoose, { Schema } from 'mongoose'

// Defino Schema de los productos
const productSchema = new Schema({
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    image: String,
    tags: [String]
});

// Creo el modelo de productos
const Product = mongoose.model('Product', productSchema)
export default Product