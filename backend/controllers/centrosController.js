const Usuario = require('../models/Usuario.js')
const HistoriaClinica = require('../models/HistoriaClinica')
const bcrypt = require('bcryptjs')
const Centro = require('../models/Centro.js')
const Turno = require('../models/Turno.js')

const getAllCentros = async (req, res = response) => {

    let listaCentros = await Centro.find()
    console.log(listaCentros)
    
    try {
      res.status(201).json({
        ok: true,
        centros: listaCentros
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
      })
    }

  }

  const modificarCentro = async (req, res = response) => {

    console.log(req.url.split('/')[2])
    console.log(req.body)

    const filter = { _id: req.url.split('/')[2] }
    const update = { name: req.body.name }
    
     try {

       await Centro.updateOne(filter, update)

       res.status(201).json({
         ok: true,
       })
     } catch (error) {
       console.log(error)
       res.status(500).json({
         ok: false,
         msg: 'Por favor hable con el administrador',
       })
     }

  }



  module.exports = {
    getAllCentros,
    modificarCentro
  }