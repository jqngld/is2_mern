const express = require('express');
const router = express.Router();

const { getPerfil } = require('../controllers/userController');

router.get('/:id', getPerfil);

module.exports = router;