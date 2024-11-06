// Este modulo sera el que arrancara la app
import http from 'node:http'
import debugLib from 'debug'
import app from './app.js'


const debug = debugLib('nodepop:server')
const port = process.env.port || 3000

// Creo el http server
const server = http.createServer(app)

server.on('error', err => console.error(err))
server.on('listening', () => {
    debug(`Servidor arrancado en puerto ${port}`);
})

server.listen(port)