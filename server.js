import express from "express";
import { v4 as uuidv4 } from "uuid";

const PORT = 3333

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const logRoutes = (req, res, next) => {
    const { url, method } = req
    const rota = `[${method.toUpperCase()}] ${url}`
    console.log(rota)
    next()
}

app.use(logRoutes)

const usuarios = []

app.get('/usuarios', logRoutes, (req, res) => { //listar
    res.status(200).json(usuarios)
})

app.post('/usuarios', (req, res) => { //cadastrar usuários
    const {nome, cargo} = req.body

    //Validações
    if(!nome){
        res.status(400).json({message: "O nome é obrigatório"})
        return
    }
    if(!cargo){
        res.status(400).json({message: "O cargo é obrigatório"})
        return
    }

    const novoUsuario = {
        nome,
        cargo,
        id: uuidv4(),
    };

    usuarios.push(novoUsuario)
    res.status(201).json({message: `usuário(a) ${novoUsuario.nome} cadastrado(a) `})
})

app.patch('/usuarios/:id', (req, res) => { //atualizar
    const {id} = req.params
    const {nome, cargo} = req.body

    const indexUsuario = usuarios.findIndex(usuario => usuario.id === id)

    if(indexUsuario === -1){
        res.status(404).json({message: "Usuário não encontrado"})
        return
    }

    //Validações
    if(!nome){
        res.status(400).json({message: "O nome é obrigatório"})
        return
    }
    if(!cargo){
        res.status(400).json({message: "O cargo é obrigatório"})
        return
    }

    const updateUsuario = {
        nome,
        cargo,
        id
    }

    usuarios[indexUsuario] = updateUsuario
    res.status(200).json({message: `Usuário ${updateUsuario.nome} atualizado`})
})

app.delete('/usuarios/:id', (req, res) => { //deletar
    const id = req.params.id

    const indexUsuario = usuarios.find(usuario => usuario.id === id)

    if(!indexUsuario){
        res.status(404).json({message: "Usuário não encontrado"})
        return
    }

    usuarios.splice(indexUsuario, 1) //splice: o "1" é para ele entender que é apenas um usuário deletado, no caso ele mesmo, se por exemplo for o num 2 serio deletado dois usuários
    res.status(200).json({message: "Usuario deletado"})
})

app.listen(PORT, () => {
    console.log(`Servidor on PORT ${PORT}🟢`)
})