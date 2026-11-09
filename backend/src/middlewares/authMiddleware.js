const jwt = require('jsonwebtoken');

//Intercepta requisições para garantir que apenas usuários autenticados acessem rotas protegidas (como as tarefas)

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id; // Adiciona o ID do usuário à requisição
      return next();
    } catch (error) {
      return res.status(401).json({ error: 'Não autorizado, token inválido.' });
    }
  }

  return res.status(401).json({ error: 'Não autorizado, nenhum token fornecido.' });
};

module.exports = protect;