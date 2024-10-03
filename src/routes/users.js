import express from 'express'
import { v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'

import { validateUserRegistration, validateUserLogin } from './../middleware/validation'


const router = express.Router()

export const users = []

// Sign Up-Criar pessoa usuária
router.post('/signup', validateUserRegistration, async (req, res) => {

    const { name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)


    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    }

    users.push(newUser)

    return res.status(201).json({message: `Seja bem vindo ${ name } ! Pessoa usuária registrada com sucesso!`})

})


//login
router.post('/login', validateUserLogin, async (req, res) => {
    const { email, password } = req.body
    const existingUser = users.find(user => user.email === email)

    const passwordCompare = await bcrypt.compare(password, existingUser.password)

    if (!passwordCompare) {
        return res.status(400).json({error: "Senha incorreta, tente novamente"})
    }

    return res.status(200).json({message: ` Seja bem vindo ${ existingUser.name} ! Pessoa usuária logada com sucesso!`})
})

export default router