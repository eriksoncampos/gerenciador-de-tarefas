const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "sua_chave_secreta_super_segura",
    {
      expiresIn: "1d",
    },
  );
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sequelize usa 'findOne' com a cláusula 'where'
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já cadastrado." });
    }

    // Sequelize usa 'create'
    const user = await userService.createUser({ email, password });
    const token = generateToken(user.id);

    res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = generateToken(user.id);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
};
