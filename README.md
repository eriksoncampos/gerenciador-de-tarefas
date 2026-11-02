# 📝 Gerenciador de Tarefas

Uma aplicação completa para gerenciamento de tarefas (To-Do List), dividida em uma API robusta (Backend) e uma interface responsiva e moderna (Frontend).

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express**

### Frontend
- **React** (via Vite)
- **CSS3**

---

## 📦 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina antes de começar.

### 1. Clonar o repositório
```bash
git clone https://github.com
cd gerenciador-de-tarefas
```

### 2. Configurar e Rodar o Backend
Abra o terminal na pasta raiz do projeto e execute os seguintes comandos:
```bash
# Entrar na pasta do backend
cd backend

# Instalar as dependências do servidor
npm install

# Iniciar o servidor em modo de desenvolvimento
npm run dev
```
*O servidor backend deverá iniciar por padrão na porta indicada no seu arquivo `app.js`.*

### 3. Configurar e Rodar o Frontend
Abra um **novo terminal**, volte para a raiz do projeto e execute:
```bash
# Entrar na pasta do frontend
cd frontend

# Instalar as dependências da interface
npm install

# Iniciar o servidor de desenvolvimento do React
npm run dev
```
*O terminal irá gerar um link local (geralmente `http://localhost:5173`) para você abrir no navegador.*

---

## 📁 Estrutura do Projeto

```text
gerenciador-de-tarefas/
├── backend/          # API Node.js e Express (Regras de negócio e rotas)
│   └── src/
├── frontend/         # Interface em React e Vite (Componentes e telas)
│   └── src/
└── .gitignore        # Arquivo de exclusão do Git para o Monorepo
```
