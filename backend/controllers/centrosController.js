const Usuario = require('../models/Usuario.js')
const HistoriaClinica = require('../models/HistoriaClinica')
const bcrypt = require('bcryptjs')
const Centro = require('../models/Centro.js')

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

  module.exports = {
    getAllCentros
  }