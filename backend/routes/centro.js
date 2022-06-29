
const express = require('express');
const router = express.Router();

const { getAllCentros } = require('../controllers/centrosController');

router.get('/getallcentros', getAllCentros)

module.exports = router;