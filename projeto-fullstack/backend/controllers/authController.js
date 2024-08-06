const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const config = require('../config');

exports.registrar = async (req, res) => {
  const { nomeUsuario, senha, papel } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = new User({ nomeUsuario, senha: senhaHash, papel });
    await usuario.save();
    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário' });
  }
};

exports.entrar = async (req, res) => {
  const { nomeUsuario, senha } = req.body;
  try {
    const usuario = await User.findOne({ nomeUsuario });
    if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ userId: usuario._id, role: usuario.papel }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao entrar' });
  }
};

exports.obterUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuarioId).select('-senha');
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
};
