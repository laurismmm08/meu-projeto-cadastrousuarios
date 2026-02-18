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

const getUserById = (req, res) => {
  const { id } = req.params

  const user = users.find(u => u.id === Number(id))

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    })
  }

  res.json({
    success: true,
    data: user
  })
}

const updateUser = (req, res) => {
  const { id } = req.params
  const { name, email, age, password } = req.body

  const userIndex = users.findIndex(u => u.id === Number(id))

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    })
  }

  if (email) {
    const emailExists = users.find(u => u.email === email && u.id !== Number(id))
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Este email já está cadastrado no sistema'
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      })
    }
  }

  if (age && (age <= 0 || !Number.isInteger(Number(age)))) {
    return res.status(400).json({
      success: false,
      message: 'A idade deve ser um número positivo'
    })
  }

  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    age: age ? Number(age) : users[userIndex].age,
    password: password || users[userIndex].password,
    updated_at: new Date()
  }

  users[userIndex] = updatedUser

  res.json({
    success: true,
    message: 'Usuário atualizado com sucesso!',
    data: updatedUser
  })
}

const deleteUser = (req, res) => {
  const { id } = req.params

  const userIndex = users.findIndex(u => u.id === Number(id))

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    })
  }

  const deletedUser = users[userIndex]
  users.splice(userIndex, 1)

  res.json({
    success: true,
    message: 'Usuário deletado com sucesso!',
    data: deletedUser
  })
}

export { getAllUsers, createUser, getUserById, updateUser, deleteUser }