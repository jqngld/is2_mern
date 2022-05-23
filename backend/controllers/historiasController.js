const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')

const crearHistoria = async (req, res = response) => {
  const { dni, ultDosisCovid, cDosisCovid, ultDosisFiebre, ultDosisGripe } = req.body

   //if (isDate(ultDosis)) {
//    } else {
//        return res.status(400).json({
//            ok: false,
//            msg: 'El campo última dosis no es una fecha'
//       })
//    }
  
  try {

    let dni2 = await Usuario.findOne({ dni })

    if (!dni2) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      })
    }

    historia = new HistoriaClinica()
    HistoriaClinica.ultimaDosisCovid = ultDosisCovid
    HistoriaClinica.cantidadDosisCovid = cDosisCovid
    HistoriaClinica.ultimaDosisFiebre = ultDosisFiebre
    HistoriaClinica.ultimaDosisGripe = ultDosisGripe

    dni2.HistoriaClinica = historia.id

    await dni2.save()

    res.status(201).json({
      ok: true,
      uid: dni2.id,
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
