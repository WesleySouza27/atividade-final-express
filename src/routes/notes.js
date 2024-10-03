import express, { request, response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { users } from './users'

const router = express.Router()
const messages = []


// Criar mensagem - Create
router.post('/message', (req, res) => {
    const { email, title, description,} = req.body
    const existingUser = users.find(user => user.email === email)
    // const user = users.find(user => user.id === userId)

    if (!existingUser) {
        return res.status(404).json({error: "Email não encontrado, verifique ou crie uma conta"})
    }
    // if (!user) {
    //     return res.status(404).json({error: "userId não encontrado!"})
    // }

    if (!title) {
        return res.status(400).json({error: "Título é obrigatório!"})
    }
    if (!description) {
        return res.status(400).json({error: "Descrição é obrigatório!"})
    }

    const newMessage = {
        id: uuidv4(),
        title,
        description,
        email
        // userId
    }

    messages.push(newMessage)

    return res.status(201).json({message: `Mensagem criada com sucesso! ${newMessage.description}`})
}) 


// Ler mensagem - Create
router.get('/message/:email', (req, res) => {
    const { email } = req.params 
    const existingUser = users.find(user => user.email === email)

    if (!existingUser) {
        return res.status(404).json({
            message: "Email não encontrado, verifique ou crie uma conta"
        })
    }
    const filteredMessages = messages.filter(message => message.email === email)

    return res.status(200).json({
        message: `Seja bem-vinde!`,
        messages: filteredMessages.map(message => 
            `ID: ${message.id}, Título: ${message.title}, Descrição: ${message.description}`).join(' || ')
    });

})


// Atualizar menssagem 
router.put('/message/:id', (req, res) => {
    const { title, description } = req.body
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)

    if (messageIndex === -1) {
        return res.status(404).json({
            error: " Por favor, informe um id válido da mensagem"
        })
    }


    if (!title || !description) {
        return res.status(400).json({
            error: 'titulo e descrição são obrigatórios.'})
    }

    
    messages[messageIndex].title = title
    messages[messageIndex].description = description

    return res.status(200).json({
        message: `Mensagem atualizada com sucesso!`,
        updatedMessage: messages[messageIndex]
    })
})


// Deletar mensagens
router.delete('/message/:id', (req, res) => {
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)
    
    if (messageIndex === -1) {
        return res.status(404).json({error: 'Recado não encontrado'})
    }

    const deletedNote = messages.splice(messageIndex, 1)

    return res.status(200).json({
        message: 'Recado excluído com sucesso!',
        note: deletedNote
    })
})

export default router