const express = require('express');
const { registrar, entrar, obterUsuario } = require('../controllers/authController');
const { verificarToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registrar', registrar);
router.post('/entrar', entrar);
router.get('/me', verificarToken, obterUsuario);

module.exports = router;
