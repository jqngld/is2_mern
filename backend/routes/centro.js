
const express = require('express');
const router = express.Router();

const { getAllCentros, modificarCentro } = require('../controllers/centrosController');

router.get('/getallcentros', getAllCentros)
router.post('/modificarcentro/:centro', modificarCentro)

module.exports = router;