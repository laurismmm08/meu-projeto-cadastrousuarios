import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from './src/controllers/userController.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const HOST = 'localhost'
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/api/users', getAllUsers)
app.post('/api/users', createUser)
app.get('/api/users/:id', getUserById)
app.put('/api/users/:id', updateUser)
app.delete('/api/users/:id', deleteUser)

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`)
})