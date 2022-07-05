const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const Turno = require('../models/Turno')
const { getTurnos, getTurnosPendientes, nuevoCovid, getAllPresente, getTurnosCompletos, nuevoFiebre, nuevoGripe, getAllTurnosFromFecha, modificarEstado, gestionarTurno } = require('../controllers/turnosController')

const router = Router()

router.get(
    '/:id',
    getTurnos,
  )

  router.get(
    '/turnosfecha/:fecha/:id',
    getAllTurnosFromFecha,
  )

  router.get('/turnosvacunados/:id', getTurnosCompletos)
  router.post('/getallvacunas', getAllPresente)

  router.post('/gestionarturno/:turno', gestionarTurno)

  router.post('/turnospendientes', getTurnosPendientes)

router.post(
    '/nuevoturnofiebre',
    nuevoFiebre,
  )

  router.post('/nuevoturnocovid', nuevoCovid)

router.post(
    '/nuevoturnogripe',
    nuevoGripe,
  )

router.post(
    '/modificarestado/:id',
    modificarEstado,
  )

module.exports = router
