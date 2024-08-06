const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nomeUsuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  papel: { type: String, required: true, enum: ['funcionario', 'gerente', 'administrador'] },
});

module.exports = mongoose.model('User', userSchema);
