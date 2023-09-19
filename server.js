import  { httpServer }  from"./http.js"
import  config from'./config.js'
import("./socket.js")

httpServer.listen(3000, () => {
    console.log(`Servidor rodando na porta:${config.PORT}`)
})