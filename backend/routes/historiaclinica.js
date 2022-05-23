/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  crearHistoriaCovid,
  crearHistoriaFiebre,
  crearHistoriaGripe
} = require('../controllers/historiasController')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post(
  '/nuevahistoriacovid',
  crearHistoriaCovid
)

router.post(
    '/nuevahistoriagripe',
    crearHistoriaGripe
  )

router.post(
    '/nuevahistoriafiebre',
    crearHistoriaFiebre
)


router.get('/renew', validarJWT, revalidarToken)

module.exports = router
