const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const Turno = require('../models/Turno')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose')
const Centro = require('../models/Centro')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')


const asignarHistoria = async (req, res = response) => {

  const { dni, ultDosisCovid, cDosisCovid, ultDosisFiebre, ultDosisGripe } = req.body
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  var user2 = req.url.split('/')[2]
  console.log(user2)

  const historia = new HistoriaClinica({
    ultimaDosisCovid: req.body.ultDosisCovid,
    cantidadDosisCovid: req.body.cDosisCovid,
    ultimaDosisGripe: req.body.ultDosisGripe,
    ultimaDosisFiebre: req.body.ultDosisFiebre
  })

  let usuario = await Usuario.findOne({ dni: user2 }).exec()

  console.log(usuario.dni)

  console.log('USER ENCONTRADO :: ', usuario.name)

  await historia.save()

  usuario.historiaClinica = ObjectId(historia._id)
  await usuario.save()
}

const crearHistoria = async (req, res = response) => {
  const { dni, ultDosisCovid, cDosisCovid, ultDosisFiebre, ultDosisGripe } = req.body

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  try {

    console.log('EL ID ES !!!!!! ???? :: ', dni)
    let dni2 = await Usuario.findById(ObjectId(dni));

    if (!dni2) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      })
    }

    console.log(req.body)

    const historia = new HistoriaClinica({
      ultimaDosisCovid: req.body.ultDosisCovid,
      cantidadDosisCovid: req.body.cDosisCovid,
      ultimaDosisGripe: req.body.ultDosisGripe,
      ultimaDosisFiebre: req.body.ultDosisFiebre
    })

    await historia.save()

    function randomDate(start, end) {
      var date = new Date(+start + Math.random() * (end - start));
      return date;
    }

    function covidEmpty(dni) {
      let found = dni.turnos.find(e => e.vax === "COVID19")
      if (found === undefined) {
        return true
      }
      return false
    }

    if(!prioEdad(dni2.age)) {
      dni2.riesgo = riskParse(req.body.riesgo)
    }

    function gripeEmpty(dni) {
      let found = dni.turnos.find(e => e.vax === "GRIPE")
      if (found === undefined) {
        return true
      }
      return false
    }

    function prioEdad(age) {
      if (age > 60) {
        return true }
      return false;
    }

    dni2.historiaClinica = historia.id

    if (dni2.riesgo && covidEmpty(dni2) && historia.cantidadDosisCovid < 2) {

      let fechita = randomDate(Date.now(), (Date.now()+(7*24*60*60*1000)))
      let fechaza = fechita.toLocaleString('es-AR', options)

      let nuevoTurno = new Turno({
        date: randomDate(Date.now(), (Date.now()+(7*24*60*60*1000))),
        vax: "COVID19",
        dateString: fechaza,
        paciente: dni2.email,
        centro: ObjectId(dni2.centro),
        estado: "Pendiente"
      })

      dni2.turnos.push(nuevoTurno)
      await nuevoTurno.save()

    }

    if (!dni2.riesgo && covidEmpty(dni2) && historia.cantidadDosisCovid < 2 && dni2.age >= 18) {

      let fechita = randomDate(Date.now(), (Date.now()+(7*24*60*60*1000)))
      let fechaza = fechita.toLocaleString('es-AR', options)
      console.log('ENTREEEEEEEE')

      let nuevoTurno = new Turno({
        date: '',
        vax: "COVID19",
        dateString: "Su turno pronto será confirmado por un administrador",
        paciente: dni2.email,
        centro: ObjectId(dni2.centro),
        estado: 'Esperando confirmación'
      })

      dni2.turnos.push(nuevoTurno)
      await nuevoTurno.save()

    }

    if (gripeEmpty(dni2)) {
        let nuevoTurno = new Turno({
          date: '', //randomDate(Date.now(), (Date.now()+(90*24*60*60*1000))),
          vax: "GRIPE",
          dateString: '',//date.toLocaleString('es-AR', options)
          paciente: dni2.email,
          centro: ObjectId(dni2.centro),
          estado: "Pendiente"
        })

        var ahora = new Date()
        let compDate2 = ahora - historia.ultimaDosisGripe;

        if (compDate2<31556952000)
        {
          if (dni2.riesgo) {
            nuevoTurno.date = randomDate(new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000), ((new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000))+(90*24*60*60*1000)))
            nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
          } else {
            nuevoTurno.date = randomDate(new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000), ((new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000))+(180*24*60*60*1000)))
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

      dni2.turnos.push(nuevoTurno)
      await nuevoTurno.save()
    }

        
    function riskParse(input) {
      if (input === 'true') {
        return true
      }
      if (input === 'false') {
        return false
      }
    }

    if (req.body.cDosisCovid == 2 || dni2.age < 18) {
      let index = dni2.turnos.findIndex(e => e.vax == "COVID19")
      dni2.turnos.splice(index, 1);
    }

    await dni2.save()

    res.status(201).json({
      ok: true,
      uid: dni2,
      name: dni2.name,
      historiaClinica: historia.id,
      is_admin: dni2.is_admin
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

// const crearHistoriaGripe = async (req, res = response) => {
//     const { dni, ultDosis } = req.body
  
//     if (isDate(ultDosis)) {
//       let info = {}
//       info.ultimaDosis = ultDosis
//     } else {
//         return res.status(400).json({
//             ok: false,
//             msg: 'El campo última dosis no es una fecha'
//         })
//     }
    
//     try {
  
//       let dni2 = await Usuario.findOne({ dni })
  
//       if (!!dni2) {
//         return res.status(400).json({
//           ok: false,
//           msg: 'El usuario no existe',
//         })
//       }
  
//       historiaGripe = new InfoGripe(info)
//       dni2.InfoGripe = historiaGripe
  
//       await dni2.save()
  
//       res.status(201).json({
//         ok: true,
//         uid: dni2.id,
//         name: dni2.name,
//         infoGripe: historiaGripe.id,
//         is_admin: dni2.is_admin,
//         token,
//       })
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({
//         ok: false,
//         msg: 'Por favor hable con el administrador',
//       })
//     }
//   }

//   const crearHistoriaFiebre = async (req, res = response) => {
//     const { dni, ultDosis } = req.body
  
//     if (isDate(ultDosis)) {
//       let info = {}
//       info.ultimaDosis = ultDosis
//     } else {
//         return res.status(400).json({
//             ok: false,
//             msg: 'El campo última dosis no es una fecha'
//         })
//     }
    
//     try {
  
//       let dni2 = await Usuario.findOne({ dni })
  
//       if (!!dni2) {
//         return res.status(400).json({
//           ok: false,
//           msg: 'El usuario no existe',
//         })
//       }
  
//       historiaFiebre = new InfoFiebre(info)
//       dni2.infoFiebre = historiaFiebre
  
//       await dni2.save()
  
//       res.status(201).json({
//         ok: true,
//         uid: dni2.id,
//         name: dni2.name,
//         infoGripe: historiaFiebre.id,
//         is_admin: dni2.is_admin,
//         token,
//       })
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({
//         ok: false,
//         msg: 'Por favor hable con el administrador',
//       })
//     }
//   }

module.exports = {
  crearHistoria,
  asignarHistoria
}
