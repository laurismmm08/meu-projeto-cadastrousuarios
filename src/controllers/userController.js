import { users } from '../data/data.js'

const getAllUsers = (req, res) => {
  res.json({
    count: users.length,
    data: users
  })
}

const createUser = (req, res) => {
  const { name, email, password, age } = req.body

  if (!name || !email || !password || !age) {
    return res.status(400).json({
      success: false,
      message: 'Todos os campos são obrigatórios: name, email, password, age'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Formato de email inválido'
    })
  }

  const emailExists = users.find(user => user.email === email)
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: 'Este email já está cadastrado no sistema'
    })
  }

  if (age <= 0 || !Number.isInteger(Number(age))) {
    return res.status(400).json({
      success: false,
      message: 'A idade deve ser um número positivo'
    })
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    password,
    age: Number(age),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }

  users.push(newUser)

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso!',
    data: newUser
  })
}

export { getAllUsers, createUser }