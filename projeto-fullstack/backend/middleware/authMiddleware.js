const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ mensagem: 'Nenhum token fornecido' });
  }
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ mensagem: 'Falha ao autenticar o token' });
    }
    req.usuarioId = decoded.userId;
    req.papel = decoded.role;
    next();
  });
};
