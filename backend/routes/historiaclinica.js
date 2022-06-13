/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  crearHistoria, asignarHistoria
} = require('../controllers/historiasController')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post(
  '/nuevahistoriaclinica',
  crearHistoria,
)

router.post(
  '/asignarhistoria/:dni',
  asignarHistoria,
)

// router.post(
//     '/nuevahistoriagripe',
//     crearHistoriaGripe
//   )

// router.post(
//     '/nuevahistoriafiebre',
//     crearHistoriaFiebre
// )


// router.get('/renew', validarJWT, revalidarToken)

module.exports = router
