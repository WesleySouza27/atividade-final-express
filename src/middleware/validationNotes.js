import { users } from '../routes/users'
import { messages } from '../routes/notes'

export function validationCreate(req, res, next) {
    const { email, title, description,} = req.body
    const existingUser = users.find(user => user.email === email)

    if (!existingUser) {
        return res.status(404).json({error: "Email não encontrado, verifique ou crie uma conta"})
    }
   
    if (!title) {
        return res.status(400).json({error: "Título é obrigatório!"})
    }
    if (!description) {
        return res.status(400).json({error: "Descrição é obrigatório!"})
    }
}

export function validationReadme(req, res, next) {
    const { email } = req.params 
    const existingUser = users.find(user => user.email === email)

    if (!existingUser) {
        return res.status(404).json({
            message: "Email não encontrado, verifique ou crie uma conta"
        })
    }
}

export function validationUpdate(req, res, next) {
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
}

export function validationDelete(req, res, next) {
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)
    
    if (messageIndex === -1) {
        return res.status(404).json({error: 'Recado não encontrado'})
    }
}