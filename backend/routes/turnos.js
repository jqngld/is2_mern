const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const Turno = require('../models/Turno')
const { getTurnos, nuevoFiebre } = require('../controllers/turnosController')

const router = Router()

router.get(
    '/:id',
    getTurnos,
  )

router.post(
    '/nuevoturnofiebre',
    nuevoFiebre,
  )


module.exports = router
