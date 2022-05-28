const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose')
const url = require('url')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')
// 6290b8402512d72f3e50e4f6

const getTurnos = async (req, res = response) => {
  var user = req.url.split('/')[1]
  console.log(user)

  // let info = await Usuario.findById(ObjectId(user)).exec()
  let info2 = await Usuario.findOne({ _id: user })
  res.json({
    ok: true,
    turnos: info2.turnos,
  })
}

const nuevoFiebre = async (req, res = response) => {
  const { dni } = req.body
  let dni2 = await Usuario.findById(ObjectId(dni))

  

  function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start))
    return date
  }

  function fiebreEmpty(dni2) {
    let found = dni2.turnos.find((e) => e.vax === 'FIEBRE AMARILLA')
    if (found === undefined) {
      return true
    }
    return false
  }

  if (dni2) {
    if (dni2.age > 60) {
      console.log('El usuario posee más de 60 años')
      return res.status(201).json({
        ok: false,
        msg: 'El usuario posee más de 60 años',
      })
    } else {
      if(dni2.historiaClinica) {
        let fiebrehay = await HistoriaClinica.findById(ObjectId(dni2.historiaClinica.id))
        if (fiebrehay.ultimaDosisFiebre) {
        console.log('El usuario ya posee una vacuna contra la fiebre amarilla')
        return res.status(201).json({
          ok: false,
          msg: 'El usuario ya posee una vacuna contra la fiebre amarilla',
        })}
      } else {
      if (!fiebreEmpty(dni2)) {
        console.log('El usuario ya posee una vacuna contra la fiebre amarilla')
        return res.status(201).json({
          ok: false,
          msg: 'El usuario ya posee una vacuna contra la fiebre amarilla',
        })
      } else {
        let fechita = randomDate(
          Date.now(),
          Date.now() + 7 * 24 * 60 * 60 * 1000
        )
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        let fechaza = fechita.toLocaleString('es-AR', options)

        let nuevoTurno = {
          date: randomDate(Date.now(), Date.now() + 7 * 24 * 60 * 60 * 1000),
          vax: 'FIEBRE AMARILLA',
          dateString: fechaza,
          estado: 'PENDIENTE',
        }
        dni2.turnos.push(nuevoTurno)

        try {
          await dni2.save()

          res.status(201).json({
            ok: true,
            uid: dni2.id,
            name: dni2.name,
            turnos: dni2.turnos,
            msg: 'Turno guardado con éxito!',
          })
        } catch (e) {
          console.log(e)
          res.json({
            ok: false,
            msg: 'Error al generar nuevo turno',
          })
        }
      }
    }}
  }
}

// const getaaTurnos = async (req, res = response) => {

//     const { dni } = req.body

//     console.log('EL ID ES !!!!!! ???? :: ', dni)
//         console.log(mongoose.Types.ObjectId.isValid(dni));
//         let dni2 = await Usuario.findById(ObjectId(dni));

//         const getAccount = async (req, res = response) => {
//             var user = req.url.split('/')[1]

//             info = await Usuario.find({ _id: user }).exec()
//             console.log(info)
//             // console.log(info)
//             res.json({
//               ok: true,
//               info,
//             })
//           }
//     if (!dni2) {
//         return res.status(201).json({
//           ok: false,
//           msg: 'El usuario no existe',
//         })
//       }

//     try {

//         let data = dni2.turnos
//         res.json(data)

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//         ok: false,
//         msg: 'Por favor hable con el administrador',
//         })
//     }
// }

module.exports = {
  getTurnos,
  nuevoFiebre,
}
