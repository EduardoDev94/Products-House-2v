//IMPORTAÇÕES
const express = require ('express')
const usersRouter = require ('./src/routes/usersRouter')
const homeRouter = require ('./src/routes/homeRouter')
const productsRouter = require ('./src/routes/productRouter')
const path = require('path')



//VARIÁVEIS
const server = express ()
const port =  4000
//CONFIGURAÇÕES
server.use (express.json())
server.use(express.static(path.resolve ("src","public")))

server.set ('view engine', 'ejs')
server.set ('views', path.resolve("src","views"))




//ROTAS
server.use (usersRouter)
server.use (homeRouter)
server.use (productsRouter)



server.listen (port, () =>{
    console.log (`Servidor rodando no http://localhost:${port}`)
})
