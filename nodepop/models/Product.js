import mongoose, { Schema } from 'mongoose'

// Defino Schema de los productos
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: false
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: {
        type: Number, required: [true, 'Product price is required'], min: [0, 'Price must be a positive number'], set: v => parseFloat(v).toFixed(2) // Me aseguro que el precio se guarde como un float con dos decimales
    },
    image: { type: String, },
    tags: {
        type: [String], required: [true, 'Product tags are required'], validate: {
            validator: function (v) {
                return v.every(tag => tag.includes('#'));
            },
            message: 'Each tag must contain the character #'
        }
    }
});

// Creo el modelo de productos
const Product = mongoose.model('Product', productSchema)
export default Product