import express, { request, response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { users } from './users'

import { validationCreate, validationReadme, validationUpdate, validationDelete} from '../middleware/validationNotes'

const router = express.Router()
export const messages = []


// Criar mensagem - Create
router.post('/message', validationCreate, (req, res) => {
    const { email, title, description,} = req.body

    const newMessage = {
        id: uuidv4(),
        title,
        description,
        email
    }

    messages.push(newMessage)

    return res.status(201).json({message: `Mensagem criada com sucesso! ${newMessage.description}`})
}) 


// Ler mensagem - Create
// router.get('/message/:email', validationReadme, (req, res) => {
//     const { email } = req.params 
//     const existingUser = users.find(user => user.email === email)

//     const filteredMessages = messages.filter(message => message.email === email)

//     return res.status(200).json({
//         message: `Seja bem-vinde!`,
//         messages: filteredMessages.map(message => 
//             `ID: ${message.id}, Título: ${message.title}, Descrição: ${message.description}`).join(' || ')
//     });

// })


// paginação no back-end
router.get('/message/:email', (req, res) => {
    const { email } = req.params 
    
    //https://atividade-final-express.onrender.com/message/maria@example.com?page=2&perPage=3
    const { page, perPage} = req.query

    const user = users.find(user => user.email === email)

    if (!user) {
        return res.status(404).json({message: 'usuário não encontrado.'})
    }

    const currentPage = parseInt(page) || 1
    const itensPerPage = parseInt(perPage) || 10

    const userNotes = messages.filter(note => note.email === email)

    const totalItens = userNotes.length

    const startIndex = (currentPage - 1) * itensPerPage
    const endIndex = startIndex + itensPerPage

    if (startIndex >= totalItens) {
        return res.status(200).json({
            notes: [],
            message: 'Página solicitada não contém itens.',
            totalPages: Math.ceil(totalItens / itensPerPage),
            currentPage
        });
    }
    
    const paginatedNotes = userNotes.slice(startIndex, endIndex)
    const totalPages = Math.ceil(totalItens / itensPerPage)

    res.status(200).json({
        notes: paginatedNotes, 
        totalPages, 
        currentPage
    })
})


// Atualizar menssagem 
router.put('/message/:id', validationUpdate, (req, res) => {
    const { title, description } = req.body
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)

    return res.status(200).json({
        message: `Mensagem atualizada com sucesso!`,
        updatedMessage: messages[messageIndex]
    })
})


// Deletar mensagens
router.delete('/message/:id', validationDelete, (req, res) => {
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)
    const deletedNote = messages.splice(messageIndex, 1)

    return res.status(200).json({
        message: 'Recado excluído com sucesso!',
        note: deletedNote
    })
})

export default router
