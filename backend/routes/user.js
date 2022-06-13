const express = require('express');
const router = express.Router();

const { getPerfil, usuarioRegistradoPorVac } = require('../controllers/userController');

router.get('/:id', getPerfil);

router.post(
    '/nuevouserporvac',
    usuarioRegistradoPorVac,
  )

module.exports = router;