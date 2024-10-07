import express  from "express"
import { v4 as uuidv4 } from "uuid"
import cors from "cors"

import userRouter from './routes/users'
import notesRouter from './routes/notes'
import welcomeRouter from './routes/welcome'

const app = express()

const PORT = 5500

app.use(cors())
app.use(express.json())

app.use('/', userRouter)
app.use('/', notesRouter)
app.use('/', welcomeRouter)

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})