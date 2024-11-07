import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

// Creo la tabla
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
})

// metodo estatico para hashear una password
userSchema.statics.hashPassword = function (clearPassword) {
    return bcrypt.hash(clearPassword, 7)
}

// Compruebo si la password coincide
userSchema.methods.comparePassword = function (clearPassword) {
    return bcrypt.compare(clearPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User