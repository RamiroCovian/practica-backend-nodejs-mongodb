/* Aqui se encuentan los datos iniciales para cuando se despliege por primera vez la app */
import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import User from './models/User.js'

// Creo la coneccion con la Db
const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
    console.log('Operation aborted.');
    process.exit();
}

await initUsers()
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