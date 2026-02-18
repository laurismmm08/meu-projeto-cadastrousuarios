const API_URL = 'http://localhost:3000/api/users';

const userForm = document.getElementById('userForm');
const usersList = document.getElementById('usersList');
const formMessage = document.getElementById('formMessage');
const usersMessage = document.getElementById('usersMessage');

function showMessage(element, message, type) {
    element.innerHTML = `<div class="message ${type}">${message}</div>`;
    setTimeout(() => {
        element.innerHTML = '';
    }, 5000);
}

function clearForm() {
    userForm.reset();
}

userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password.length < 6) {
        showMessage(formMessage, '❌ A senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage(formMessage, '❌ As senhas não coincidem', 'error');
        return;
    }
    
    const formData = { name, email, password, age };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(formMessage, `✅ ${data.message}`, 'success');
            clearForm();
            loadUsers();
        } else {
            showMessage(formMessage, `❌ ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showMessage(formMessage, '❌ Erro ao conectar com o servidor. Verifique se a API está rodando.', 'error');
    }
});

async function loadUsers() {
    try {
        usersList.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Carregando usuários...</span>
            </div>
        `;
        
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            displayUsers(data.data);
            showMessage(usersMessage, `✅ ${data.count} usuário(s) encontrado(s)`, 'success');
        } else {
            usersList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <div class="empty-state-title">Nenhum usuário cadastrado</div>
                    <p class="empty-state-description">Comece adicionando um novo usuário usando o formulário acima</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        usersList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔌</div>
                <div class="empty-state-title">Erro de conexão</div>
                <p class="empty-state-description">Verifique se a API está rodando em http://localhost:3000</p>
            </div>
        `;
        showMessage(usersMessage, '❌ Erro ao conectar com o servidor. Verifique se a API está rodando.', 'error');
    }
}

function displayUsers(users) {
    usersList.innerHTML = users.map(user => `
        <div class="user-item">
            <div class="user-header">
                <h3>${user.name}</h3>
                <span class="user-badge">ID: ${user.id}</span>
            </div>
            <div class="user-details">
                <div class="user-detail">
                    <span class="user-detail-label">Email:</span>
                    <span>${user.email}</span>
                </div>
                <div class="user-detail">
                    <span class="user-detail-label">Idade:</span>
                    <span>${user.age} anos</span>
                </div>
                <div class="user-detail">
                    <span class="user-detail-label">Status:</span>
                    <span>${user.is_active ? 'Ativo' : 'Inativo'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});