# 📋 Sistema de Cadastro de Usuários

Sistema completo de gerenciamento de usuários desenvolvido com **Node.js**, **Express** e arquitetura **MVC**, incluindo CRUD completo e validações robustas.

![Node.js](https://img.shields.io/badge/Node.js-v20.19.5-green)
![Express](https://img.shields.io/badge/Express-4.18.2-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 Sobre o Projeto

Aplicação Full Stack que permite criar, listar, editar e deletar usuários através de uma interface web intuitiva e uma API REST completa.

### ✨ Funcionalidades

- ✅ Cadastro de usuários com validação
- ✅ Listagem de todos os usuários
- ✅ Busca de usuário por ID
- ✅ Atualização de dados do usuário
- ✅ Exclusão de usuário
- ✅ Validação de email único
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ Timestamps automáticos (created_at, updated_at)
- ✅ Interface responsiva e moderna

---

## 🏗️ Arquitetura

Este projeto segue o padrão **MVC (Model-View-Controller)**:
```
meu-projeto/
├── public/              # View - Interface do usuário
│   ├── index.html       # Página principal
│   ├── script.js        # Lógica do front-end
│   └── test.html        # Página de testes da API
├── src/
│   ├── controllers/     # Controller - Lógica de negócio
│   │   └── userController.js
│   └── data/            # Model - Dados
│       └── data.js
├── plan/                # Documentação de planejamento
│   └── plan_issue002.md
├── server.js            # Configuração do servidor
├── package.json
└── .gitignore
```

### 📦 Responsabilidades

| Camada | Responsabilidade |
|--------|------------------|
| **Model** | Estrutura de dados e armazenamento |
| **View** | Interface e interação com usuário |
| **Controller** | Validações e lógica de negócio |
| **Server** | Configuração e roteamento |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js v18+ instalado
- npm v9+ instalado
- Git instalado

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/laurismmm08/meu-projeto-cadastrousuarios.git
cd meu-projeto-cadastrousuarios
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

4. Acesse no navegador:
```
http://localhost:3000
```

---

## 📡 API Endpoints

### Listar todos os usuários
```http
GET /api/users
```

**Resposta de sucesso (200):**
```json
{
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Alice Silva",
      "email": "alice@email.com",
      "age": 28,
      "is_active": true,
      "created_at": "2024-01-15T00:00:00.000Z",
      "updated_at": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

---

### Buscar usuário por ID
```http
GET /api/users/:id
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Silva",
    "email": "alice@email.com",
    "age": 28,
    "is_active": true
  }
}
```

**Resposta de erro (404):**
```json
{
  "success": false,
  "message": "Usuário não encontrado"
}
```

---

### Criar novo usuário
```http
POST /api/users
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Carlos Oliveira",
  "email": "carlos@email.com",
  "password": "123456",
  "age": 25
}
```

**Resposta de sucesso (201):**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso!",
  "data": {
    "id": 3,
    "name": "Carlos Oliveira",
    "email": "carlos@email.com",
    "age": 25,
    "is_active": true,
    "created_at": "2024-02-18T00:00:00.000Z",
    "updated_at": "2024-02-18T00:00:00.000Z"
  }
}
```

**Erros possíveis (400):**
- Campos obrigatórios faltando
- Email duplicado
- Formato de email inválido
- Idade inválida

---

### Atualizar usuário
```http
PUT /api/users/:id
Content-Type: application/json
```

**Body (todos os campos opcionais):**
```json
{
  "name": "Alice Silva Atualizada",
  "email": "alice.nova@email.com",
  "age": 30,
  "password": "novaSenha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Usuário atualizado com sucesso!",
  "data": { ... }
}
```

---

### Deletar usuário
```http
DELETE /api/users/:id
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Usuário deletado com sucesso!",
  "data": { ... }
}
```

---

## ✅ Validações Implementadas

### Front-end
- ✅ Senha mínima de 6 caracteres
- ✅ Senhas devem coincidir
- ✅ Campos obrigatórios (HTML5)

### Back-end
- ✅ Todos os campos obrigatórios presentes
- ✅ Email único no sistema
- ✅ Formato de email válido (regex)
- ✅ Idade deve ser número positivo
- ✅ Timestamps automáticos

---

## 🧪 Testes

Acesse a página de testes em:
```
http://localhost:3000/test.html
```

Esta página permite testar todas as rotas da API de forma interativa.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **CORS** - Habilitar requisições cross-origin
- **ES Modules** - Módulos JavaScript modernos

---

## 📚 Modelo de Dados
```javascript
{
  id: Number,           // Gerado automaticamente
  name: String,         // Obrigatório
  email: String,        // Obrigatório e único
  password: String,     // Obrigatório (min 6 caracteres)
  age: Number,          // Obrigatório
  is_active: Boolean,   // Padrão: true
  created_at: Date,     // Timestamp de criação
  updated_at: Date      // Timestamp de atualização
}
```

---

## 🔄 Fluxo de Trabalho Git

Este projeto utiliza **Git Flow** com branches:
```bash
# Criar nova feature
git checkout -b feature/nome-da-feature

# Fazer commits
git add .
git commit -m "feat: descrição"

# Push e Pull Request
git push origin feature/nome-da-feature
```

---

## 📝 Roadmap

- [ ] Persistência em arquivo JSON
- [ ] Hash de senhas com bcrypt
- [ ] Autenticação JWT
- [ ] Paginação na listagem
- [ ] Filtros e busca
- [ ] Testes automatizados
- [ ] Deploy em produção

---

## 👤 Autor

**Laura** - [GitHub](https://github.com/laurismmm08)

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---
