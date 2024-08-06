const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./config');

const app = express();

app.use(express.json());

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro de conexão com MongoDB:', err));

app.use('/api/autenticacao', authRoutes);
app.use('/api/recursos', resourceRoutes);
app.use('/api/usuarios', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
