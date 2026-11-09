import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Contexto de autenticação para gerenciar login, logout e estado do usuário
const AuthContext = createContext({});

// Provedor de autenticação que envolve a aplicação e fornece estado e funções de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect para verificar se há um token e informações do usuário armazenados no localStorage ao carregar o componente
  useEffect(() => {
    const storedToken = localStorage.getItem('@App:token');
    const storedUser = localStorage.getItem('@App:user');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Função de login que envia credenciais para a API e armazena o token e informações do usuário no localStorage
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data;

    localStorage.setItem('@App:token', token);
    localStorage.setItem('@App:user', JSON.stringify(user));
    setUser(user);
  };

  // Função de logout que remove o token e informações do usuário do localStorage e atualiza o estado
  const logout = () => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
    setUser(null);
  };

  // O valor fornecido pelo contexto inclui o estado do usuário, funções de login e logout, e o estado de carregamento
  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);