import React, { useState } from 'react';
import api from '../services/api';
import './AuthForm.css'; // Opcional para estilos

export default function AuthForm({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';

    try {
      const response = await api.post(endpoint, { email, password });
      
      // Fluxo de Registro Automático ou Login Direto
      if (isLogin) {
        const { user, token } = response.data;

        // Salva os dados no localStorage
        localStorage.setItem('@App:token', token);
        localStorage.setItem('@App:user', JSON.stringify(user));

        // Callback para atualizar o estado global da aplicação
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
      } else {
        // Se acabou de cadastrar com sucesso, muda para a tela de login e avisa o usuário
        setIsLogin(true);
        setPassword(''); // Limpa a senha por segurança
        alert('Conta criada com sucesso! Por favor, faça o seu login.');
      }
    } catch (err) {
      // Captura mensagens de erro mais comuns ou usa uma mensagem padrão amigável
      setError(err.response?.data?.message || err.response?.data?.error || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Limpa erros acumulados ao alternar entre Login e Cadastro
  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setPassword('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Entrar no Sistema' : 'Criar Conta'}</h2>
        
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="seu@email.com"
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="********"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button 
            type="button" 
            onClick={handleToggleMode} 
            className="toggle-link"
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
      </div>
    </div>
  );
}
