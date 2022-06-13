const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
const  ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose')
const url = require('url')
const Turno = require('../models/Turno')
// const ObjectId = require('mongoose/lib/schema/objectid')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')
// 6290b8402512d72f3e50e4f6

const getAllTurnos = async (req, res = response) => {

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  var fecha = req.url.split('/')[2]
  let fechaQuery = fecha.replaceAll('-', '/')
  let fechx = fecha.split('-')
  let stringQuery = fechx[0] + "/" + fechx[1] + "/" + fechx[2]
  console.log('res: ', stringQuery)
  let turnitos = await Turno.find()

  let turnosReturn = []
  
  for (var i = 0; i < turnitos.length; i++) {
    console.log('turnito: ', turnitos[i].vax, '!', turnitos[i].date.toLocaleString('es-AR').split(' ')[0]);
    if (stringQuery === turnitos[i].date.toLocaleString('es-AR').split(' ')[0]) {
      turnosReturn.push(turnitos[i])
    }
  }

  console.log(turnosReturn.length)

  res.json({  
    ok: true,
    listaturnos: turnosReturn
  })
}

const modificarEstado = async (req, res = response) => {

  let id = req.url.split('/')[2]

  Turno.findByIdAndRemove(id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Removed User : ", docs);
    }
})

  res.json({  
    ok: true
  })

}

const getTurnos = async (req, res = response) => {
  var user = req.url.split('/')[1]
  console.log('hola ?? wtf ', user)
  if (user = "turnosfecha") { return }

  // let info = await Usuario.findById(ObjectId(user)).exec()
  let info2 = await Usuario.findOne({ _id: user })
  console.log('ENCONTRADO :', info2.email)
  let listaTurnos = await Turno.find({paciente: info2.email})

  res.json({
    ok: true,
    turnos: listaTurnos,
  })
}

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

function gripeEmpty(dni) {
  let found = dni.turnos.find(e => e.vax === "GRIPE")
  if (found === undefined) {
    return true
  }
  return false
}
function randomDate(start, end) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}

const nuevoGripe = async (req, res = response) => {
  const { dni } = req.body
  let dni2 = await Usuario.findById(ObjectId(dni))

  if (gripeEmpty(dni2)) {

    let nuevoTurno = new Turno({
      date: '', //randomDate(Date.now(), (Date.now()+(90*24*60*60*1000))),
      vax: "GRIPE",
      dateString: '',//date.toLocaleString('es-AR', options),
      paciente: dni2.email
    })

    let historia = HistoriaClinica.findById(ObjectId(dni2.historiaClinica))

    var ahora = new Date()
    let compDate2 = ahora - historia.ultimaDosisGripe;

    if (compDate2<31556952000)
    {
      if (dni2.riesgo) {
        nuevoTurno.date = randomDate(Date.now(), (Date.now()+(455*24*60*60*1000)))
        nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
      } else {
        nuevoTurno.date = randomDate(Date.now(), (Date.now()+(545*24*60*60*1000)))
        nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
      }
    } else { 
        if (dni2.riesgo) {
          nuevoTurno.date = randomDate(Date.now(), (Date.now()+(90*24*60*60*1000)))
          nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
        } else {
          nuevoTurno.date = randomDate(Date.now(), (Date.now()+(180*24*60*60*1000)))
          nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
        }
    }

    await nuevoTurno.save()
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
    let historia = await HistoriaClinica.findById(ObjectId(dni2.historiaClinica))
    console.log('id: ', historia.ultimaDosisGripe, historia.cantidadDosisCovid, '-', historia.ultimaDosisFiebre)
    if (dni2.age > 60) {
      console.log('El usuario posee más de 60 años')
      return res.status(201).json({
        ok: false,
        msg: 'El usuario posee más de 60 años',
      })
    } else {
      if (historia.ultimaDosisFiebre) {
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

        let nuevoTurno = new Turno({
          date: randomDate(Date.now(), Date.now() + 7 * 24 * 60 * 60 * 1000),
          vax: 'FIEBRE AMARILLA',
          dateString: 'Su turno está pendiente y debe ser gestionado por un administrador',
          estado: 'PENDIENTE',
          paciente: dni2.email
        })

        await nuevoTurno.save()
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
  nuevoGripe,
  getAllTurnos,
  modificarEstado
}
