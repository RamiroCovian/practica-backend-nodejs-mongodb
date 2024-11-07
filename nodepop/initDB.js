/* Aqui se encuentan los datos iniciales para cuando se despliege por primera vez la app */
import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import User from './models/User.js'
import Product from './models/Product.js'

// Creo la coneccion con la Db
const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
    console.log('Operation aborted.');
    process.exit();
}

await initUsers()
await initProducts()

connection.close() // cierro coneccion

async function initUsers() {
    // Delete all users
    const deleteResult = await User.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} users.`);

    // Create initial users
    const insertResult = await User.insertMany([
        { email: 'admin@gmail.com', password: await User.hashPassword('1234') },
        { email: 'user1@gmail.com', password: await User.hashPassword('1234') },
    ])
    console.log(`Created ${insertResult.length} users.`);
}

async function initProducts() {
    // Delete all products
    const deleteResult = await Product.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} products.`);

    const [admin, user1] = await Promise.all([
        User.findOne({ email: 'admin@gmail.com' }),
        User.findOne({ email: 'user1@gmail.com' })

    ])

    // Create initial products
    const insertResult = await Product.insertMany([
        { name: 'T-shirt', owner: admin._id, price: 5, image: 'path', tags: ['Summer', 'Girls'] },
        { name: 'Short', owner: user1._id, price: 8, image: 'path', tags: ['Summer', 'Boys', 'Football'] },
        { name: 'Shoes', owner: admin._id, price: 50, image: 'path', tags: ['Ballet', 'Girls', 'Nike'] },
        { name: 'Shoes', owner: user1._id, price: 55, image: 'path', tags: ['Football', 'Boys', 'Under Armour'] },
        { name: 'Cap', owner: user1._id, price: 2, image: 'path', tags: ['Football', 'Boys', 'Girls', 'Barcelona F.C'] },
    ])
    console.log(`Created ${insertResult.length} products.`);
}


// Funcion para interactuar con la consola
function ask(questionText) {
    return new Promise((resolve, reject) => {
        const consoleInterface = readline.createInterface({
            input: process.stdin, // Toma los datos escritos en consola 
            output: process.stdout // Devuelve los datos a la consola
        })
        consoleInterface.question(questionText, (answer) => {
            consoleInterface.close() // Cierro la consola
            resolve(answer)
        })
    })
}