// Para utilizar é necessário importar o express
import express from "express"

const PORT = 3333

// app armazena tudo que express fornece
const app = express()

//parte 1 - Roteamento - GET, POST, PUT/PATCH, DELETE
//parte 2 - Roteamento - Receber informaçoes
    /**
     * Formas:
     * 1- QUERY PARAMS -> Parâmetros de rotas, na maioria das vezes usa-se o GET -> /users?nome=Carlos&cargo=Instrutor
     * 2- ROUTE PARAMS -> Utilizados em todas as rotas (GET, PATCH, DELETE) menos POST -> /uers/1
     * 3- BODY PARAMS -. Utilizado no método POST -> /users = {JSON}
     */

// 1 - QUERY PARAMS
app.get('/users', (req, res) => {

    console.log(req)

    // propriedades que tem dentro de query
    //            |
    const {nome, cargo, idade} = req.query  //objeto destruturado para simplificar
    res.status(200).json({nome, cargo, idade})
})

app.post('/users', (req, res) => {
    res.status(201).json([
        'Usuário 01',
        'Usuário 02',
        'Usuário 03',
        'Usuário 04'

    ])
})

// 2- ROUTE PARAMS - GET, PATCH, DELETE -> users/1

// parâmetros: :params1/:params2...
app.put('/users/:id/:idade', (req, res) => {
    
    const {id} = req.params
    res.status(200).json({"user": id, "idade": idade})
})

app.delete('/users', (req, res) => {
    res.status(200).json([
        'Usuário 02',
        'Usuário 03',
        'Usuário 04'
    ])
})


app.listen(PORT, () => {
    console.log(`Servidor on PORT ${PORT}🟢`)
})