const express = require('express');
const router = express.Router();

const { getPerfil, usuarioRegistradoPorVac, modificarRiesgo, getAllPacientes, vacunarPaciente, getHistoria, modificarCentro, modificarMail, modificarPassword, getUserDNI } = require('../controllers/userController');

router.get('/:id', getPerfil);
router.get('/historia/:id', getHistoria)
router.post('/getallpacientes', getAllPacientes)

router.post('/getpaciente', getUserDNI)
router.post('/modificarriesgo', modificarRiesgo)

router.post(
  '/modificarmail/:id',
  modificarMail
)

router.post(
  '/vacunar/:vax',
  vacunarPaciente
)

router.post(
  '/modificarcentro/:id',
  modificarCentro
)

router.post(
  '/modificarcontrasena/:id',
  modificarPassword
)


router.post(
    '/nuevouserporvac',
    usuarioRegistradoPorVac,
  )

module.exports = router;