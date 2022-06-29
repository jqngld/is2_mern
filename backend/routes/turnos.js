const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const Turno = require('../models/Turno')
const { getTurnos, getTurnosPendientes, nuevoFiebre, nuevoGripe, getAllTurnosFromFecha, modificarEstado } = require('../controllers/turnosController')

const router = Router()

router.get(
    '/:id',
    getTurnos,
  )

  router.get(
    '/turnosfecha/:fecha/:id',
    getAllTurnosFromFecha,
  )

  router.post('/turnospendientes', getTurnosPendientes)

router.post(
    '/nuevoturnofiebre',
    nuevoFiebre,
  )

router.post(
    '/nuevoturnogripe',
    nuevoGripe,
  )

router.post(
    '/modificarestado/:id',
    modificarEstado,
  )

module.exports = router
