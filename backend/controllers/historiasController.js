const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')

const crearHistoria = async (req, res = response) => {
  const { dni, ultDosisCovid, cDosisCovid, ultDosisFiebre, ultDosisGripe } = req.body

  try {

    console.log('EL ID ES !!!!!! ???? :: ', dni)
    console.log(mongoose.Types.ObjectId.isValid(dni));
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

    console.log('--')
    console.log(historia.ultimaDosisCovid)
    console.log(historia.ultimaDosisGripe)
    console.log(historia.ultimaDosisFiebre)
    console.log(historia.cantidadDosisCovid)
    // HistoriaClinica.ultimaDosisCovid = ultDosisCovid
    // HistoriaClinica.cantidadDosisCovid = cDosisCovid
    // HistoriaClinica.ultimaDosisFiebre = ultDosisFiebre
    // HistoriaClinica.ultimaDosisGripe = ultDosisGripe

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

    function gripeEmpty(dni) {
      let found = dni.turnos.find(e => e.vax === "GRIPE")
      if (found === undefined) {
        return true
      }
      return false
    }

    function prioEdad(age) {
      if (age > 60)
        return true;
      return false;
    }

    dni2.historiaClinica = historia.id

    if (dni2.riesgo && covidEmpty(dni2)) {

      let fechita = randomDate(Date.now(), (Date.now()+(7*24*60*60*1000)))
      let fechaza = fechita.toLocaleString('en-GB')

      let nuevoTurno = {
        date: randomDate(Date.now(), (Date.now()+(7*24*60*60*1000))),
        vax: "COVID19",
        dateString: fechaza
      }
      dni2.turnos.push(nuevoTurno)
    }

    if (!covidEmpty(dni2)) {
      if(!dni2.riesgo) { 
        let fechita = randomDate(Date.now(), (Date.now()+(7*24*60*60*1000)))
        let fechaza = fechita.toLocaleString('en-GB')
        console.log(fechaza)
  
        let index = dni2.turnos.findIndex(e => e.vax == "COVID19")
        dni2.turnos.splice(index, 1);
  
        console.log('PATRISIA', index)
  
        let nuevoTurno = {
          date: randomDate(Date.now(), (Date.now()+(7*24*60*60*1000))),
          vax: "COVID19",
          dateString: fechaza
        }
        dni2.turnos.push(nuevoTurno)}

      

    }

    if (!dni2.riesgo && covidEmpty(dni2)) {

      let fechita = randomDate(Date.now(), (Date.now()+(7*24*60*60*1000)))
      let fechaza = fechita.toLocaleString('en-GB')

      let nuevoTurno = {
        date: randomDate(Date.now(), (Date.now()+(7*24*60*60*1000))),
        vax: "COVID19",
        dateString: "Su turno pronto será asignado por un administrador"
      }
      dni2.turnos.push(nuevoTurno)
    }

    if (gripeEmpty(dni2)) {
        let nuevoTurno = {
          date: randomDate(Date.now(), (Date.now()+(90*24*60*60*1000))),
          vax: "GRIPE",
          dateString: "Su turno pronto será asignado por un administrador"
        }
        if (dni2.riesgo) {
          nuevoTurno.date = nuevoTurno.date + (90*24*60*60*1000)
        }
        dni2.turnos.push(nuevoTurno)
      }
        
    function riskParse(input) {
      if (input === 'true') {
        return true
      }
      if (input === 'false') {
        return false
      }
    }

    if(!prioEdad(dni2.edad)) {
      dni2.riesgo = riskParse(req.body.riesgo)
    }


    if (dni2.age < 18) {
      let index = dni2.turnos.findIndex(e => e.vax == "COVID19")
      dni2.turnos.splice(index, 1);
    }

    await dni2.save()

    console.log('EL ID ES ::', dni2.id)
    console.log('EL R ES ::', req.body.riesgo)
    console.log('EL HID ES ::', historia.id)
    console.log(dni2.email)

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
}
