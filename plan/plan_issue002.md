# Plano de Implementação - Issue002: Cadastro de Usuários (MVC)

## Objetivo
Refatorar a aplicação para seguir rigorosamente o padrão MVC, com validações completas e modelo User completo.

## O que precisa ser feito

### 1. Atualizar Model (src/data/data.js)
- Adicionar campos: password, is_active, created_at, updated_at
- Atualizar usuários existentes com esses campos

### 2. Criar Controller (src/controllers/userController.js)
- Função `getAllUsers(req, res)` - listar usuários
- Função `createUser(req, res)` - criar com validações:
  - Campos obrigatórios (name, email, password, age)
  - Email duplicado
  - Formato de email válido
  - Idade positiva

### 3. Refatorar Server (server.js)
- Remover lógica de negócio
- Importar funções do controller
- Manter apenas configuração e rotas

### 4. Atualizar Front-end (index.html)
- Adicionar campo password
- Adicionar campo confirmPassword

### 5. Atualizar Script (script.js)
- Validar senhas iguais
- Validar senha mínimo 6 caracteres
- Ajustar para novo formato de resposta

## Ordem de Implementação
1. Atualizar data.js
2. Criar userController.js
3. Refatorar server.js
4. Adicionar campos de senha no HTML
5. Atualizar validações no script.js
6. Testar tudo

## Critérios de Aceitação
- [ ] Email duplicado é rejeitado
- [ ] Senhas são validadas
- [ ] Usuário tem todos os campos (id, name, email, password, age, is_active, created_at, updated_at)
- [ ] Lógica está no controller, não no server
- [ ] Mensagens de erro claras