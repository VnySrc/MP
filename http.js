import express  from'express'
import http  from'http'
import { Server }  from"socket.io"
import { createCharge, hook }  from"./src/controllers/mpController.js"


const app = express()

import routes from "./src/routes.js"
import path from 'path'

app.use(express.json())
app.use(express.static(path.resolve("src", "static")))
app.use(routes)

const httpServer = http.createServer(app)
const io = new Server(httpServer)

io.on('connection', (socket) => {
  socket.on ("create_charge", async () => {
    const response = await createCharge(socket.id)
    socket.emit("charge_response", response)
  })

    // console.log("Conectado")
    // console.log(socket.id)
  });

  function setPaid (recipientID) {
    console.log("setPaid Para: " + recipientID )
    io.to(recipientID).emit('confirm-paid', true);
  }

export { httpServer, io, setPaid};
// exports = 