const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
ObjectId = require('mongodb').ObjectId;
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
    console.log(info2.email)
    // console.log(info)
    res.json({
      turnos: info2.turnos,
    })
  }

const nuevoFiebre = async (req, res = response) => {

    const { dni } = req.body
    let dni2 = await Usuario.findById(ObjectId(dni));

    function randomDate(start, end) {
        var date = new Date(+start + Math.random() * (end - start));
        return date;
    }

    function fiebreEmpty(dni2) {
        let found = dni2.turnos.find(e => e.vax === "FIEBRE AMARILLA")
        if (found === undefined) {
          return true
        }
        return false
      }

    if (dni2.age > 60 && fiebreEmpty(dni2)) {
        let nuevoTurno = {
            date: '',
            vax: "FIEBRE AMARILLA",
            dateString: 'El turno no puede ser asignado dada la edad del paciente'
        }
        dni2.turnos.push(nuevoTurno)
    }

    if (fiebreEmpty(dni2)) {
        let fechita = randomDate(Date.now(), (Date.now()+(7*24*60*60*1000)))
        let fechaza = fechita.toLocaleString('en-GB')

        let nuevoTurno = {
            date: randomDate(Date.now(), (Date.now()+(7*24*60*60*1000))),
            vax: "FIEBRE AMARILLA",
            dateString: fechaza
        }
        dni2.turnos.push(nuevoTurno)
    }

    await dni2.save()
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
//         return res.status(400).json({
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
    getTurnos, nuevoFiebre
  }