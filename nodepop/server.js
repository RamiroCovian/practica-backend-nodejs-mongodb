// Este modulo sera el que arrancara la app
import http from 'node:http'
import app from './app.js'

const port = 3000

// Creo el http server
const server = http.createServer(app)


server.on('listening', () => {
    console.log(`Servidor arrancado en puerto ${port}`);

})

server.listen(port)